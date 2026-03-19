"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed top-5 right-5 z-[200] animate-in slide-in-from-top-4 fade-in duration-500">
      <div className="bg-white border-[4px] border-brand-black shadow-brutal-xl p-6 flex items-center gap-4">
        <div
          className={`w-12 h-12 flex items-center justify-center text-white ${
            isSuccess ? "bg-brand-green" : "bg-brand-red"
          }`}
        >
          <i
            className={`fa-solid ${
              isSuccess ? "fa-check" : "fa-xmark"
            } text-2xl`}
          ></i>
        </div>
        <div>
          <h4 className="font-black text-lg uppercase">
            {isSuccess ? "Success!" : "Error!"}
          </h4>
          <p className="text-brand-darkGray">{message}</p>
        </div>
      </div>
    </div>
  );
}
