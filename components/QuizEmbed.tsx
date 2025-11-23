"use client";

import { useEffect, useState } from "react";

type QuizChoice = {
    id: string;
    label: string;
};

type Difficulty = "facile" | "moyen" | "difficile";

type QuizQuestion = {
    id: string;
    text: string;
    type: "single" | "multiple";
    image?: string;
    choices: QuizChoice[];

    // Champs supplémentaires pour reproduire ton affichage
    difficulty?: Difficulty;
    explanation?: string;
    correct?: string[]; // liste des IDs de réponses correctes
};

type QuizApiResponse = {
    id: number;
    title: string;
    content?: string;
    questions: QuizQuestion[];
};

interface QuizResult {
    score: number;
    total: number;
    percentage: number;
    level: string;
}

export default function QuizEmbed({ quizId }: { quizId: number }) {
    const [quiz, setQuiz] = useState<QuizApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [showExplanation, setShowExplanation] = useState(false);
    const [userAnswers, setUserAnswers] = useState<Record<string, string[] | null>>({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

    const wpApi = process.env.NEXT_PUBLIC_WP_API;

    useEffect(() => {
        if (!wpApi) {
            setError("Configuration API manquante.");
            setLoading(false);
            return;
        }

        async function fetchQuiz() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${wpApi}/stfc-quiz/v1/quiz/${quizId}`, {
                    cache: "no-store",
                });
                if (!res.ok) {
                    throw new Error("Erreur HTTP " + res.status);
                }
                const data = (await res.json()) as QuizApiResponse;
                setQuiz(data);
            } catch (e) {
                console.error(e);
                setError("Impossible de charger le quiz pour le moment.");
            } finally {
                setLoading(false);
            }
        }

        fetchQuiz();
    }, [quizId, wpApi]);

    // Quand le quiz est chargé, on initialise userAnswers
    useEffect(() => {
        if (!quiz) return;
        const initial: Record<string, string[] | null> = {};
        quiz.questions.forEach((q) => {
            initial[q.id] = null;
        });
        setUserAnswers(initial);
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setShowExplanation(false);
        setQuizCompleted(false);
        setQuizResult(null);
    }, [quiz]);

    if (loading) {
        return (
            <div className="mt-10 rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
                <p className="text-gray-300 text-sm">Chargement du quiz…</p>
            </div>
        );
    }

    if (error || !quiz) {
        return (
            <div className="mt-10 rounded-2xl border border-red-800 bg-red-900/40 p-6">
                <p className="text-red-200 text-sm">
                    {error || "Quiz introuvable."}
                </p>
            </div>
        );
    }

    const questions = quiz.questions;
    const currentQ = questions[currentQuestion];

    const isCurrentAnswered = userAnswers[currentQ.id] !== null;

    // Helper pour savoir si la question est correcte
    function isQuestionCorrect(question: QuizQuestion, answers: string[]): boolean {
        if (!question.correct || question.correct.length === 0) return false;
        const correct = [...question.correct].sort();
        const user = [...answers].sort();
        if (correct.length !== user.length) return false;
        return correct.every((id, i) => id === user[i]);
    }

    const isCurrentCorrect = isQuestionCorrect(currentQ, selectedAnswers);

    const handleAnswerSelect = (choiceId: string) => {
        if (showExplanation) return;

        if (currentQ.type === "single") {
            setSelectedAnswers([choiceId]);
        } else {
            setSelectedAnswers((prev) =>
                prev.includes(choiceId)
                    ? prev.filter((id) => id !== choiceId)
                    : [...prev, choiceId]
            );
        }
    };

    const handleValidateAnswer = () => {
        if (selectedAnswers.length === 0) return;

        setUserAnswers((prev) => ({
            ...prev,
            [currentQ.id]: [...selectedAnswers],
        }));
        setShowExplanation(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            const nextIndex = currentQuestion + 1;
            const nextQ = questions[nextIndex];
            const saved = userAnswers[nextQ.id];

            setCurrentQuestion(nextIndex);
            setSelectedAnswers(saved || []);
            setShowExplanation(saved !== null);
        } else {
            calculateResults();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion === 0) return;
        const prevIndex = currentQuestion - 1;
        const prevQ = questions[prevIndex];
        const saved = userAnswers[prevQ.id];

        setCurrentQuestion(prevIndex);
        setSelectedAnswers(saved || []);
        setShowExplanation(saved !== null);
    };

    const calculateResults = () => {
        let correctCount = 0;
        questions.forEach((question) => {
            const userAns = userAnswers[question.id] || [];
            if (isQuestionCorrect(question, userAns)) {
                correctCount++;
            }
        });

        const total = questions.length;
        const percentage = (correctCount / total) * 100;

        let level = "";
        if (percentage >= 90) {
            level = "Amiral de Starfleet";
        } else if (percentage >= 70) {
            level = "Capitaine Confirmé";
        } else if (percentage >= 50) {
            level = "Officier Prometteur";
        } else if (percentage >= 30) {
            level = "Cadet en Formation";
        } else {
            level = "Recrue Débutante";
        }

        setQuizResult({
            score: correctCount,
            total,
            percentage: Math.round(percentage),
            level,
        });
        setQuizCompleted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const restartQuiz = () => {
        if (!quiz) return;
        const initial: Record<string, string[] | null> = {};
        quiz.questions.forEach((q) => {
            initial[q.id] = null;
        });
        setUserAnswers(initial);
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setShowExplanation(false);
        setQuizCompleted(false);
        setQuizResult(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Pourcentage de progression
    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Résultats globaux */}
            {quizCompleted && quizResult && (
                <div className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-2xl p-8 text-center">
                        <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6">
                            <i className="ri-trophy-line text-5xl text-white"></i>
                        </div>

                        <h2
                            className="text-3xl font-bold text-white mb-4"
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                            Quiz Terminé !
                        </h2>

                        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                            {quizResult.score}/{quizResult.total}
                        </div>

                        <div className="text-2xl text-gray-300 mb-6">
                            {quizResult.percentage}% de réussite
                        </div>

                        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-full px-8 py-3 mb-8">
                            <div className="text-xl font-bold text-white">
                                Grade : {quizResult.level}
                            </div>
                        </div>

                        <div className="max-w-2xl mx-auto mb-8 text-gray-200 text-lg leading-relaxed">
                            {quizResult.percentage >= 90 && (
                                <p>
                                    🖖 Exceptionnel ! Vous êtes un véritable expert de l'univers
                                    Star Trek. Starfleet serait fière de vous compter parmi ses
                                    rangs !
                                </p>
                            )}
                            {quizResult.percentage >= 70 && quizResult.percentage < 90 && (
                                <p>
                                    ⭐ Très bien ! Vous maîtrisez parfaitement l'univers Star
                                    Trek. Quelques détails vous échappent encore, mais vous êtes
                                    clairement un fan passionné.
                                </p>
                            )}
                            {quizResult.percentage >= 50 && quizResult.percentage < 70 && (
                                <p>
                                    👍 Bon travail ! Vous avez de solides bases sur Star Trek.
                                    Encore quelques missions et vous serez un expert !
                                </p>
                            )}
                            {quizResult.percentage >= 30 && quizResult.percentage < 50 && (
                                <p>
                                    📚 Pas mal pour un début ! Continuez à explorer les séries et
                                    les films, et revenez améliorer votre score.
                                </p>
                            )}
                            {quizResult.percentage < 30 && (
                                <p>
                                    🚀 Bienvenue dans l'univers Star Trek ! Vous débutez votre
                                    voyage, et c'est parfait. L'aventure ne fait que commencer.
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={restartQuiz}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
                            >
                                <i className="ri-restart-line mr-2"></i>
                                Recommencer le Quiz
                            </button>
                        </div>
                    </div>

                    {/* Récapitulatif détaillé */}
                    <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                            <i className="ri-file-list-3-line mr-3 text-blue-400"></i>
                            Récapitulatif de vos réponses
                        </h3>
                        <div className="space-y-4">
                            {questions.map((question, index) => {
                                const userAns = userAnswers[question.id];
                                const isCorrectAnswer = userAns
                                    ? isQuestionCorrect(question, userAns)
                                    : false;

                                return (
                                    <div
                                        key={question.id}
                                        className={`p-4 rounded-lg border ${
                                            isCorrectAnswer
                                                ? "bg-green-500/10 border-green-500/30"
                                                : "bg-red-500/10 border-red-500/30"
                                        }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                          <span className="text-gray-400 text-sm">
                            Question {index + 1}
                          </span>
                                                    {question.difficulty && (
                                                        <span
                                                            className={`text-xs px-2 py-1 rounded ${
                                                                question.difficulty === "facile"
                                                                    ? "bg-green-500/20 text-green-400"
                                                                    : question.difficulty === "moyen"
                                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                                        : "bg-red-500/20 text-red-400"
                                                            }`}
                                                        >
                              {question.difficulty}
                            </span>
                                                    )}
                                                </div>
                                                <p className="text-white font-medium mb-2">
                                                    {question.text}
                                                </p>
                                                <div className="text-sm text-gray-400 space-y-1">
                                                    <p>
                                                        Votre réponse :{" "}
                                                        <span
                                                            className={
                                                                isCorrectAnswer
                                                                    ? "text-green-400"
                                                                    : "text-red-400"
                                                            }
                                                        >
                              {userAns && userAns.length > 0
                                  ? question.choices
                                      .filter((c) =>
                                          userAns.includes(c.id)
                                      )
                                      .map((c) => c.label)
                                      .join(", ")
                                  : "Non répondu"}
                            </span>
                                                    </p>
                                                    {question.correct && (!userAns || !isCorrectAnswer) && (
                                                        <p>
                                                            Bonne réponse :{" "}
                                                            <span className="text-green-400">
                                {question.choices
                                    .filter((c) =>
                                        question.correct!.includes(c.id)
                                    )
                                    .map((c) => c.label)
                                    .join(", ")}
                              </span>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div
                                                className={`w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 ml-4 ${
                                                    isCorrectAnswer ? "bg-green-600" : "bg-red-600"
                                                }`}
                                            >
                                                <i
                                                    className={`${
                                                        isCorrectAnswer
                                                            ? "ri-check-line"
                                                            : "ri-close-line"
                                                    } text-white`}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Interface du quiz (une question à la fois) */}
            {!quizCompleted && (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
                    {/* Barre de progression */}
                    <div className="bg-gray-900/50 px-6 py-4 border-b border-gray-700">
                        <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                Question {currentQuestion + 1} sur {questions.length}
              </span>
                            <span className="text-sm text-gray-400">
                {Math.round(progressPercent)}% complété
              </span>
                        </div>
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="p-8">
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                {currentQ.difficulty && (
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full ${
                                            currentQ.difficulty === "facile"
                                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                : currentQ.difficulty === "moyen"
                                                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                                        }`}
                                    >
                    Difficulté : {currentQ.difficulty}
                  </span>
                                )}

                                {currentQ.type === "multiple" && (
                                    <span className="text-xs text-gray-400">
                    Plusieurs réponses possibles
                  </span>
                                )}
                            </div>

                            <h3 className="text-2xl font-bold text-white leading-relaxed">
                                {currentQ.text}
                            </h3>

                            {currentQ.image && (
                                <div className="mt-4 overflow-hidden rounded-lg border border-gray-700 bg-black/40">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={currentQ.image}
                                        alt=""
                                        className="w-full max-h-64 object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Options */}
                        <div className="space-y-3 mb-6">
                            {currentQ.choices.map((option) => {
                                const isSelected = selectedAnswers.includes(option.id);
                                const isCorrectOption =
                                    currentQ.correct?.includes(option.id) ?? false;
                                const showCorrect = showExplanation && isCorrectOption;
                                const showIncorrect =
                                    showExplanation && isSelected && !isCorrectOption;

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleAnswerSelect(option.id)}
                                        disabled={showExplanation}
                                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                                            showCorrect
                                                ? "bg-green-500/20 border-green-500 text-white"
                                                : showIncorrect
                                                    ? "bg-red-500/20 border-red-500 text-white"
                                                    : isSelected
                                                        ? "bg-blue-500/20 border-blue-500 text-white"
                                                        : "bg-gray-700/50 border-gray-600 text-gray-300 hover:border-blue-400 hover:bg-gray-700"
                                        } ${showExplanation ? "cursor-not-allowed" : ""}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="flex-1">{option.label}</span>
                                            {showCorrect && (
                                                <i className="ri-check-line text-green-400 text-xl ml-3"></i>
                                            )}
                                            {showIncorrect && (
                                                <i className="ri-close-line text-red-400 text-xl ml-3"></i>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explication */}
                        {showExplanation && (
                            <div
                                className={`p-6 rounded-xl border-2 mb-6 ${
                                    isCurrentCorrect
                                        ? "bg-green-500/10 border-green-500/30"
                                        : "bg-red-500/10 border-red-500/30"
                                }`}
                            >
                                <div className="flex items-start space-x-3 mb-3">
                                    <div
                                        className={`w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 ${
                                            isCurrentCorrect ? "bg-green-600" : "bg-red-600"
                                        }`}
                                    >
                                        <i
                                            className={`${
                                                isCurrentCorrect ? "ri-check-line" : "ri-close-line"
                                            } text-white`}
                                        ></i>
                                    </div>
                                    <div>
                                        <h4
                                            className={`font-bold text-lg mb-2 ${
                                                isCurrentCorrect ? "text-green-400" : "text-red-400"
                                            }`}
                                        >
                                            {isCurrentCorrect
                                                ? "Bonne réponse !"
                                                : "Réponse incorrecte"}
                                        </h4>
                                        <p className="text-gray-200 leading-relaxed">
                                            {currentQ.explanation ||
                                                "Consultez la correction ci-dessus pour comprendre la bonne réponse."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-6 border-t border-gray-700">
                            <button
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestion === 0}
                                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
                            >
                                <i className="ri-arrow-left-line mr-2"></i>
                                Précédent
                            </button>

                            {!showExplanation ? (
                                <button
                                    onClick={handleValidateAnswer}
                                    disabled={selectedAnswers.length === 0}
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 text-white rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
                                >
                                    <i className="ri-check-line mr-2"></i>
                                    Valider
                                </button>
                            ) : (
                                <button
                                    onClick={handleNextQuestion}
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
                                >
                                    {currentQuestion < questions.length - 1 ? (
                                        <>
                                            Suivant
                                            <i className="ri-arrow-right-line ml-2"></i>
                                        </>
                                    ) : (
                                        <>
                                            <i className="ri-trophy-line mr-2"></i>
                                            Voir les résultats
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
