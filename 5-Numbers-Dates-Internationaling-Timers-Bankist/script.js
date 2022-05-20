'use strict';   // activated strict mode to write secure code

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// displaying account movement for one account
const displayAccountMovements = function(acc, isSorted = false) {   // default false value otherwise need to be passed in every place it is called
  containerMovements.innerHTML = '';  // clear default elements

  const moves = acc.movements;

  // need '.slice' because sort will change the underling array so a copy is needed...also, remember not to chain methods that changes the original array
  const movements = isSorted ? moves.slice().sort((a, b) => a - b) : moves;


  movements.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[index]);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${index + 1} deposit</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${movement.toFixed(2)}€</div>
    </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)  // insert html element
  })
}
// displayAccountMovements(account1.movements)  // movement data will be from the account that logs into the app

// create usernames for each/all accounts
const createUserNames = function (accounts) {
  accounts.forEach(acc => {   // foreach (not map) cus wanted to modify the original accounts array (used to produce 'side effect'), not return a new array of obj from the original
    const nameArr = acc.owner.split(' ');
    const username = nameArr.map(name => name[0]).join('').toLowerCase(); // map cus wanted to return a new array and then join
    acc.username = username
  })
}
createUserNames(accounts);

// calculate balance for one account - reduce()
const calculateDisplayBalance = function (acc) {
  const movements = acc.movements;
  const balance = movements.reduce((accumulator, current) => accumulator + current, 0);
  acc.balance = balance;  // create balance property
  labelBalance.textContent = `${balance.toFixed(2)} €`  // .toFixed(2) for two dec places
}
// calculateDisplayBalance(account1.movements)  // replaced by login user data


// calculate income/deposit sum - using filter(), reduce(), map()
const calculateDisplayInOutSummary = function (account) {
  const movements = account.movements;
  const incomeSum = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomeSum.toFixed(2)} €`

  const outflowSum = movements.filter(mov => mov < 0)
                              .reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = `${Math.abs(outflowSum).toFixed(2)} €`

  const interestOnDeposit = movements.filter(mov => mov > 0)
                                    .map(deposit => deposit * account.interestRate)
                                    .filter((interest, index, arr) => interest >= 1) // apply only when interest is at least 1
                                    .reduce((acc, mov) => acc + mov, 0)
  labelSumInterest.textContent = `${Math.abs(interestOnDeposit).toFixed(2)} €`
}
// calculateDisplayInOutSummary(account1.movements) // replaced with user data after login 

// update UI
const updateUI = function (acc) {
  // display movement
  displayAccountMovements(acc);

  // display balance 
  calculateDisplayBalance(acc)

  // display summary
  calculateDisplayInOutSummary(acc)
}


// login - using find()
let currentLoggedInAccount; // current account global accessible

/////////// FAKE ALWAYS LOGGED IN FOR DEV
currentLoggedInAccount = account1
updateUI(currentLoggedInAccount);
containerApp.style.opacity = 100;



btnLogin.addEventListener('click', event => {
  event.preventDefault(); // prevents default form reload after submission

  const currentUser = inputLoginUsername.value;
  console.log(currentUser);
  currentLoggedInAccount = accounts.find(acc => acc?.username == currentUser) // since username is computed (not part of the original account object), optional check is required
  
  // after account is found, chect it's pin
  const pinNumber = Number(inputLoginPin.value);  // incoming string pin from form thus need casting
  if(currentLoggedInAccount?.pin === pinNumber){  // '.?', since accessing pin property on a matched account and the account may not be matched
    console.log(inputLoginPin.value, ' LOGIN');
    // Display ui and message
    labelWelcome.textContent = `Welcome back, ${currentLoggedInAccount.owner.split(' ')[0]}`

    // enable account visibility
    containerApp.style.opacity = 1;

    // create date and time
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min =  `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // clear form
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur(); 

    // // display movement
    // displayAccountMovements(currentLoggedInAccount.movements);

    // // display balance 
    // calculateDisplayBalance(currentLoggedInAccount)

    // // display summary
    // calculateDisplayInOutSummary(currentLoggedInAccount)

    // update ui - consolidated the methods
    updateUI(currentLoggedInAccount)
  }
})

// transfer money - using find()
btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const reciever = accounts.find(acc => acc?.username == inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';  // clearing both forms
  
  if(amount > 0 &&
    amount <= currentLoggedInAccount.balance &&
    reciever &&
    reciever.username !== currentLoggedInAccount.username){
      console.log('Trasfering...');
      currentLoggedInAccount.movements.push(-amount);
      reciever.movements.push(amount);

      // add transfer date
      currentLoggedInAccount.movementsDates.push(new Date().toISOString());
      reciever.movementsDates.push(new Date().toISOString());

      // update ui
      updateUI(currentLoggedInAccount);
    }
})

// user can request loan if any of his deposite is greater than 10% of the load
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(Number(inputLoanAmount.value));

  const overTenPercent = mov => mov >= amount * 0.1;
  if(amount > 0 && currentLoggedInAccount.movements.some(overTenPercent)){  // overTenPercent as callback, no '()'
    console.log('eligible...');
    // add movements
    currentLoggedInAccount.movements.push(amount);

    // add loan date
    currentLoggedInAccount.movementsDates.push(new Date().toISOString())

    // update ui
    updateUI(currentLoggedInAccount)
  }

  inputLoanAmount.value = '';
})

// sorting movements
let isSorted = false; // state variable
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayAccountMovements(currentLoggedInAccount.movements, !isSorted);
  isSorted = !isSorted;
})

// deleting or closing account - findIndex(), splice()
btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  if(currentLoggedInAccount.username == inputCloseUsername.value &&
    currentLoggedInAccount.pin == Number(inputClosePin.value) ) {
      const currentAccountIndex = accounts.findIndex(acc => acc.username == currentLoggedInAccount.username);
      // console.log('del', currentAccountIndex);

      // delete account
      accounts.splice(currentAccountIndex, 1);

      // hide ui
      containerApp.style.opacity = 0;
    }

  inputCloseUsername.value = inputClosePin.value = '';  // clearing both forms
})


// NB:
// Do everything first with one account then implement signed-in user to select its account

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]


///////////// data transformations

///// only withdrawals
const withdrawals = movements.filter(mov => mov < 0)
console.log('withdrawals:', withdrawals);

/////// max number
const max = movements.reduce((acc, cur) => {
  if(acc > cur) return acc;
  else return cur;
}, movements[0])
console.log('max', max);

//////// average movement
// [2, 3] => (2+3)/2 = 2.5
const sum = movements.reduce((acc, curr) => acc + curr, 0)
console.log('average:', sum/movements.length);

// [2, 3] => (2+3)/2 === 2/2 + 3/2 = 2.5
const average = movements.reduce((acc, curr, _, arr) => acc + curr/arr.length, 0)
console.log('average2:', average);

/////// calculate average of filtered values
const calcAverage = function (movs) {
  const mappedValues = movs.map(mov => mov < 0 ? mov - 1: mov + 1); // subtract 1 if negative else add 1
  console.log(mappedValues);
  const odds = mappedValues.filter(mov => mov % 2 !== 0);
  console.log(odds);
  const average = odds.reduce((acc, evenMov) => acc + evenMov) / movs.length;
  return average;
}
console.log(calcAverage(movements));

/// reduce() as counter
const numberOfDepositeBeyond1000 = accounts.flatMap(acc => acc.movements)
                                            .filter(mov => mov > 1000)
                                            .length;
console.log('numberOfDepositeBeyond1000:', numberOfDepositeBeyond1000);                                    

// without filter
const numberOfDepositeBeyond10002 = accounts.flatMap(acc => acc.movements)
                                            .reduce((count, current) => (current > 1000 ? count + 1 : count), 0)
console.log('numberOfDepositeBeyond10002:', numberOfDepositeBeyond10002)

// reduce to return an object ****
const h = accounts.flatMap(acc => acc.movements)
                  .reduce((sum, curr) => {    // init sum =  {deposits: 0, withdrawals: 0}
                    curr > 0 ? 
                    sum.deposits += curr : 
                    sum.withdrawals += curr;
                    return sum;
                  }, {deposits: 0, withdrawals: 0})
console.log('ehch: ', h);

const h2 = accounts.flatMap(acc => acc.movements)
                  .reduce((sum, curr) => {   
                    sum[curr > 0 ? 'deposits' : 'withdrawal'] += curr;  // more complicated
                    return sum;
                  }, {deposits: 0, withdrawals: 0})
console.log('ehch2: ', h2);

////////////////// find() on array of objects
const account = accounts.find(account => account.owner === 'Jessica Davis')
console.log('account match:', account);

//////////////// flat(), flatMap()
const flatme = [1, 3, 4, [5, 3, 6], [7, 8, 0]]
console.log(flatme.flat());

const flatmeToo = [1, 3, 4, [5, [3, 6]], [[7, 8,], 0]]
console.log(flatmeToo.flat());  // default: 1-level deep flat(1)
console.log(flatmeToo.flat(2)); // 2-level deep

const flatAndSumAllAccountsMovements = accounts.map(acc => acc.movements)
                                              .flat()
                                              .reduce((accumulator, curr) => accumulator + curr);
console.log(flatAndSumAllAccountsMovements);

// using flatmap()........yessssssssssssss, i baaaaaaarb!!!!!!!!!!!!
const flatAndSumAllAccountsMovements2 = accounts.flatMap(acc => acc.movements)
                                              .reduce((accumulator, curr) => accumulator + curr);
console.log(flatAndSumAllAccountsMovements2);


///// sort()
const nameArr = ['Papa', 'Erb', 'Kwesi', 'John', 'Gastone' ]
console.log(nameArr.sort());

const sortNumbers = [332, 2443, 5555, 392, 93, 3334];
console.log(sortNumbers.sort());  // doesn't work just like that on numbers, does it as strings

console.log(sortNumbers.sort((a, b) => a - b)); // < 0 for ascending
console.log(sortNumbers.sort((a, b) => b - a)); // > 0 for descending


//// Array.from() use case
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),   // querySelectorAll() used the get elements from the ui directly
    domEle => +(domEle.textContent.replace('€', '')) // Number(domEle.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // same as doing this
  const movementsUI2 = Array.from(
    document.querySelectorAll('.movements__value'));
  console.log(movementsUI2);
  const res2 = movementsUI2.map(domEle => +(domEle.textContent.replace('€', '')));
  console.log(res2);

  // same as
  const movementsUI3 = [...document.querySelectorAll('.movements__value')]
  const res3 = movementsUI3.map(domEle => +(domEle.textContent.replace('€', '')));
  console.log(res3);
})

/// convert to title case
// This is a title case => This is a title Case

const titleCase = function (sentence){
  const exceptions = ['of', 'a', 'and', 'to'];

  const res = sentence.toLowerCase()
                      .split(' ')
                      .map(word => exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1))
                      .join(' ');
  const finalRes = res[0].toUpperCase() + res.slice(1)
  return finalRes;
}

console.log(titleCase('This is a title case'));
console.log(titleCase('js prograMMing is a SKILL of many to LEARN'));
console.log(titleCase('and here is another TITLE WITH example'));   // res[0].toUpperCase() + res.slice(1)


//////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
GOOD LUCK 😀
*/


const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. 
const dogs2 = dogs.forEach(dog => 
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
console.log(dogs);

// 2.
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah') )
console.log(sarahDog);

// 3.
const tooMuchOwners = dogs.filter(dog => dog.curFood > dog.recommendedFood)
                          .flatMap(dog => dog.owners)
console.log(tooMuchOwners);
const toolLittleOwners = dogs.filter(dog => dog.curFood < dog.recommendedFood)
                          .flatMap(dog => dog.owners)
console.log(toolLittleOwners);

// 4.
// "Matilda and Alice and Bob's dogs eat too much!"
//  "Sarah and John and Michael's dogs eat too little!"
console.log(`${tooMuchOwners.join(' and ')}'s dogs eat too much!`);
console.log(`${toolLittleOwners.join(' and ')}'s dogs eat too little!`);
// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));
// 6.
// current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOkay));
// 7.
console.log(dogs.filter(checkEatingOkay));
// 8.
// sort it by recommended food portion in an ascending order [1,2,3]
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
