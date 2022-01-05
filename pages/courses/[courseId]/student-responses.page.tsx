import { useCourse } from "@/api/client";
import { useAuth, UserMenu } from "@/auth/client";
import { Header, MainContentBox, Page, Prose } from "@/components";
import { Breadcrumb } from "@/components/breadcrumb";
import { useRouter } from "next/router";

export default function EditCourse() {
  const auth = useAuth({ required: true });

  const router = useRouter();
  const { courseId } = router.query as { courseId: string };

  const { data: course, error } = useCourse({ courseId });

  const title = course
    ? `Student Responses for ${course.displayName}`
    : `Student Responses for ${courseId}`;

  return (
    <Page title={title}>
      <Header title={title} popovers={<UserMenu />} />

      <MainContentBox>
        <Breadcrumb
          items={[
            { link: "/", label: "Home" },
            { link: "/courses", label: "Your Courses" },
            course && {
              link: { pathname: "/courses/[courseId]", query: { courseId } },
              label: course.displayName,
            },
          ]}
        />

        <Prose>This page is under construction.</Prose>
      </MainContentBox>
    </Page>
  );
}
