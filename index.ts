import executeIfFunction from "./src/helpers/executeIfFunction";
import { ifArray } from "./src/helpers/ifArray";
import { ifObject } from "./src/helpers/ifObject";
import { ISwitchoParams } from "./src/models/models";

/**
 * Switcho => A prettier, more functional way to handle exclusive cases
 * @param target Target scenario (string or var) that will trigger a case match
 * @param cases List of cases
 * @returns The case that matches the target, or default if available
 */
const switcho: ISwitchoParams = (target, cases) =>
  (Array.isArray(cases) ? ifArray : ifObject)(executeIfFunction(target), cases);

export default switcho;
module.exports = switcho;

// Testing Only
let myNums = [1, 2, 3, 1, 4, 1, 2, 5, 3, 4];
let uniqueNums = switcho("banana", { banana: "hey" });
