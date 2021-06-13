import { switcho } from "../../index";

enum ESwitchoMode {
  OBJECT = "object",
  ARRAY = "array",
}

enum ETestType {
  VALUE = "Value",
  VARIABLE = "Variable",
  FUNCTION = "Function",
}

enum ETargetAvailability {
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable",
}

enum EDefaultAvailability {
  WITH = "with",
  WITHOUT = "without",
}

const baseObject = {
  apple: "newmac",
  microsoft: "newsurface",
  amazon: "newkindle",
};

const doTest = (
  switchoMode: ESwitchoMode,
  testType: ETestType,
  targetAvailability: ETargetAvailability,
  defaultAvailability: EDefaultAvailability,
  switchoInstance: any,
  expectToBe: any
) => {
  test(`As [${switchoMode}] ${testType} -> ${targetAvailability} ${defaultAvailability} default`, () => {
    expect(switchoInstance).toBe(expectToBe);
  });
};

/* Object mode */
// Using values in object
doTest(
  ESwitchoMode.OBJECT,
  ETestType.VALUE,
  ETargetAvailability.AVAILABLE,
  EDefaultAvailability.WITHOUT,
  switcho("apple", baseObject),
  "newmac"
);

doTest(
  ESwitchoMode.OBJECT,
  ETestType.VALUE,
  ETargetAvailability.UNAVAILABLE,
  EDefaultAvailability.WITHOUT,
  switcho("facebook", baseObject),

  null
);

doTest(
  ESwitchoMode.OBJECT,
  ETestType.VALUE,
  ETargetAvailability.AVAILABLE,
  EDefaultAvailability.WITH,
  switcho("apple", { default: "hey", ...baseObject }),
  "newmac"
);

doTest(
  ESwitchoMode.OBJECT,
  ETestType.VALUE,
  ETargetAvailability.UNAVAILABLE,
  EDefaultAvailability.WITH,
  switcho("facebook", { default: "hey", ...baseObject }),
  "hey"
);

// Using functions in object
doTest(
  ESwitchoMode.OBJECT,
  ETestType.FUNCTION,
  ETargetAvailability.AVAILABLE,
  EDefaultAvailability.WITHOUT,
  switcho("apple", { ...baseObject, apple: () => "newmac" }),
  "newmac"
);

/* Array mode */
(() => {
  const myVar = 30027;
  doTest(
    ESwitchoMode.ARRAY,
    ETestType.VARIABLE,
    ETargetAvailability.AVAILABLE,
    EDefaultAvailability.WITHOUT,
    switcho(myVar, [
      [34, "Paris"],
      [30027, "London"],
      [100000, "Tokyo"],
    ]),
    "London"
  );
})();
(() => {
  const num = 1140;
  const add = 1224;
  doTest(
    ESwitchoMode.ARRAY,
    ETestType.FUNCTION,
    ETargetAvailability.AVAILABLE,
    EDefaultAvailability.WITH,
    switcho(num + add, [
      [123, "Paris"],
      [2364, () => "London"],
      [0, "Tokyo"],
      "Montreal",
    ]),
    "London"
  );
})();
(() => {
  const num = 1140;
  const add = 1224;
  doTest(
    ESwitchoMode.ARRAY,
    ETestType.FUNCTION,
    ETargetAvailability.UNAVAILABLE,
    EDefaultAvailability.WITH,
    switcho(250, [
      [123, "Paris"],
      [num + add, () => "London"],
      [0, "Tokyo"],
      "Montreal",
    ]),
    "Montreal"
  );
})();
