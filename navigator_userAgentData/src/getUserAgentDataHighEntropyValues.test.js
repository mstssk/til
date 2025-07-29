import { expect, test } from "vitest";
import { getUserAgentDataHighEntropyValues } from "./getUserAgentDataHighEntropyValues";

test(getUserAgentDataHighEntropyValues, async () => {
  await expect(getUserAgentDataHighEntropyValues()).resolves.toMatchObject({
    architecture: expect.any(String),
    bitness: expect.any(String),
    brands: expect.arrayContaining([
      expect.objectContaining({
        brand: expect.any(String),
        version: expect.any(String),
      }),
    ]),
    fullVersionList: expect.arrayContaining([
      expect.objectContaining({
        brand: expect.any(String),
        version: expect.any(String),
      }),
    ]),
    mobile: expect.any(Boolean),
    model: expect.any(String),
    platform: expect.any(String),
    platformVersion: expect.any(String),
    wow64: expect.any(Boolean),
  });
});
