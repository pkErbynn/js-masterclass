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

