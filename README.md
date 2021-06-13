# switcho
A simple Javascript utility that improves the language's "switch" abilities. Half functional, half syntactic sugar!


## Installation

### npm
```javascript
npm install switcho
```

### yarn
```javascript
yarn add switcho
```

## Usage

### Import
```javascript
import switcho from 'switcho'; /* ESM */
const switcho = require('switcho'); /* CommonJS */
```
---

### Types / {Terminology}
- The real types differ -> For comprehension only
- Only one default case by instance allowed
```typescript
type anyValue = any;

/* Object Mode */
interface ICaseObj {
  [caseKey: string]: anyValue; /* {OPERAND} */
  default?: TCaseValue; /* {DEFAULT} */
}

/* Array Mode */
type ICaseArray = Array<
    [anyValue, anyValue] | /* {OPERAND} */
    () => anyValue | /* {DEFAULT} */
    anyValue /* {DEFAULT} */
>;

const switcho = (
    target: anyValue /* {TARGET} */, 
    cases: ICaseObj | ICaseArray /* {CASES} */
): anyValue => {...};
```
---

### Object Mode

#### Basic
```javascript
const res = switcho('apple', {
    apple: 'pie',
    orange: 'breakfast',
    grape: 'vines',
});
/* Result: 'pie' */
```

#### With default
```javascript
const res = switcho('Lychee', {
    apple: 'pie',
    orange: 'breakfast',
    grape: 'vines',
    default: 'best fruit!'
});
/* Result: 'best fruit!' */
```

#### Without default
```javascript
const res = switcho('Lychee', {
    apple: 'pie',
    orange: 'breakfast',
    grape: 'vines',
});
/* Result: null */
```

#### Using arrow functions on the right operand
```javascript
const isHungry = false;
const res = switcho('apple', {
    apple: () => isHungry ? 'pie' : 'cider',
    orange: 'breakfast',
    grape: 'vines',
});
/* Result: 'cider' */
```

#### Using arrow functions for the target
```javascript
const isHungry = false;
const res = switcho(() => isHungry ? 'apple' : 'grape', {
    apple: 'pie',
    orange: 'breakfast',
    grape: 'vines',
});
/* Result: 'vines' */
```
---

### Array mode

#### Basic
```javascript
const res = switcho('France', [
    ['France', 'Paris'],
    ['UK', 'London'],
    ['Japan', 'Tokyo'],
]);
/* Result: 'Paris' */
```

#### With a variable and default
```javascript
const country = 'Quebec?';
const res = switcho(country, [
    ['France', 'Paris'],
    ['UK', 'London'],
    ['Japan', 'Tokyo'],
    'Montreal'
]);
/* Result: 'Montreal' */
```

#### Using an expression for target, arrow functions for right cases operand
```javascript
  const num1 = 150;
  const num2 = 25;
  const res = switcho(num1 + num2, [
    [1, () => 'Small'],
    [175, () => 'Medium'],
    [5000, () => 'Large'],
]);
/* Result: 'Medium' */
```

#### Arrow functions for target and left operand
```javascript
  const num1 = 150;
  const num2 = 25;
  const res = switcho(() => num1 + num2, [
    [() => 1, 'Small'],
    [() => 175, 'Medium'],
    [() => 5000, 'Large'],
]);
/* Result: 'Medium' */
```

#### To return an array as the default case
```javascript
  const res = switcho("give me array", [
    [() => 1, 'Small'],
    [() => 175, 'Medium'],
    [() => 5000, 'Large'],
    () => ['thank', 'you']
]);
/* Result: ['thank', 'you'] */
```

## Motivation
- The switch statement is neither pretty or functional/useful
- It doesn't allow cases as expressions/variables
- Necessity to use break statements
- Not even mentionning "if/else"...

#### switch vs switcho
```javascript
const target = 'Lychee';

/* Using switch */
let switchRes;
switch(target){
    case 'apple':
        switchRes = 'pie';
        break;
    case 'orange':
        switchRes = 'breakfast';
        break;
    case 'grape':
        switchRes = 'vines';
        break;
    default:
        switchRes = 'best fruit!'
}

/* Using switcho */
const res = switcho('Lychee', {
    apple: 'pie',
    orange: 'breakfast',
    grape: 'vines',
    default: 'best fruit!'
});
```


## Limitations -> Future improvements
- Handling async content passed inside the cases
- Better typings (using any a lot right now)
- Improved performance
- Support for exhaustive enums in typescript (like regular switch)


## Collaboration
All collaboration, comments, suggestions are encouraged and appreciated. :)

