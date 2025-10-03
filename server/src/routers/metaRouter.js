

import express from "express";
import { sendConversionEvent } from "../helpers/metaCapi.js";

const metaRouter = express.Router();

// Example: send purchase event
metaRouter.post("/purchase", async (req, res) => {
  const { eventId, email, phone, value, currency } = req.body;

  const response = await sendConversionEvent({
    eventName: "Purchase",
    eventId, // same as client fbq("track", "Purchase", { eventID: eventId })
    userData: {
      email,
      phone,
      ip: req.ip,
      ua: req.headers["user-agent"],
    },
    customData: {
      currency,
      value,
    },
  });

  res.json(response);
});

export default metaRouter;
