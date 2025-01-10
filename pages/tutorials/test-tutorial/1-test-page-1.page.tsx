import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "testPage1",
  label: "Test Page 1",
  sections: [section({ name: "testPage1Section1", body: <></> })],
}));
