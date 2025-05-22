import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl text-gray-600 font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link href="/">
        <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Go Home
        </button>
      </Link>
    </div>
  );
}
