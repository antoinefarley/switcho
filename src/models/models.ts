type NotFunction<T> = T extends Function ? never : T;

type TCaseValue = NotFunction<any> | (() => any);

interface ICaseObj {
  [caseKey: string]: TCaseValue;
  default?: TCaseValue;
}

type ICaseArray = [any, any] | any;

interface ISwitchoParams {
  (target: any, cases: ICaseObj | ICaseArray): any;
}

export { TCaseValue, ICaseObj, ICaseArray, ISwitchoParams };
