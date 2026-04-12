import express from "express";

const app = express();

app.get("/users", (_, res, next) => {
  res.send("Users route");
  next();
});

app.get("/", (_, res) => {
  res.send("GENERAL");
  console.log("GENERAL");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
