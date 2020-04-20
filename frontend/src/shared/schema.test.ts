import { Field, Invalid, isInvalid, isValid, Valid } from "./schema";

it("handles scalar default value", () => {
  const field = Field({ defaultValue: "hello" });
  expect(field.default()).toBe("hello");
});

it("handles function default value", () => {
  const field = Field({ defaultValue: () => "hello" });
  expect(field.default()).toBe("hello");
});

it("is valid by default", () => {
  const field = Field();
  expect(isValid(field.validate(null))).toBe(true);
});

it("respects single validator", () => {
  const field = Field({
    validators: [(v) => (v === true ? Valid(v) : Invalid(v))],
  });
  expect(isValid(field.validate(true))).toBe(true);
  expect(isInvalid(field.validate(false))).toBe(true);
});

it("respects multiple validators", () => {
  const field = Field({
    validators: [
      (v) => (v !== null ? Valid(v) : Invalid(v)),
      (v) => (v === true ? Valid(v) : Invalid(v)),
    ],
  });
  expect(isValid(field.validate(true))).toBe(true);
  expect(isInvalid(field.validate(null))).toBe(true);
  expect(isInvalid(field.validate(false))).toBe(true);
});

it("short-circuits multiple validators", () => {
  const firstValidator = jest.fn((v: any) =>
    v !== null ? Valid(v) : Invalid(v)
  );
  const secondValidator = jest.fn((v: any) =>
    v === true ? Valid(v) : Invalid(v)
  );

  const field = Field({
    validators: [firstValidator, secondValidator],
  });

  field.validate(true);
  expect(firstValidator).toHaveBeenCalledTimes(1);
  expect(secondValidator).toHaveBeenCalledTimes(1);

  firstValidator.mockClear();
  secondValidator.mockClear();

  field.validate(null);
  expect(firstValidator).toHaveBeenCalledTimes(1);
  expect(secondValidator).toHaveBeenCalledTimes(0);
});
