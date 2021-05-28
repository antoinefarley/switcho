import switcho from '../index';

const baseObject = { apple: 'newmac', microsoft: 'newsurface', amazon: 'newkindle' };

/* Object mode */
// Using values in object
test('Value -> available targetKey, no default', () => {
  expect(switcho('apple', baseObject)).toBe('newmac');
});

test('Value -> unavailable targetKey, no default', () => {
  expect(switcho('hello', baseObject)).toBe(null);
});

test('Value -> available targetKey, default', () => {
  expect(switcho('apple', { default: 'hey', ...baseObject })).toBe('newmac');
});

test('Value -> unavailable targetKey, default', () => {
  expect(switcho('hello', { default: 'hey', ...baseObject })).toBe('hey');
});

// Using functions in object
test('Function -> available targetKey, no default', () => {
  expect(switcho('apple', baseObject)).toBe('newmac');
});

/* Array mode */
test('Variable -> available targetCase, no default', () => {
  const myVar = 30027;
  expect(
    switcho(myVar, [
      [34, 'Paris'],
      [30027, 'London'],
      [100000, 'Tokyo'],
    ]),
  ).toBe('London');
});

/* Array mode */
test('Expression -> AND gate', () => {
  const isTrue = true;
  const isFalse = false;
  expect(
    switcho(true, [
      [isTrue && isFalse, 'Paris'],
      [isTrue || isFalse, () => 'London'],
      [isFalse, 'Tokyo'],
    ]),
  ).toBe('London');
});

/* Array mode */
test('Expression -> AND gate false', () => {
  const isTrue = true;
  const isFalse = false;
  expect(
    switcho(false, [
      [isTrue && isFalse, 'Paris'],
      [isTrue || isFalse, () => 'London'],
      [isFalse, 'Tokyo'],
    ]),
  ).toBe('Paris');
});
