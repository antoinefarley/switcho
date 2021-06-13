import { ICaseObj, TCaseValue } from '../models/models';
import executeIfFunction from './executeIfFunction';

/**
 * Handles when 'cases' is an Object
 * @param target Target scenario (string or var) that will trigger a case match
 * @param cases Object with keys  of cases
 * @returns The case that matches the target, or default if available
 */
export const ifObject: any = (target: any, cases: ICaseObj): TCaseValue => {
  if (Object.prototype.hasOwnProperty.call(cases, target)) {
    return executeIfFunction(cases[target]);
  } else if (Object.prototype.hasOwnProperty.call(cases, 'default')) {
    return executeIfFunction(cases.default);
  }
  return null;
};
