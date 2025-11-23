"use client";

import QuizEmbed from "@/components/QuizEmbed";
import {useMemo} from "react";

const QUIZ_REGEX = /\[stfc_quiz\s+id\s*=\s*["']?(\d+)["']?\]/gi;


export default function BlogContentWithQuizzes({html}: {html: string}) {
    const parts = useMemo(() => {
        const result: {type: "html" | "quiz"; content: string; quizId?: number}[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = QUIZ_REGEX.exec(html)) !== null) {
            const matchIndex = match.index;
            const fullMatch = match[0];
            const idStr = match[1];

            // morceau HTML avant le code
            if (matchIndex > lastIndex) {
                result.push({
                    type: "html",
                    content: html.slice(lastIndex, matchIndex),
                });
            }

            // le quiz
            const quizId = Number(idStr);
            if (!Number.isNaN(quizId)) {
                result.push({
                    type: "quiz",
                    content: fullMatch,
                    quizId,
                });
            }

            lastIndex = matchIndex + fullMatch.length;
        }

        // reste du HTML après le dernier code
        if (lastIndex < html.length) {
            result.push({
                type: "html",
                content: html.slice(lastIndex),
            });
        }

        // cas où aucun code n'a été détecté : on renvoie simplement le HTML entier
        if (result.length === 0) {
            return [{type: "html" as const, content: html}];
        }

        return result;
    }, [html]);

    return (
        <div className="text-gray-200 leading-relaxed space-y-6">
            {parts.map((part, index) => {
                if (part.type === "quiz" && part.quizId) {
                    return <QuizEmbed key={`quiz-${index}`} quizId={part.quizId} />;
                }

                return (
                    <div
                        key={`html-${index}`}
                        className="space-y-6"
                        dangerouslySetInnerHTML={{__html: part.content}}
                    />
                );
            })}
        </div>
    );
}
