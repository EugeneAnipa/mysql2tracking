import { Router } from "express";

import { contactPost } from "../controllers/contactpageController.js";

const UserContactPostRouter = Router();

UserContactPostRouter.post("/", contactPost);

export { UserContactPostRouter };
