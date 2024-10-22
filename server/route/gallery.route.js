import {
  addGallery,
  deleteGallery,
  getGallery,
} from "../controller/Gallery.controller.js";
import { verifyToken } from "../utils/VerifyToken.js";
import express from "express";
const router = express.Router();

router.get("/", getGallery);
router.post("/", verifyToken, addGallery);
router.delete("/", verifyToken, deleteGallery);

export default router;
// Compare this snippet from server/route/gallery.route.js:
