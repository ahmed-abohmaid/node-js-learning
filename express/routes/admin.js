import express from "express";
import { getViewPath } from "../utils/path.js";

const router = express.Router();
const addProductPagePath = getViewPath("add-product.html");

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(addProductPagePath);
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

export default router;
