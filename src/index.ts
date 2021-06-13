import executeIfFunction from './helpers/executeIfFunction';
import { ifArray } from './helpers/ifArray';
import { ifObject } from './helpers/ifObject';
import { ISwitchoParams } from './models/models';

/**
 * Switcho => A prettier, more functional way to handle exclusive cases
 * @param target Target scenario (string or var) that will trigger a case match
 * @param cases List of cases
 * @returns The case that matches the target, or default if available
 */
const switcho: ISwitchoParams = (target, cases) =>
  (Array.isArray(cases) ? ifArray : ifObject)(executeIfFunction(target), cases);

export default switcho;
