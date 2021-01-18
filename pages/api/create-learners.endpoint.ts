import { apiRoute } from "@/api/api-route";
import * as learners from "@/api/learners";
import { CreateLearnersRequest } from "@/schema/api";

export default apiRoute("POST", CreateLearnersRequest, learners.createMany);
