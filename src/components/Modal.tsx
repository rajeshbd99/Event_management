"use client";

import React from "react";

export default function Modal({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmLabel = "Confirm",
}: {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-fadeIn">
        {title && <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>}
        <div className="text-gray-700 text-sm mb-6">{children}</div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm?.()}
            className="px-4 py-2 rounded-lg bg-[#db3aa0] text-white font-semibold hover:bg-pink-600 transition"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
