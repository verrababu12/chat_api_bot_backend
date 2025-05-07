const { getDB } = require("../db");

async function saveDocument(doc) {
  const db = getDB();
  await db.collection("documents").insertOne(doc);
}

async function getRelevantDocuments(keyword) {
  const db = getDB();
  return db
    .collection("documents")
    .find({
      content: { $regex: keyword, $options: "i" },
    })
    .toArray();
}

module.exports = { saveDocument, getRelevantDocuments };
