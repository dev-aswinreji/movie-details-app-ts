import express from "express";

import { homeGet, movieSearchPost, signupPost } from "../controller/homeGet";

const route = express.Router();

route.get("/movie", homeGet);
route.post("/search", movieSearchPost);
route.post("/signup", signupPost);

export default route;
