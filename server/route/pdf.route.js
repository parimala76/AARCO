import { getPdf, createPdf, deletePdf } from "../controller/pdf.controller.js";
import { verifyToken } from "../utils/VerifyToken.js";

import express from "express";
const router = express.Router();

router.get("/", getPdf);
router.post("/", verifyToken, createPdf);
router.delete("/", verifyToken, deletePdf);

export default router;
