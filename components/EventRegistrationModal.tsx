// components/EventRegistrationModal.tsx
"use client";

import React, { useState } from "react";

type EventForRegistration = {
    title: string;
    date: string;
    dateDisplay: string;
    time: string;
    location: string;
    id: number;
};

type EventRegistrationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedEvent: EventForRegistration | null;
    formatDate: (date: string) => string;
    autoCloseDelay?: number; // default: 3000ms
};

// petit helper TypeScript pour window.grecaptcha
declare global {
    interface Window {
        grecaptcha?: {
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
            ready: (cb: () => void) => void;
        };
    }
}

export function EventRegistrationModal({
                                           isOpen,
                                           onClose,
                                           selectedEvent,
                                           formatDate,
                                           autoCloseDelay = 3000,
                                       }: EventRegistrationModalProps) {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        participants: "1",
        dietaryRestrictions: "",
        comments: "",
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEvent) return;

        setErrorMessage(null);
        setIsSubmitting(true);

        try {
            const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
            if (!siteKey) {
                console.warn("NEXT_PUBLIC_RECAPTCHA_SITE_KEY manquante");
            }

            let captchaToken = "";

            // 🔐 Récupération du token reCAPTCHA v3
            if (typeof window !== "undefined" && window.grecaptcha && siteKey) {
                captchaToken = await new Promise<string>((resolve, reject) => {
                    window.grecaptcha!.ready(() => {
                        window.grecaptcha!
                            .execute(siteKey, { action: "event_register" })
                            .then(resolve)
                            .catch(reject);
                    });
                });
            } else {
                // mode fallback/dev : tu peux refuser ici si tu préfères
                console.warn("reCAPTCHA non initialisé, fallback DEV");
                captchaToken = "DEV_MODE";
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_WP_API}/starfleet/v1/events/${selectedEvent.id}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        comments: formData.comments,
                        captchaToken,
                    }),
                }
            );

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                console.error("Erreur API inscription", body);
                setErrorMessage(
                    body?.message ||
                    "Une erreur est survenue lors de l’inscription. Merci de réessayer."
                );
                setIsSubmitting(false);
                return;
            }

            setSubmitted(true);
            setIsSubmitting(false);

            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    participants: "1",
                    dietaryRestrictions: "",
                    comments: "",
                });
                onClose();
            }, autoCloseDelay);
        } catch (err) {
            console.error(err);
            setErrorMessage("Erreur réseau ou serveur. Merci de réessayer.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 text-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50 border border-gray-700">
                {/* HEADER */}
                <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                    <h2
                        className="text-2xl font-bold text-blue-400"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                        {submitted ? "Merci !" : "Inscription à l'événement"}
                    </h2>

                    {!submitted && (
                        <button
                            className="text-gray-400 hover:text-white"
                            onClick={onClose}
                            type="button"
                        >
                            <i className="ri-close-line text-2xl"></i>
                        </button>
                    )}
                </div>

                {/* SUCCESS SCREEN */}
                {submitted ? (
                    <div className="p-8 flex flex-col items-center text-center space-y-4 animate-fade-in">
                        <i className="ri-checkbox-circle-line text-6xl text-green-400"></i>
                        <h3 className="text-xl font-semibold">
                            Votre inscription a bien été envoyée !
                        </h3>

                        <p className="text-gray-300">
                            Merci <span className="font-semibold">{formData.firstName}</span>.<br />
                            Nous vous confirmons votre participation très rapidement.
                        </p>

                        <p className="text-sm text-gray-400">Fermeture automatique…</p>
                    </div>
                ) : (
                    <>
                        {/* EVENT SUMMARY */}
                        {selectedEvent && (
                            <div className="px-6 pt-4 pb-2">
                                <div className="p-4 bg-gray-700/50 rounded-lg space-y-2">
                                    <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                                    <div className="text-sm text-gray-300 space-y-1">
                                        <div className="flex items-center">
                                            <i className="ri-calendar-line mr-2 text-purple-400"></i>
                                            {selectedEvent.dateDisplay}  {selectedEvent.time && ` à ${selectedEvent.time}`}
                                        </div>
                                        <div className="flex items-center">
                                            <i className="ri-map-pin-line mr-2 text-purple-400"></i>
                                            {selectedEvent.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-2 text-gray-300">
                                        Prénom <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-2 text-gray-300">
                                        Nom <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm mb-2 text-gray-300">
                                    Email <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2 text-gray-300">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2 text-gray-300">
                                    Commentaires (max 500 caractères)
                                </label>
                                <textarea
                                    name="comments"
                                    maxLength={500}
                                    rows={4}
                                    value={formData.comments}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-sm resize-none"
                                />
                                <div className="text-xs text-gray-400">
                                    {formData.comments.length}/500 caractères
                                </div>
                            </div>

                            {errorMessage && (
                                <p className="text-sm text-red-400">{errorMessage}</p>
                            )}

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold"
                                    disabled={isSubmitting}
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold flex items-center justify-center disabled:opacity-60"
                                    disabled={isSubmitting}
                                >
                                    <i className="ri-send-plane-line mr-2"></i>
                                    {isSubmitting
                                        ? "Envoi en cours…"
                                        : "Confirmer l'inscription"}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
