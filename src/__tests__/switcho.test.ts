import switcho from '../index';

enum ESwitchoMode {
  OBJECT = 'object',
  ARRAY = 'array ',
}

enum EValueType {
  VALUE = 'val',
  VARIABLE = 'var',
  EXPRESSION = 'exp',
  FUNCTION = 'fun',
}

enum EAvailability {
  AVAILABLE = '+',
  UNAVAILABLE = '-',
}

const fmtHeaderValue = (header: string, value?: string) =>
  [`\x1b[34m`, header, ': ', `\x1b[0m`, value].join('');

const doTest = (
  mode: ESwitchoMode,
  targetCasesTypes: {
    target: EValueType;
    casesOperand: {
      left: EValueType;
      right: EValueType;
    };
  },
  availability: {
    target: EAvailability;
    default: EAvailability;
  },
  switchoInstance: unknown,
  expectToBe: unknown,
) => {
  const testName = [
    fmtHeaderValue('MODE', mode),
    fmtHeaderValue(
      'TARGET_CASE_TYPES',
      `[${[
        targetCasesTypes.target,
        targetCasesTypes.casesOperand.left,
        targetCasesTypes.casesOperand.right,
      ].join(', ')}]`,
    ),
    fmtHeaderValue(
      'AVAILABILITY',
      `[${[availability.target, availability.default].join(', ')}]`,
    ),
  ].join(' ');
  test(`${testName}`, () => {
    expect(switchoInstance).toBe(expectToBe);
  });
};

/* Object mode */
(() => {
  // All types are values
  const targetCasesTypes = {
    target: EValueType.VALUE,
    casesOperand: {
      left: EValueType.VALUE,
      right: EValueType.VALUE,
    },
  };

  doTest(
    ESwitchoMode.OBJECT,
    targetCasesTypes,
    {
      target: EAvailability.AVAILABLE,
      default: EAvailability.UNAVAILABLE,
    },
    switcho('apple', {
      apple: 'newmac',
      microsoft: 'newsurface',
      amazon: 'newkindle',
    }),
    'newmac',
  );

  doTest(
    ESwitchoMode.OBJECT,
    targetCasesTypes,
    {
      target: EAvailability.UNAVAILABLE,
      default: EAvailability.UNAVAILABLE,
    },
    switcho('facebook', {
      apple: 'newmac',
      microsoft: 'newsurface',
      amazon: 'newkindle',
    }),
    null,
  );

  doTest(
    ESwitchoMode.OBJECT,
    targetCasesTypes,
    {
      target: EAvailability.AVAILABLE,
      default: EAvailability.AVAILABLE,
    },
    switcho('apple', {
      apple: 'newmac',
      microsoft: 'newsurface',
      amazon: 'newkindle',
      default: 'hey',
    }),
    'newmac',
  );

  doTest(
    ESwitchoMode.OBJECT,
    targetCasesTypes,
    {
      target: EAvailability.UNAVAILABLE,
      default: EAvailability.AVAILABLE,
    },
    switcho('facebook', {
      apple: 'newmac',
      microsoft: 'newsurface',
      amazon: 'newkindle',
      default: 'hey',
    }),
    'hey',
  );
})();

// Using functions in object
doTest(
  ESwitchoMode.OBJECT,
  {
    target: EValueType.VALUE,
    casesOperand: {
      left: EValueType.VALUE,
      right: EValueType.FUNCTION,
    },
  },
  {
    target: EAvailability.AVAILABLE,
    default: EAvailability.UNAVAILABLE,
  },
  switcho('apple', {
    apple: () => 'newmac',
    microsoft: 'newsurface',
    amazon: 'newkindle',
  }),
  'newmac',
);
doTest(
  ESwitchoMode.OBJECT,
  {
    target: EValueType.FUNCTION,
    casesOperand: {
      left: EValueType.VALUE,
      right: EValueType.FUNCTION,
    },
  },
  {
    target: EAvailability.AVAILABLE,
    default: EAvailability.UNAVAILABLE,
  },
  switcho(() => 'apple', {
    apple: () => 'newmac',
    microsoft: 'newsurface',
    amazon: 'newkindle',
  }),
  'newmac',
);

/* Array mode */
(() => {
  const myVar = 30027;
  doTest(
    ESwitchoMode.ARRAY,
    {
      target: EValueType.VALUE,
      casesOperand: {
        left: EValueType.VALUE,
        right: EValueType.FUNCTION,
      },
    },
    {
      target: EAvailability.AVAILABLE,
      default: EAvailability.UNAVAILABLE,
    },
    switcho(myVar, [
      [34, 'Paris'],
      [30027, 'London'],
      [100000, 'Tokyo'],
    ]),
    'London',
  );
})();
(() => {
  doTest(
    ESwitchoMode.ARRAY,
    {
      target: EValueType.VALUE,
      casesOperand: {
        left: EValueType.VALUE,
        right: EValueType.FUNCTION,
      },
    },
    {
      target: EAvailability.UNAVAILABLE,
      default: EAvailability.UNAVAILABLE,
    },
    switcho('hello', [
      [34, 'Paris'],
      [30027, 'London'],
      [100000, 'Tokyo'],
    ]),
    null,
  );
})();
(() => {
  const num = 1140;
  const add = 1224;
  doTest(
    ESwitchoMode.ARRAY,
    {
      target: EValueType.EXPRESSION,
      casesOperand: {
        left: EValueType.VALUE,
        right: EValueType.FUNCTION,
      },
    },
    {
      target: EAvailability.AVAILABLE,
      default: EAvailability.UNAVAILABLE,
    },
    switcho(num + add, [
      [123, 'Paris'],
      [2364, () => 'London'],
      [0, 'Tokyo'],
      'Montreal',
    ]),
    'London',
  );
})();
(() => {
  const num = 1140;
  const add = 1224;
  doTest(
    ESwitchoMode.ARRAY,
    {
      target: EValueType.EXPRESSION,
      casesOperand: {
        left: EValueType.VALUE,
        right: EValueType.FUNCTION,
      },
    },
    {
      target: EAvailability.UNAVAILABLE,
      default: EAvailability.AVAILABLE,
    },
    switcho(250, [
      [123, 'Paris'],
      [num + add, () => 'London'],
      [0, 'Tokyo'],
      () => 'Montreal',
    ]),
    'Montreal',
  );
})();

(() => {
  const num1 = 150;
  const num2 = 25;
  doTest(
    ESwitchoMode.ARRAY,
    {
      target: EValueType.EXPRESSION,
      casesOperand: {
        left: EValueType.FUNCTION,
        right: EValueType.VALUE,
      },
    },
    {
      target: EAvailability.AVAILABLE,
      default: EAvailability.UNAVAILABLE,
    },
    switcho(
      () => num1 + num2,
      [
        [() => 1, 'Small'],
        [() => 175, 'Medium'],
        [() => 5000, 'Large'],
      ],
    ),
    'Medium',
  );
})();
