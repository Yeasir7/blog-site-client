"use client";

import { useEffect } from "react";

export default function AboutError({
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
    <div>
      <h1>Something not seems right</h1>
      <button
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
