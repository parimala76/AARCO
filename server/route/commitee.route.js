import {
  addRetirment,
  getRetirments,
  deleteRetirment,
} from "../controller/retirement.controller.js";

import {
  getCommittee,
  deleteCommittee,
  createCommittee,
} from "../controller/committee.controller.js";

import { verifyToken } from "../utils/VerifyToken.js";
import express from "express";
const router = express.Router();

router.post("/addretirment", addRetirment);
router.get("/getretirments", getRetirments);
router.delete("/deleteretirment", deleteRetirment);

router.get("/getcommittee", getCommittee);
router.post("/createcommittee", verifyToken, createCommittee);
router.delete("/deletecommittee", verifyToken, deleteCommittee);

export default router;
