type TCaseValue = any;

interface ICaseObj {
  [caseKey: string]: TCaseValue;
  default?: TCaseValue;
}

type ICaseArray = Array<[any, any] | any>;

interface ISwitchoParams {
  (target: TCaseValue, cases: ICaseObj | ICaseArray): TCaseValue;
}

export { ICaseArray, ICaseObj, ISwitchoParams, TCaseValue };
