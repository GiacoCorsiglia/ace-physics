import { apiRoute } from "@/api/api-route";
import * as learners from "@/api/learners";
import { GetLearnerRequest } from "@/schema/api";

export default apiRoute("GET", GetLearnerRequest, learners.get);
