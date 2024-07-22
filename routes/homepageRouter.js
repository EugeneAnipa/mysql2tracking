import { Router } from "express";

import { homeUser } from "../controllers/homepageController.js";

const homeUserRouter = Router();

homeUserRouter.get("/", homeUser.homepageUserBigImages);
homeUserRouter.get("/", homeUser.homepageUserNews);
homeUserRouter.get("/", homeUser.homepageUserTestimonials);

export { homeUserRouter };
