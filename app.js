const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./db");
const chatRoutes = require("./routes/chatRoutes");
const fileRoutes = require("./routes/fileRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", chatRoutes);
app.use("/api", fileRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
});
