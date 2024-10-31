import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getRandomWish } from "./helpers/getRandomWishMessage.js";
import { toTitleCase } from "./helpers/toTitleCase.js";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/libs", express.static(path.join(__dirname, "libs")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/wish", (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).send("Missing 'from' or 'to' query parameters.");
  }

  const randomWishMessage = getRandomWish();
  const formattedFrom = toTitleCase(from);
  const formattedTo = toTitleCase(to);
  res.render("wish", {
    from: formattedFrom,
    to: formattedTo,
    randomWishMessage,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
