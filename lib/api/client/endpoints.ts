import * as spec from "../isomorphic/specs";
import { createUseGet, createUseMutation } from "./endpoint-hooks";

export const useCourses = createUseGet(spec.Courses);
export const useCreateCourse = createUseMutation(spec.Courses, "POST");

export const useCourse = createUseGet(spec.Course);
export const useUpdateCourse = createUseMutation(spec.Course, "PUT");

export const useCourseUsers = createUseGet(spec.CourseUsers);
export const useUpdateCourseUsers = createUseMutation(spec.CourseUsers, "PUT");

export const useUpdateUserPrivileges = createUseMutation(
  spec.UserPrivileges,
  "POST"
);
