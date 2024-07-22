import { Router } from "express";

import { aboutpageGet } from "../controllers/AdminPageController.js";

const aboutpageGetter = Router();

aboutpageGetter.get("/", aboutpageGet);

export { aboutpageGetter };
