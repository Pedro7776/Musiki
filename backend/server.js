require("dotenv").config();

const express = require("express");
const connectDatabase = require("./database");

const app = express();

app.use(express.json());

connectDatabase();

app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` ${PORT}`);
});