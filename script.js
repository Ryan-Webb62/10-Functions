'use strict';

//---------------------Coding Challenge #1 -------------------------
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnser() {
    const answer = Number(
      prompt(
        `${this.question}\n\t${this.options.join('\n\t')}(Write option number)`
      )
    );

    if (
      typeof answer === 'number' &&
      answer >= 0 &&
      answer <= this.answers.length
    ) {
      this.answers[answer]++;
      this.displayResults();
      this.displayResults('string');
    } else {
      console.log(
        `You did not provide an answer between 0 and 3, please try again!`
      );
    }
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnser.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// [5,2,3]
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
// [1,5,3,9,6,1]
//---------------------The bind Method -----------------------------
/* 
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

const book = lufthansa.book;

// book.call(eurowings, 23, 'Sarah Jones');
// can bind the function's this to different objects
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

// can bind the arguments of the function as well
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schedtmann');
bookEW23('Martha Cooper');

// With event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// Without using the bind method this for buyPlane would point to the 'buy' button object
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));
console.log(addVAT(200));

// Instead of bind in this case you could use a function to return a function
const addTaxRate = (rate) => {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));
 */

//---------------------The call and apply methods ------------------

/* 
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book('239', 'Jonas');
lufthansa.book('635', 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Doesn't work
//book(23, 'Sarah Jones');
book.call(eurowings, 23, 'Sarah Jones');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

// apply method - must be an array
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
// can use the call method with the spread operator instead of apply
book.call(swiss, ...flightData);
 */
//---------------------Functions Returning Functions ---------------
/* 
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

const greet = (greeting) => {
  return (name) => {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');

greeterHey('Jonas');
greeterHey('Stephen');

greet('Hello')('Jonas');
 */
//---------------------Accepting Call Back Functions ----------------
/* 
const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...otherWords] = str.split(' ');
  return [first.toUpperCase(), ...otherWords].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed String: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const highFive = function () {
  console.log('🖐');
};

document.body.addEventListener('click', highFive);

['Jonas', 'Martha', 'Adam'].forEach(highFive);
 */
// --------------------Passing Arguments: Value vs. Reference------------------
/* 
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  // passing a primative like flight just makes a copy it is not the same
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};
newPassport(jonas);
checkIn(flight, jonas);
 */
// -------------------- Default Params-----------------------
/* 
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

// If you want to skip a param you enter undefined to use default
createBooking('LH123', undefined, 1000);
 */
