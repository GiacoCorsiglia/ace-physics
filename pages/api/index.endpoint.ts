import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default withSentry((req: NextApiRequest, res: NextApiResponse) => {
  throw new Error("API throw error test");
  if (req.method === "GET") {
    res.status(200).json({ ok: true });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      error: 405,
      type: "Method Not Allowed",
      method: req.method,
    });
  }
});
