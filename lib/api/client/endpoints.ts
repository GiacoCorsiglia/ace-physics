import { Infer } from "@/schema/types";
import * as spec from "../isomorphic/specs";
import { createUseGet, createUseMutation, renderUrl } from "./endpoint-hooks";
import { fetchAndParse } from "./fetch-and-parse";

export const useCourses = createUseGet(spec.Courses);
export const useCreateCourse = createUseMutation(spec.Courses, "POST");

export const useCourse = createUseGet(spec.Course);
export const useUpdateCourse = createUseMutation(spec.Course, "PUT");

export const useCourseUsers = createUseGet(spec.CourseUsers);
export const useUpdateCourseUsers = createUseMutation(spec.CourseUsers, "PUT");

export const useUpdateUserPrivileges = createUseMutation(
  spec.UserPrivileges,
  "POST",
);

export const getTutorial = (
  query: Infer<(typeof spec.TutorialState)["Query"]>,
) => {
  const url = renderUrl(spec.TutorialState, query);
  return fetchAndParse(spec.TutorialState.GET, url, "GET");
};

export const updateTutorial = (
  query: Infer<(typeof spec.TutorialState)["Query"]>,
  request: Infer<(typeof spec.TutorialState)["PUT"]["Request"]>,
) => {
  const url = renderUrl(spec.TutorialState, query);
  return fetchAndParse(spec.TutorialState.PUT, url, "PUT", request);
};

export const usePostReports = createUseMutation(
  spec.CourseReports,
  "POST",
  true,
);
