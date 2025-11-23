"use client";
import React, { useState, useEffect } from "react";
import {
    RiCheckLine,
    RiErrorWarningLine,
    RiSendPlaneLine,
    RiLoader4Line,
} from "react-icons/ri";

type Subject = {
    id: string | number;
    name: string;
};

export function ContactForm({ subjects }: { subjects: Subject[] }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

    // Optionnel : faire disparaître les messages après 5s
    useEffect(() => {
        if (!submitStatus) return;
        const timer = setTimeout(() => {
            setSubmitStatus(null);
            setSubmitMessage(null);
        }, 5000);
        return () => clearTimeout(timer);
    }, [submitStatus]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.message.length > 500) {
            alert("Le message ne peut pas dépasser 500 caractères.");
            return;
        }

        let captchaToken = "";
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

        // 🔐 Récupération du token reCAPTCHA v3
        if (typeof window !== "undefined" && (window as any).grecaptcha && siteKey) {
            captchaToken = await new Promise<string>((resolve, reject) => {
                (window as any).grecaptcha.ready(() => {
                    (window as any)
                        .grecaptcha.execute(siteKey, { action: "event_register" })
                        .then(resolve)
                        .catch(reject);
                });
            });
        } else {
            console.warn("reCAPTCHA non initialisé, fallback DEV");
            captchaToken = "DEV_MODE";
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        setSubmitMessage(null);

        const baseUrl = process.env.NEXT_PUBLIC_WP_API;
        const url = baseUrl + "/stfc/v1/contact";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    recaptcha_token: captchaToken,
                }),
            });

            let data: any = null;
            try {
                data = await response.json();
            } catch {
                data = null;
            }
    console.log(data)
            if (response.ok && data?.success) {
                setSubmitStatus("success");
                setSubmitMessage(
                    data.message || "Demande de contact créée avec succès."
                );
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });


            } else {
                setSubmitStatus("error");
                setSubmitMessage(
                    data?.message ||
                    "Une erreur s'est produite. Veuillez réessayer."
                );
            }
        } catch (error) {
            setSubmitStatus("error");
            setSubmitMessage(
                "Une erreur s'est produite. Veuillez réessayer."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form
            id="contactForm"
            onSubmit={handleSubmit}
            data-readdy-form="true"
            className="space-y-6"
        >
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-white font-medium mb-2">
                        Nom complet *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-sm"
                        placeholder="Votre nom et prénom"
                    />
                </div>

                <div>
                    <label className="block text-white font-medium mb-2">
                        Email *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-sm"
                        placeholder="votre@email.com"
                    />
                </div>
            </div>

            <div>
                <label className="block text-white font-medium mb-2">
                    Sujet *
                </label>
                <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pr-8 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all text-sm"
                >
                    <option value="" disabled className="bg-slate-800 text-white">
                        — Choisir un sujet —
                    </option>
                    {subjects.map((cat) => (
                        <option
                            key={cat.id}
                            value={cat.id}
                            className="bg-slate-800 text-white"
                        >
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-white font-medium mb-2">
                    Message *
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    maxLength={500}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none text-sm"
                    placeholder="Décrivez votre demande en détail..."
                ></textarea>
                <div className="text-right text-sm text-blue-300 mt-1">
                    {formData.message.length}/500 caractères
                </div>
            </div>

            {/* reCAPTCHA (pour futur v2 visible au besoin) */}
            <div className="flex justify-center">
                {recaptchaLoaded && (
                    <div
                        className="g-recaptcha"
                        data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        data-theme="dark"
                    ></div>
                )}
            </div>

            {submitStatus === "success" && submitMessage && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg text-green-100 flex items-center">
                    <RiCheckLine className="mr-2" />
                    {submitMessage} 🖖
                </div>
            )}

            {submitStatus === "error" && submitMessage && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-100 flex items-center">
                    <RiErrorWarningLine className="mr-2" />
                    {submitMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap cursor-pointer"
            >
                {isSubmitting ? (
                    <>
                        <RiLoader4Line className="inline-block mr-2 animate-spin" />
                        Envoi en cours...
                    </>
                ) : (
                    <>
                        <RiSendPlaneLine className="inline-block mr-2" />
                        Envoyer le message
                    </>
                )}
            </button>
        </form>
    );
}
