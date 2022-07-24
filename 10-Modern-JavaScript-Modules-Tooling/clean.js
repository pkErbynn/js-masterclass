// This file demonstrate refactoring of old way js to modern 
// Runs from Option A, B, ... mapping to Basic/Good, Pro/Better, Legend/Best

const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

const getLimit = user => spendingLimits?.[user] ?? 0;

const addExpense = function (value, description, user = 'jonas') {
  // if (!user) user = 'jonas';  // setting default user param...done in param ()
  user = user.toLowerCase();

  ///// Option A
  // var limit;
  // if (spendingLimits[user]) {
  //   limit = spendingLimits[user];
  // } else {
  //   limit = 0;
  // }

  ///// Option B...tenary
  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;

  //// Option C...nullish colesing + optional chain
  // const limit = spendingLimits?.[user] ?? 0;

  //// Opt D...DRY..outsourced fxn..arrow functions for straight forward functions 
  const limit = getLimit(user);

  if (value <= limit) {
    //// Opt A
    // budget.push({ value: -value, description: description, user: user });

    //// Opt B...Enhanced obj literal
    budget.push({ value: -value, description, user });
  }
};

addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);

const checkExpenses = function () {
  for (const entry of budget) {

    //// Option A
    // let limit;
    // if (spendingLimits[entry.user]) {
    //   limit = spendingLimits[entry.user];
    // } else {
    //   limit = 0;
    // }

    // if (entry.value < -getLimit(user)) {
    //   entry.flag = 'limit';
    // }

    //// Opt C
    // const limit = spendingLimits?.[entry.user] ?? 0;

    // if (entry.value < -limit) {
    //   entry.flag = 'limit';
    // }

    /// Opt D...with method
    if (entry.value < -getLimit(entry.user)) {
      entry.flag = 'limit';
    }
  }
};
checkExpenses();

console.log(budget);

const logBigExpenses = function (bigLimit) {
  let output = '';
  for (const entry of budget) {

    //// Opt A...if with no else
    // if (entry.value <= -bigLimit) {
    //   //// Opt A...contination with '+'
    //   // output += entry.description.slice(-2) + ' / '; // Emojis are 2 chars

    //   //// Opt B....string interpolation
    //   output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
    // }

    /// Opt B...ternary
    output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
    }

    output = output.slice(0, -2); // Remove last '/ '
    console.log(output);
  }



logBigExpenses(100);


///////////////////////////////////////////////////////////////
/////////////////////// USING PURE FUNTIONS ///////////////////

// Usage of Functional Programming to prevent side-effects and immutability

const budget2 = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits2 = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// this function depends on external data, thus impure 
// const getLimit2 = user => spendingLimits2?.[user] ?? 0;

// improved to pure by passing dependent data obj as param, 'sLimit'
const getLimit2 = (sLimit, user) => sLimit?.[user] ?? 0;

// Pure function...doesn't modify any data outside its scope...creates n returns new data
const addExpense2 = function (state, limits, value, description, user = 'jonas') {  // Pure, by passing dependent 'state' data object as param
  const cleanUser = user.toLowerCase();
  return value <= getLimit2(limits, cleanUser) ? 
    [...state, { value: -value, description, user: cleanUser }] : 
    state;  // returns previous state if cannot creat ne one
  }

const newBudget1 = addExpense2(budget2, spendingLimits2, 10, 'Pizza 🍕');
console.log('newBudget1:', newBudget1);
const newBudget2 = addExpense2(newBudget1, spendingLimits2, 100, 'Going to movies 🍿', 'Matilda');  // chaining result
console.log('newBudget2:', newBudget2);
const newBudget3 = addExpense2(newBudget2, spendingLimits2, 100, 'Stuff');
console.log('newBudget3:', newBudget3);


// Task: Return same number of elements in array, but modify element with property if satisfies condition
// ForEach causes side-effect and doesn't return a new instance
const checkExpenses2 = (stateData, limit) =>
  stateData.map(entry => {
    return entry.value < -getLimit2(limit, entry.user) ? 
      {...entry, flag: 'limit'} : entry
  })

const finalBudget = checkExpenses2(newBudget3);
console.log('finalBudget:', finalBudget);


const logBigExpenses2 = function (bigLimit) {
  let output = '';
  for (const entry of budget2) {
    output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  }
    
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
}



logBigExpenses2(100);






