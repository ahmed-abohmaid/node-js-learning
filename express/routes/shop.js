import express from "express";
import { getViewPath } from "../utils/path.js";

const router = express.Router();
const shopPagePath = getViewPath("shop.html");

router.get("/", (req, res, next) => {
  res.sendFile(shopPagePath);
});

export default router;
