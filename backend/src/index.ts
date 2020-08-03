import * as apiTypes from "ace-frontend/src/common/apiTypes";
import * as learners from "./learners";
import * as router from "./router";
import * as tutorials from "./tutorials";

// NOTE: When adding a route here also add it to template.yaml

router.get("GetLearner", apiTypes.GetLearnerRequest, learners.get);
router.post("CreateLearner", apiTypes.CreateLearnerRequest, learners.create);
router.post(
  "CreateLearners",
  apiTypes.CreateLearnersRequest,
  learners.createMany
);

router.get("GetTutorial", apiTypes.GetTutorialRequest, tutorials.get);
router.put("UpdateTutorial", apiTypes.UpdateTutorialRequest, tutorials.update);

// Lambda function entry point.

export const handler: AWSLambda.APIGatewayProxyHandler = async function handler(
  event,
  context
) {
  const response = await router.route(event);

  const headers = response.headers || {};
  response.headers = {
    ...headers,
    // Needed for CORS
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
  };

  return response;
};
