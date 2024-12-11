import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="mb-4">
          Sorry, the post you're looking for doesn't exist.
        </p>
        <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
          Return to Home
        </Link>
      </div>
    </main>
  );
}
