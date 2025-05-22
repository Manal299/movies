import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("moviehouse");

  const { id } = req.query;

  try {
    const director = await db
      .collection("directors")
      .findOne({ _id: new ObjectId(id) });

    if (!director) {
      return res.status(404).json({ message: "Director not found" });
    }

    const movies = await db
      .collection("movies")
      .find({ directorId: new ObjectId(id) })
      .toArray();

    res.status(200).json({ ...director, movies });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch director details", error: err });
  }
}
