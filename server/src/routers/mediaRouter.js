

import { CreateCarouselController, DeleteCarouselController, GetAllMedia } from "../controllers/mediaController.js";
import express from "express";
import { uploadMediaImg } from "../middlewares/uploadFile.js";
import  { IsLoggedIn, IsAdmin } from "../middlewares/authMiddleware.js"

//make an express router
const mediaRouter = express.Router();


mediaRouter.post("/create-carousel", uploadMediaImg.array("carouselImages"), CreateCarouselController);

mediaRouter.get("/all-media", GetAllMedia);
mediaRouter.delete("/delete-carousel", IsLoggedIn, IsAdmin, DeleteCarouselController)
export default mediaRouter;