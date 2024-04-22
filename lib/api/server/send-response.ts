import { NextApiResponse } from "next";
import * as response from "./response";

export const sendResponse = (
  nextRes: NextApiResponse,
  responseObject: response.Response,
  isHead?: boolean,
) => {
  if (responseObject.headers) {
    Object.entries(responseObject.headers).forEach(([header, value]) => {
      nextRes.setHeader(header, value);
    });
  }

  if (responseObject.statusCode === 500) {
    console.error(responseObject.body);
  }

  nextRes.status(responseObject.statusCode);
  if (!isHead) {
    nextRes.json(responseObject.body);
  }
};
