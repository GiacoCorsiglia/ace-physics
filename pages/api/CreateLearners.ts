import { apiRoute } from "backend/src/api-route";
import * as learners from "backend/src/learners";
import * as apiTypes from "common/apiTypes";

export default apiRoute(
  "POST",
  apiTypes.CreateLearnersRequest,
  learners.createMany
);
