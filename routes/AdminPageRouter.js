import express from "express";
import { Router } from "express";

import {
  postCreateUserTrackInfo,
  getAllTrackInfo,
  searchUserTracKInfo,
  deleteUserTrackInfo,
  updateUserTrackInfo,
  adminHhomePageBigImages,
  upload,
} from "../controllers/AdminPageController.js";

const userTrackrouter = Router();

userTrackrouter.post("/", postCreateUserTrackInfo);
userTrackrouter.get("/", getAllTrackInfo);
userTrackrouter.delete("/delete", deleteUserTrackInfo);
userTrackrouter.get("/search", searchUserTracKInfo);
userTrackrouter.patch("/update", updateUserTrackInfo);
userTrackrouter.post(
  "/homebigfiveimages",
  upload.single("bigImage"),
  adminHhomePageBigImages
);

export { userTrackrouter };
