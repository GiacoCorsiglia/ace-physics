import { generatePseudoRandomId } from "./psuedoRandomId";

it("does it", () => {
  expect(generatePseudoRandomId(5)).toBe(5);
});
