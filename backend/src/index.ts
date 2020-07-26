import * as apiTypes from "ace-frontend/src/common/apiTypes";
import * as response from "./response";
import * as router from "./router";

// NOTE: When adding a route here also add it to template.yaml

// Learners.

router.get("GetLearner", apiTypes.GetLearnerRequest, async (request) => {
  return response.error("GetLearner: Unimplemented");
});

router.post("CreateLearner", apiTypes.CreateLearnerRequest, async (request) => {
  return response.error("CreateLearner: Unimplemented");
});

router.post(
  "CreateLearners",
  apiTypes.CreateLearnersRequest,
  async (request) => {
    return response.error("CreateLearners: Unimplemented");
  }
);

// Tutorials.

router.get("GetTutorial", apiTypes.GetTutorialRequest, async (request) => {
  return response.error("GetTutorial: Unimplemented");
});

router.put(
  "UpdateTutorial",
  apiTypes.UpdateTutorialRequest,
  async (request) => {
    return response.error("UpdateTutorial: Unimplemented");
  }
);

// Lambda function entry point.

export const handler: AWSLambda.APIGatewayProxyHandler = async function handler(
  event,
  context
) {
  const response = await router.route(event);

  // Needed for local CORS
  if (process.env.NODE_ENV === "development") {
    const headers = response.headers || {};
    response.headers = { ...headers, "Access-Control-Allow-Origin": "*" };
  }

  return response;
};
