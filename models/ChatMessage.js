const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

async function saveMessageToDatabase(userId, sender, text) {
  const db = getDB();
  await db.collection("chatMessages").insertOne({
    userId: ObjectId(userId),
    sender,
    text,
    timestamp: new Date(),
  });
}

async function getChatHistory(userId) {
  const db = getDB();
  return db
    .collection("chatMessages")
    .find({ userId: ObjectId(userId) })
    .sort({ timestamp: 1 })
    .toArray();
}

module.exports = { saveMessageToDatabase, getChatHistory };
