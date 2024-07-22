import cors from "cors";
import axios from "axios"; // not used
import express from "express";
import bodyParser from "body-parser";

import "dotenv/config";

import fs from "node:fs";

import { test } from "uvu";
import { dirname } from "path";

import * as assert from "uvu/assert";

import { userTrackrouter } from "./routes/AdminPageRouter.js";
import { aboutpageGetter } from "./routes/aboutpageRouter.js";
import { UserContactPostRouter } from "./routes/contactpageRouter.js";
import { homeUserRouter } from "./routes/homepageRouter.js";
import { userTrackRouter } from "./routes/trackingpageRouter.js";
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/admin", userTrackrouter);
app.use("/about", aboutpageGetter);
app.use("/contact", UserContactPostRouter);
app.use("/home", homeUserRouter);
app.use("/track", userTrackRouter);
//creating connection

test.run();

//GET REQUEST;

const serverPort = 8000;
app.listen(serverPort, () => {
  console.log("server is running on " + serverPort);
});
