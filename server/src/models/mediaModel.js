"use strict";

import { Schema, model } from "mongoose";

const MediaSchema = new Schema(
  {
    carouselImages: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Media = model("Media", MediaSchema);

export default Media;
