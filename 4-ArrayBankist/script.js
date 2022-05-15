'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
const displayAccountMovement = function(movements) {
  containerMovements.innerHTML = '';  // clear default elements

  movements.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${index + 1} deposit</div>
      <div class="movements__value">${movement}€</div>
    </div>
    `
    containerMovements.insertAdjacentHTML('beforeend', html)  // insert html element
  })
}
displayAccountMovement(account1.movements)  // movement data will be from the account that logs into the app

// create usernames for each/all accounts
const createUserNames = function (accounts) {
  accounts.forEach(acc => {   // foreach (not map) cus wanted to modify the original accounts array (used to produce 'side effect'), not return a new array of obj from the original
    const nameArr = acc.owner.split(' ');
    const username = nameArr.map(name => name[0]).join('').toLowerCase(); // map cus wanted to return a new array and then join
    acc.username = username
  })
}
createUserNames(accounts);

// calculate balance for one account
const calculateDisplayBalance = function (movements) {
  const balance = movements.reduce((accumulator, current) => accumulator + current, 0);
  labelBalance.textContent = `${balance} €`
}
calculateDisplayBalance(account1.movements)


// calculate income/deposit sum
const calculateDisplayInOutSummary = function (movements) {
  const incomeSum = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomeSum} €`

  const outflowSum = movements.filter(mov => mov < 0)
                              .reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = `${Math.abs(outflowSum)} €`

  const interestOnDeposit = movements.filter(mov => mov > 0)
                                    .map(deposit => deposit * (1.2 / 100))
                                    .filter((interest, index, arr) => interest >= 1) // apply only when interest is at least 1
                                    .reduce((acc, mov) => acc + mov, 0)
  labelSumInterest.textContent = `${Math.abs(interestOnDeposit)} €`
}
calculateDisplayInOutSummary(account1.movements)

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


//////// only withdrawals
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

////// find() on array of objects
const account = accounts.find(account => account.owner === 'Jessica Davis')
console.log('account match:', account);