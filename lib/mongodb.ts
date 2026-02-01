import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("MONGODB_URI is not set");

let client: MongoClient;
let db: Db;

export async function getDb(): Promise<Db> {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  return db;
}

export type HeroContent = { title: string; subtitle: string; image: string };
export type AboutContent = { heading: string; paragraph: string };
export type TestimonialDoc = { _id?: string; name: string; role: string; message: string };
export type FaqDoc = { _id?: string; question: string; answer: string };

export const DEFAULT_HERO: HeroContent = {
  title: "Your AI Health Coach",
  subtitle:
    "Transform your wellness journey with personalized AI-powered guidance that adapts to your unique needs.",
  image: "/images/Group 1171275467.png",
};

export const DEFAULT_ABOUT: AboutContent = {
  heading: "Maximizing Your Health Potential Together",
  paragraph:
    "Your AI-powered health companion transforms the way you approach wellness, making healthy living effortless and personalized.",
};
