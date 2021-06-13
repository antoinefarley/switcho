import { ICaseObj, ISwitchoParams, TCaseValue } from "../models/models";
import executeIfFunction from "./executeIfFunction";

/**
 * Handles when 'cases' is an Object
 * @param target Target scenario (string or var) that will trigger a case match
 * @param cases Object with keys  of cases
 * @returns The case that matches the target, or default if available
 */
export const ifObject: ISwitchoParams = (
  target: TCaseValue,
  cases: ICaseObj
) => {
  const isInCases = {
    target: cases.hasOwnProperty(target),
    default: cases.hasOwnProperty("default"),
  };
  return isInCases.target
    ? executeIfFunction(cases[target])
    : isInCases.default
    ? executeIfFunction(cases.default)
    : null;
};
