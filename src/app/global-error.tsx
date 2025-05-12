"use client"; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center bg-base1 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-error mb-4">
            Something went wrong!
          </h2>
          <p className="text-foreground mb-6">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          <button onClick={() => reset()} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
