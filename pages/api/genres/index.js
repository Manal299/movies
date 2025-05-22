import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("moviehouse");

  const genres = await db.collection("genres").find({}).toArray();
  res.status(200).json(genres);
}
