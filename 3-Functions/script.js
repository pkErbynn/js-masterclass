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
