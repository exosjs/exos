import { toCamelCase, toPascalCase } from "./string-manipulation";

interface TestValues {
  value: string;
  expectedResult: string;
  result?: string;
}

describe("string-manipulation", () => {
  let values: TestValues[];

  describe("toCamelCase", () => {
    beforeAll(() => {
      values = [
        { value: "test", expectedResult: "test" },
        { value: "Test", expectedResult: "test" },
        { value: "TEST", expectedResult: "test" },
        { value: "AnotherTest", expectedResult: "anothertest" },
        { value: "anotherTest", expectedResult: "anothertest" },
        { value: "this-is-a-test", expectedResult: "thisIsATest" },
        { value: "this_is_a_test", expectedResult: "thisIsATest" },
        { value: "this is a test", expectedResult: "thisIsATest" },
      ];
    });

    describe("when receiving a string", () => {
      beforeAll(() => {
        values.forEach((item) => (item.result = toCamelCase(item.value)));
      });

      it("should convert it to camel case", () => {
        values.forEach((item) => {
          expect(item.result).toEqual(item.expectedResult);
        });
      });
    });
  });

  describe("toPascalCase", () => {
    beforeAll(() => {
      values = [
        { value: "test", expectedResult: "Test" },
        { value: "Test", expectedResult: "Test" },
        { value: "TEST", expectedResult: "Test" },
        { value: "AnotherTest", expectedResult: "Anothertest" },
        { value: "anotherTest", expectedResult: "Anothertest" },
        { value: "this-is-a-test", expectedResult: "ThisIsATest" },
        { value: "this_is_a_test", expectedResult: "ThisIsATest" },
        { value: "this is a test", expectedResult: "ThisIsATest" },
      ];
    });

    describe("when receiving a string", () => {
      beforeAll(() => {
        values.forEach((item) => (item.result = toPascalCase(item.value)));
      });

      it("should convert it to pascal case", () => {
        values.forEach((item) => {
          expect(item.result).toEqual(item.expectedResult);
        });
      });
    });
  });
});
