import { TCaseValue } from "../models/models";

/**
 * @param valueOrFunction Value or function to be executed
 * @returns The executed function if type is function, else the value
 */
const executeIfFunction = (valueOrFunction: TCaseValue) =>
  valueOrFunction instanceof Function ? valueOrFunction() : valueOrFunction;

export default executeIfFunction;
