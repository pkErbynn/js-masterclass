//////////// distructuring
const e = () => [1,2]

// swapping variables
let [x, y] = e();
console.log(x,y);

[y, x] = [x, y]
console.log(x,y);

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

// params
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


