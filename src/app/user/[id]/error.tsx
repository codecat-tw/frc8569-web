"use client";

import { useEffect } from "react";
import { Triangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <Triangle className="w-16 h-16 text-red-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          系統異常
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          很抱歉，系統發生了一些問題。請稍後再試一次。
        </p>

        {error.message && (
          <p className="text-sm text-gray-500 dark:text-gray-500">
            錯誤訊息：<code>{error.message}</code>
          </p>
        )}

        <button
          onClick={reset}
          className="mt-4 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow-md transition"
        >
          再試一次
        </button>
      </div>
    </div>
  );
}
