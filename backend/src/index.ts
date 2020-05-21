import { route } from "./router";

export const handler: AWSLambda.APIGatewayProxyHandler = async function handler(
  event,
  context
) {
  const response = route(event);

  // Needed for local CORS
  if (process.env.NODE_ENV === "development") {
    const headers = response.headers || {};
    response.headers = { ...headers, "Access-Control-Allow-Origin": "*" };
  }

  return response;
};
