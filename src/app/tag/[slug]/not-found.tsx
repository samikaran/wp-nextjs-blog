import Link from "next/link";

export default function TagNotFound() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Tag Not Found</h1>
        <p className="text-gray-600 mb-6">
          The tag you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
