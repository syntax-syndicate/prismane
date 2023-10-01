// Validator
import negative from "./negative";

test("Error: Value is not negative", () => {
  // Value is not negative
  expect(negative(10)).toBe("This value must be a negative number!");
});

test("No error: Value is negative", () => {
  // Value is negative
  expect(negative(-5)).toBe(null);

  // Value is zero (considered non-negative)
  expect(negative(0)).toBe("This value must be a negative number!");
});
