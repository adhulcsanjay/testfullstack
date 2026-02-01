const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/testfullstack";
let client;
let db;

async function getDb() {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  return db;
}

const DEFAULT_HERO = {
  title: "Your AI Health Coach",
  subtitle:
    "Transform your wellness journey with personalized AI-powered guidance that adapts to your unique needs.",
  image: "/images/Group 1171275467.png",
};

const DEFAULT_ABOUT = {
  heading: "Maximizing Your Health Potential Together",
  paragraph:
    "Your AI-powered health companion transforms the way you approach wellness, making healthy living effortless and personalized.",
};

module.exports = { getDb, DEFAULT_HERO, DEFAULT_ABOUT };
