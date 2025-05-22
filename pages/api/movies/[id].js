import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("moviehouse");
  const { id } = req.query;

  const movie = await db.collection("movies").findOne({ _id: new ObjectId(id) });

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const [director, genre] = await Promise.all([
    db.collection("directors").findOne({ _id: movie.directorId }),
    db.collection("genres").findOne({ _id: movie.genreId })
  ]);

  res.status(200).json({
    ...movie,
    director: director?.name || "Unknown",
    genre: genre?.name || "Unknown",
  });
}
