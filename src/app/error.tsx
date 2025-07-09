'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
      <h1 className="text-6xl md:text-7xl font-bold text-red-700">500</h1>
      <p className="text-xl md:text-2xl mt-4 text-red-600">
        Something went wrong
      </p>
      <p className="text-gray-500 mt-2">An unexpected error has occurred.</p>
      <button
        onClick={() => reset()}
        className="mt-6 inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Try again
      </button>
    </main>
  );
}
