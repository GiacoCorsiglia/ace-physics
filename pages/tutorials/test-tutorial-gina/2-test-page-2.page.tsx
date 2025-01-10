import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "testPage2",
  label: "Test Page 2",
  sections: [section({ name: "testPage2Section1", body: <></> })],
}));
