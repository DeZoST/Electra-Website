"use client";

import React, { useState } from "react";

export default function Lightbox({ title, children, trigger }) {
    const [isOpen, setIsOpen] = useState(false);

    const openLightbox = () => setIsOpen(true);
    const closeLightbox = () => setIsOpen(false);

    return (
        <>
            {/* Trigger Element */}
            <div
                onClick={openLightbox}
                className="flex items-center justify-center cursor-pointer"
            >
                {trigger}
            </div>

            {/* Lightbox Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative w-11/12 max-w-lg p-6 bg-white rounded-md shadow-lg">
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Lightbox Title */}
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">
                            {title}
                        </h2>

                        {/* Lightbox Content */}
                        <div className="text-gray-600">{children}</div>
                    </div>
                </div>
            )}
        </>
    );
}
