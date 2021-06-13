import { ICaseArray, ISwitchoParams, TCaseValue } from "../models/models";
import executeIfFunction from "./executeIfFunction";

/**
 * Handles when 'cases' is an Array
 * @param target Target scenario (string or var) that will trigger a case match
 * @param cases Array of cases
 * @returns The case that matches the target, or default if available
 */
export const ifArray: ISwitchoParams = (
  target: TCaseValue,
  cases: ICaseArray
) => {
  const res = cases.find((elem: any) => target === executeIfFunction(elem[0]));
  return res
    ? executeIfFunction(res[1])
    : ((findDefault = cases.find((elem: any) => !Array.isArray(elem))) =>
        findDefault ? executeIfFunction(findDefault) : null)();
};
