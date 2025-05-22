import Link from "next/link";

export default function MovieCard({ id, title, year, rating }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition">
      <Link href={`/movies/${id}`}>
        <h2 className="text-xl font-semibold mb-2 text-blue-800 hover:underline cursor-pointer">
          {title}
        </h2>
      </Link>
      <p className="text-sm text-gray-600">Year: {year}</p>
      <p className="text-sm text-yellow-500 font-medium">Rating: {rating}</p>
    </div>
  );
}
