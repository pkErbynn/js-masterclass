'use strict';

///////////////////////////////////////
// Constructor Functions and the new Operator

const Person = function (firstName, birthYear) {
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Never to this in side constructor function!
    // this.calcAge = function () {
    //   console.log(2037 - this.birthYear);
    // };
  };
  
  const jonas = new Person('Jonas', 1991);
//   console.log(jonas);
//   // 1. New {} is created
//   // 2. function is called, this = {}
//   // 3. {} linked to prototype
//   // 4. function automatically return {}
  const matilda = new Person('Matilda', 2017);
  const jack = new Person('Jack', 1975);
//   console.log(jonas instanceof Person);
  Person.hey = function () {
    console.log('Hey there 👋');
    console.log(this);  // the class that calls the method
  };
  Person.hey();


////////////////////////////////////////////
///// Prototypes

console.log('Person Prototype', Person.prototype);

Person.prototype.calcAge = function() { // added new property to the class/prototype at runtime
    console.log(2022 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__)  // inherited properties/members from main class or prototype...use "__proto__" on instance and "prototype" on the Class prototype itself...linkes object instances to their class prototype's properties
console.log(Person.prototype.isPrototypeOf(jonas))   // true, since jonas is an instance of Person

Person.prototype.specieType = "Homo Sapien";    // add property at runtime
console.log(jonas.specieType);  // instance inherit it

console.log(jonas.hasOwnProperty('specieType'));    // false, since this property is added by the Class itself...and not part of the properties specified while creating the jonas instance
console.log(jonas.hasOwnProperty('firstName')) // true, cus firstName property was specified during construction

// __proto__ on object shows the properties added by the Class at runtime..makes it accessible by instance through inheritance


///////////////////////////////////////
// // Prototypal Inheritance on Built-In Objects

// console.log(jonas.__proto__);

// // Object.prototype (top of prototype chain)
// console.log(jonas.__proto__.__proto__); // from jonas object, to Person class, to Object
// console.log(jonas.__proto__.__proto__.__proto__); // // from jonas object -> Person class -> to Object -> null

// console.dir(Person.prototype.constructor);  // dir for inspection

// const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);  // object.parent = parent
// console.log(arr.__proto__.__proto__);

// Array.prototype.unique = function () {  // adding custome function to built-in Array class
//   return [...new Set(this)];
// };
// console.log(arr.unique());

// const h1 = document.querySelector('h1');
// console.dir(x => x + 1);


///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
GOOD LUCK 😀
*/


// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();


///////////////////////////////////////
// ES6 Classes

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {    // PersonClass
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }
    // Instance methods - Methods will be added to .prototype property
    calcAge() {
      console.log(2037 - this.birthYear);
    }   // no commas between methods

    greet() {
      console.log(`Hey ${this.fullName}`);
    }

    get age() { // makes methods as properties
      return 2037 - this.birthYear;
    }

    // Setters and Getters
    // setting property that already exists
    set fullName(name) {    // setters are good for data validation before object creation
        if(name.includes(' ')) {
            this._fullName = name;  // while property already exist, add '_'
        } else {
            alert(`${name} is not a full name!`)
        }
    }

    get fullName() {    // help support object.fullName property
        return this._fullName;
    }

    static hey(){
        console.log('Hey there!!');
    }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);

// const jessica2 = new PersonCl('Jessica', 1996); // doesn't allow both fullName and _fullName properties to be set due to the data validation
// console.log(jessica2);  // fullName = undefined

jessica.calcAge();
console.log(jessica.age);   // called as property not a method

console.log(jessica.__proto__ === PersonCl.prototype);

PersonCl.prototype.greet = function () {    // adding another function even after class creation
  console.log(`Hey ${this.firstName}`);
};

jessica.greet();

PersonCl.hey();
// jessica.hey() // won't work!!



///////////////////////////////////////
// Setters and Getters - on Object literals

const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 300],

    get latest() {
      return this.movements.slice(-1).pop();
    },

    set latest(mov) {
      this.movements.push(mov);
    },
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);


