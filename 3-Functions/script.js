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