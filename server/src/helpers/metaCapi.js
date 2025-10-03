
import fetch from "node-fetch";

import {META_PIXEL_ID , META_ACCESS_TOKEN} from "../hiddenEnv.js";

export async function sendConversionEvent({ eventName, eventId, userData, customData, testEventCode}) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v17.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: eventName,      // e.g. "Purchase"
              event_time: Math.floor(Date.now() / 1000),
              event_id: eventId,          // must match client pixel event for deduplication
              action_source: "website",
              user_data: {
                // hashed values recommended (SHA256)
                em: userData?.email,  
                ph: userData?.phone,
                client_ip_address: userData?.ip,
                client_user_agent: userData?.ua
              },
              custom_data: customData || {}
            },
          ],
        }),
      }
    );

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("CAPI Error:", err.message);
    return null;
  }
}
