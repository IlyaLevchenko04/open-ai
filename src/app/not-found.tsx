import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl md:text-7xl font-bold text-gray-800">404</h1>
      <p className="text-xl md:text-2xl mt-4 text-gray-600">Page not found</p>
      <p className="text-gray-500 mt-2">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
    </main>
  );
}
