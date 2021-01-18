import { apiRoute } from "@/api/api-route";
import * as learners from "@/api/learners";
import { CreateLearnerRequest } from "@/schema/api";

export default apiRoute("POST", CreateLearnerRequest, learners.create);
