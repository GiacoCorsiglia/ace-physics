import { apiRoute } from "@/api/api-route";
import * as tutorials from "@/api/tutorials";
import { GetTutorialRequest } from "@/schema/api";

export default apiRoute("GET", GetTutorialRequest, tutorials.get);
