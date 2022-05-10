console.log('works....');

/////////////// default function params

const bookings = [];

const createBooking = function (flightNumber, numberPassender = 1, price = 100 * numberPassender) {
    const booking = {
        flightNumber,
        numberPassender,
        price
    };
    bookings.push(booking);
    console.log(booking);
}

createBooking('GH234', 5, 200)  // if passed it's used
createBooking('GH2343', 3)  // price calculated, if not passed
createBooking('GH2343')
createBooking('GH2343', undefined, 500) // skipping


///////////////// 1st Class and Higher order functions
// 1st class fxn
const oneWord = function (str){
    return str.replaceAll(/ /g, '').toLowerCase();  // replace all space with empty space
}

// 1st class fxn
const upperFirstWord = function (str){
    let [first, ...other] = str.split(' ');
    first = first.toUpperCase();
    return [first, ...other].join(' ')
}

// higher-order fnx using 1st class fxn, as callbacks
const transform = function(str, funx){
    console.log(`Transformed string: ${funx(str)}`);
}

transform('JavaScript is fun', oneWord)
transform('JavaScript is fun', upperFirstWord)


//////////////// Function returning another function
const greet = function (greeting){
    return function(name) {
        console.log(`${greeting} ${name}`);
    }
}

const greeterHey = greet('Hey');
greeterHey('Erb')

greet('Hey')('Pkay')    // oneline

// convert to arrow fxn
const greet2 = (greeting) => (name) => console.log(`${greeting} ${name}`);
greet2('Helloo')('Errrrrb')


///////////////// call and apply methods
const rwandair = {
    airline: 'RwandAir',
    iataCode: 'RW',
    // bookings: [],
    book(flightNum, passengerName) {
        console.log(`${passengerName} booked seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
    }
}

rwandair.book(234, 'erbynn')

const rwandair2 = {
    airline: 'RwandAir2',
    iataCode: 'RW2',
    // bookings: [],
}

const book = rwandair.book;     

book.call(rwandair2, 40, 'sarah')   // call it on diff object

const flightData = [4220, 'Corner']
book.call(rwandair2, ...flightData)   // call on diff object

// Bind - creates a new function from an existing one
const bookRW = rwandair.book.bind(rwandair2);   // functions are also objects, they have methods
bookRW(34, 'Grace');

// tax application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.21, 1000));

const addSSNIT = addTax.bind(null, 0.12);   // null for the 'this' obj...creates new function for SSNIT, with default/constant rate, such that only the value will be passed...depicts default param functions but this creates a new function from existing one
console.log(addSSNIT(1000));


///////////// closures
// not created manually like type like a map
// we just need to recognise when it happens

let f;

const g = function() {
    const a = 12;
    f = function(){
        console.log(a * 2);
    }
}

g()
f()