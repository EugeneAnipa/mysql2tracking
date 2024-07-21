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
  getHomePage,
  adminHomepageTestimonials,
  adminHomepageNews,
  deleteHomeBigImage,
  deleteNews,
  deleteTestimonials,
  updateNews,
  updateTestimonial,
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

userTrackrouter.get("/adminHome", getHomePage);
userTrackrouter.post("/", adminHomepageTestimonials);
userTrackrouter.post("/", adminHomepageNews);
userTrackrouter.delete("/:id", deleteHomeBigImage);
userTrackrouter.delete("/:id", deleteNews);

userTrackrouter.delete("/:id", deleteTestimonials);

userTrackrouter.patch("/:id", updateNews);
userTrackrouter.patch("/:id", updateTestimonial);
export { userTrackrouter };
