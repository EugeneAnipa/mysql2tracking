import express from "express";
import { Router } from "express";

import {
  postUserTrackInfo,
  getAllTrackInfo,
} from "../controllers/AdminPageController.js";

const userTrackrouter = Router();

userTrackrouter.post("/", postUserTrackInfo);
userTrackrouter.get("/", getAllTrackInfo);
export { userTrackrouter };
