import { Router } from "express";
import {
  userTrackGet,
  userTrackPost,
} from "../controllers/trackingPageController.js";

const userTrackRouter = Router();

userTrackRouter.get("/", userTrackGet);
userTrackRouter.get("/", userTrackPost);

export { userTrackRouter };
