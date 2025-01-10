import { Prose } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "testPage1",
  label: "Test Page 1 - Gina's page",
  sections: [
    section({
      name: "testPage1Section1",
      body: (
        <>
          <Prose>Text of section 1</Prose>
        </>
      ),
    }),
    section({
      name: "testPage1Section2",
      body: (
        <>
          <Prose>Text of section 2</Prose>
        </>
      ),
    }),
  ],
}));
