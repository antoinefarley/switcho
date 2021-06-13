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
  let defaultValue = null;
  let executedCaseValue = null;

  for (let i = 0; i < cases.length; i++) {
    executedCaseValue = executeIfFunction(cases[i][0]);
    if (executedCaseValue === target) {
      return executeIfFunction(cases[i][1]);
    } else if (!defaultValue && !Array.isArray(cases[i])) {
      defaultValue = executeIfFunction(cases[i]);
    }
  }

  return defaultValue;
};
