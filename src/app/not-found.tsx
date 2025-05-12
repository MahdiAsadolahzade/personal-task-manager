import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-background text-foreground">
      <h2 className="text-4xl font-bold mb-4">Not Found</h2>
      <p className="text-lg mb-6">Could not find the requested resource.</p>
      <Link href="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}
