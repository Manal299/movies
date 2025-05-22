import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("moviehouse");

  const { id } = req.query;

  try {
    const movies = await db
      .collection("movies")
      .find({ genreId: new ObjectId(id) })
      .toArray();

    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch movies for genre", error: err });
  }
}
