// src/components/Modal.tsx
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
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        <div className="mb-4 text-sm text-gray-700">{children}</div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-3 py-2 rounded-md border">
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm?.();
            }}
            className="px-3 py-2 rounded-md bg-[#db3aa0] text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
