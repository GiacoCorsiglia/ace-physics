import { useCourseUsers } from "@/api/client";

export function StudentCount({ courseId }: { courseId: string }) {
  const { data, error, isLoading } = useCourseUsers({ courseId });

  if (isLoading) {
    return (
      <div style={{ fontSize: "0.875rem", color: "var(--neutral-600)" }}>
        Loading student count...
      </div>
    );
  }

  if (error || !data) return null; // Silent fail

  const count = data.students.length;
  return (
    <div style={{ fontSize: "0.875rem" }}>
      <strong>{count}</strong> student{count !== 1 ? "s" : ""} enrolled
    </div>
  );
}
