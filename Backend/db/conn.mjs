// conn.mjs
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

await client.connect();
console.log("mongoDB is connected :D");

const db = client.db("users");
export default db;