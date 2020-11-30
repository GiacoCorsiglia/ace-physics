import { apiRoute } from "backend/src/api-route";
import * as tutorials from "backend/src/tutorials";
import * as apiTypes from "common/apiTypes";

export default apiRoute(
  "PUT",
  apiTypes.UpdateTutorialRequest,
  tutorials.update
);
