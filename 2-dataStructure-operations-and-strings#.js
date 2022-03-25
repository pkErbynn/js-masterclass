//////////// distructuring
const e = () => [1,2]

// swapping variables
let [x, y] = e();
console.log(x,y);

[y, x] = [x, y]
console.log(x,y);

// skiping
[x, ,z] = [1,2,3] // 1, 3

// object
// lookup
 

///////// spread operator use cases
let a = [1,2,3]
const b = [4,5, a[0], a[1], a[2]]
console.log(b);
const c = [4,5, ...a]
console.log(c); 
console.log(...c); // 4 5 1 2 3.... not wraped in array, therefore need to be put in an arr
console.log(2,2); // similar like loging
// nb: takes array element

// join arrs
a = [...a, ...c]
console.log('joined', a);

// as params
const s = (f, m, w) => (f + m + w);
console.log(`sum: ${s(...a)}`);

// object
const restaurant = {
    name: 'hatchland',
    ingredients: ['ginger', 'pepper']
}
console.log("res: ", restaurant);

const newRestua = {
    ...restaurant, // shallow copy kvp elements
    location: 'cape coast'
}
console.log("newRes: ", newRestua);

// or
const newRestua2 = { ...restaurant } // shallow copy kvp elements
newRestua2.location = "taifa";
console.log("newRes2: ", newRestua2);

////// reset: opposit of spread...packs elements into array
// object
const openingHours = {
    thurs: {open: 6, close: 5},
    fri: {open: 7, close: 5},
    sat: {open: 8, close: 4},
}
const {say, ...weekdays} = openingHours;
console.log(weekdays); // construct element

// function: rest params...limitless param inputs
const add = function(...nums){  //...nums: packs items into an array
    let sum = 0;
    for(let i = 0; i < nums.length; i++){
        sum += nums[i];
    }
    console.log(sum);
}
add(1,2,)
add(1,2,3)
add(1,2,3,4)
x = [2,4,6]
add(...x) //spread and reset 

///// setting default value when nullish
// using ternary
restaurant.guestNum = 0; // what if 0 guests
const guestNum = restaurant.guestNum ? restaurant.guestNum : 10
console.log('guestNum', guestNum); // still 10 instead of 0

// fixing using Nullish coalescing 
restaurant.guestNum = 0; // what if 0 guests
const guestNumCorrect = restaurant.guestNum ?? 10
console.log('guestNumCorrect', guestNumCorrect);

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:
1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
GOOD LUCK 😀
*/

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ],
      [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
  };

// 1. 
// const [players1, players2] = [game.players[0], game.players[1]];
const [players1, players2] = game.players; // nb: not [game.players]...cus LHS = RHS structure 
console.log(players1, players2);

// 2.
const [gk, ...fieldPlayers] = [...players1]
console.log('gk:', gk);
console.log('fieldPlayers:', fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];
console.log('allPlayers:', allPlayers);

// 4. 
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']
console.log('players1Final:', players1Final);

// 5.
// const {odds: {team1, draw, team2}} = game; // don't forget default values
// const {odds: {team1: team1 = 0, x: draw = 0, team2: team2 = 0}} = game;
const {team1: team1 = 0, x: draw = 0, team2: team2 = 0} = game.odds;    //LH object should match RH object
console.log('odds:', team1, draw, team2);

// 6.
const printGoals = function(...playerNames){
    playerNames.forEach(element => {
        console.log(element);
    });
    console.log(`${playerNames.length} goals were scored`);
}
printGoals(...game.scored);

// 7. 
// const winner = team1 < team2 ? {team1: team1} : {team2: team2};
// console.log('winner', winner);
team1 < team2 && console.log('team1 more likely to win');   //nb: no else part considered

///////////////////////////////////////
///////// For-of loop
// regular way
for (const player of players1.entries() ) {
  // const [i, n] = player;
  console.log(`${player[0] + 1}: ${player[1]}`);
}

// destructuring from the source spot
for (const [i, el] of players1.entries() ) {  
  console.log({index: i+1, player: el} );
  console.log(`${i + 1}: ${el}`);
}

///////// Object literal
// old syntax
let restaurant2 = {
  name: 'hatchland',
  ingredients: ['ginger', 'pepper'],
  menu: ['pizza', 'ice-cream', 'burgar'],
  openingHours: openingHours,
  order: function(orderIndex = 0){  // function expression
    return `You ordered ${this.menu[orderIndex]}`
  }
}
console.log(restaurant2);
console.log(restaurant2.order());

// ehanced obj literal
restaurant2 = {
  name: 'hatchland',
  ingredients: ['ginger', 'pepper'],
  menu: ['pizza', 'ice-cream', 'burgar'],
  openingHours, // encapsulated kvp
  order(orderIndex = 0){  // just the function expression
    return `You ordered ${this?.menu[orderIndex]}`
  }
}
console.log(restaurant2);
console.log(restaurant2.order(1));

///////// Optional chaining
// on properties
let availability = restaurant2.openingHours?.fri?.open ?? 'closed';
console.log('status', availability);

// on methods
let order = restaurant2?.order?.(2);
console.log('order', order);

///////// Looping Object - keys, values, entries
for(const day of Object.keys(openingHours)) {
  console.log(day);
}
for(const openClose of Object.values(openingHours)) {
  console.log(openClose);
}

for(const [key, value] of Object.entries(openingHours)) {
  console.log(`On ${key} we open at ${value.open} and close at ${value.close}`);
}

///////////////////////////////////////
// Coding Challenge #2
/* 
Let's continue with our football betting app!
1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }
GOOD LUCK 😀
*/

// 1. Could traditionally used the normal for-loop with i++
for(const [index, player] of game.scored.entries()){
  console.log(`"Goal ${index}: ${player}"`);
}

// 2.
let sum = 0.0;
for(const [k, v] of Object.entries(game.odds)){
  sum = sum + v;
  console.log(k, v);
}
const avg = (sum/ Object.entries(game.odds).length)
console.log(`Average: ${avg}`);

// 3. 
for(const [k, v] of Object.entries(game.odds)){
  const result = k === 'x' ? `draw: ${v}` : `victory ${game[k]}: ${v}`;
  console.log(`Odds of ${result}`);
}

// 4.
const scorers = {};
let scored = ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels']
for (const player of scored){
  // if(!scorers[player]) {
  //   scorers[player] = 1
  // } else {
  //   scorers[player] = scorers[player] + 1
  // }
  !scorers[player] ? scorers[player] = 1 : scorers[player] = scorers[player] + 1;
  // scorers[player] ? scorers[player] = scorers[player] + 1 : scorers[player] = 1;
}
console.log(scorers);


/////////// Set
const uniqueScoredPlayers = new Set(game.scored)
const uniqueScoredPlayersNumber = uniqueScoredPlayers.size
const uniqueScoredPlayersArr = [...uniqueScoredPlayers]
// console.log("uniqueScoredPlayersArr:", uniqueScoredPlayersArr);
// console.log("uniqueScoredPlayersNumber:", uniqueScoredPlayersNumber);


/////////// Map - an iterable just like array
// keys/values can be of any type
const m1 = new Map();
m1.set('food', 'fufu')
m1.set('category', ['vege', 'nonvege'])
console.log(m1);

// chaining
const m2 = new Map();
m2.set('food', 'fufu')
    .set('category', ['vege', 'nonvege'])
    .set(true, 'we are open')
    .set({'a': 1, 'b': 2}, 'object value')
console.log(m2);

///// from scratch
// invalid - than 2 items
let fruits = new Map([
  ["apples" ,"bananas","oranges", "rer"],
  ["apples2" ,"bananas2","oranges2", "res2"]
]);
console.log(fruits);

// invalid - same arrays
fruits = new Map([
  ["apples" ,"bananas","oranges", "ree"],
  ["apples" ,"bananas","oranges", "ree"]
]);
console.log(fruits);

// // invalid - wrong entry format + 2+ array items
// fruits = new Map(
//   ["apples" ,"bananas","oranges"]
// );
// console.log(fruits);

// // invalid - wrong entry format + right array items (2 items)
// fruits = new Map(
//   ["apples", 500],
//   ["bananas", 300],
//   ["oranges", 200]
// );
// console.log(fruits);

// // valid - object.entries() format...ie, array of arrays
// fruits = new Map([
//   ["apples", 500],
//   ["bananas", 300],
//   ["oranges", 200]
// ]);
// console.log(fruits);

////// convert object to map
// to loop to get keys/values from plain object, Obj.entries() is used
// the result of that is an array-of-arrays and that's the input for map init too
let result = Object.entries(openingHours);
let hoursMap = new Map(result);
console.log('hoursMap', hoursMap);

// quiz app
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C#'],
  [2, 'Python'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct, yayyee!!'],
  [false, 'Try again!'],
])
console.log(question.get('question'));
for(const [key, value] of question){
  if(typeof key === 'number'){
    console.log(`${key}. ${value}`);
  }
}
const userAnswer = 3; // dynamic input can come from anywhere
const response = question.get('correct') === userAnswer
console.log(question.get(response));

//// convert maps to array
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);
