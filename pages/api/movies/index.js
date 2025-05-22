import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("moviehouse");

  if (req.method === "GET") {
    const movies = await db.collection("movies").find({}).toArray();
    res.status(200).json(movies);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
