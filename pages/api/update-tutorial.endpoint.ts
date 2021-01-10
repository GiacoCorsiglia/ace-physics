import { apiRoute } from "@/api/api-route";
import * as tutorials from "@/api/tutorials";
import { UpdateTutorialRequest } from "@/schema/api";

export default apiRoute("PUT", UpdateTutorialRequest, tutorials.update);
