type NotFunction<T> = T extends Function ? never : T;

type TCaseValue = NotFunction<any> | (() => any);

interface ICaseObj {
  [caseKey: string]: TCaseValue;
  default?: TCaseValue;
}

type ICaseArrayMember = [any, any];

interface ISwitchoParams {
  (targetKey: any, cases: ICaseObj | ICaseArrayMember[]): any;
}

const executeIfFunction = (value: TCaseValue) => (value instanceof Function ? value() : value);

const switcho: ISwitchoParams = (targetKey, cases) => {
  if (Array.isArray(cases)) {
    const res = cases.find((elem) => targetKey === executeIfFunction(elem[0]));
    return res ? executeIfFunction(res[1]) : null;
  } else {
    const isInCases = {
      targetKey: cases.hasOwnProperty(targetKey),
      default: cases.hasOwnProperty('default'),
    };
    return isInCases.targetKey
      ? executeIfFunction(cases[targetKey])
      : isInCases.default
      ? executeIfFunction(cases.default)
      : null;
  }
};

export default switcho;
