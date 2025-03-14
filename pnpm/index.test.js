import { test, expect, describe } from "vitest";
import { greeting } from "./index";

describe(greeting, () => {
  test("should return a greeting message", () => {
    expect(greeting()).toBe("This is pnpm test project");
  });
});
