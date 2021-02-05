import { init } from "@/sentry";
import { NextApiRequest, NextApiResponse } from "next";

init();

export default (req: NextApiRequest, res: NextApiResponse) => {
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
};
