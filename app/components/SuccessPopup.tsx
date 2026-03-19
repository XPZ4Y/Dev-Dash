"use client";

import { useEffect } from "react";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessPopup({ isOpen, onClose }: SuccessPopupProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-5 right-5 z-[200] animate-in slide-in-from-top-4 fade-in duration-500">
      <div className="bg-white border-[4px] border-brand-black shadow-brutal-xl p-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-brand-black flex items-center justify-center text-white">
          <i className="fa-solid fa-check text-2xl"></i>
        </div>
        <div>
          <h4 className="font-black text-lg uppercase">Success!</h4>
          <p className="text-brand-darkGray">We'll get back to you shortly.</p>
        </div>
      </div>
    </div>
  );
}
