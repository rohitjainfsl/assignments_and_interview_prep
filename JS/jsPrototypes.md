# JavaScript Prototypes

JavaScript objects can inherit properties from other objects through a **prototype**.

```js
const animal = {
  eats: true,
  speak() {
    console.log("Some sound");
  }
};

const dog = Object.create(animal);

dog.name = "Milo";

console.log(dog.name);  // "Milo" - own property
console.log(dog.eats);  // true - inherited from animal
dog.speak();            // "Some sound"
```

When JavaScript evaluates `dog.eats`, it:

1. Looks directly on `dog`.
2. Doesn't find it, so looks at `dog`'s prototype (`animal`).
3. Continues up the **prototype chain** until it finds the property or reaches `null`.

Classes are prototype-based syntax:

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

const ada = new Person("Ada");

ada.greet();
console.log(Object.getPrototypeOf(ada) === Person.prototype); // true
```

`greet` is stored once on `Person.prototype`, not copied into every `Person` instance.

```js
console.log(ada.hasOwnProperty("name"));  // true
console.log(ada.hasOwnProperty("greet")); // false
```

- `name` belongs directly to `ada`.
- `greet` is inherited from `Person.prototype`.

A useful rule: put shared methods on the prototype; put per-object data on the object itself.

## Why are prototypes useful?

Prototypes explain how JavaScript *actually reuses behavior* between objects.

Without prototypes, each object might carry its own copy of every method:

```js
function makeUser(name) {
  return {
    name,
    greet() {
      console.log(`Hi, ${this.name}`);
    }
  };
}

const a = makeUser("Asha");
const b = makeUser("Ravi");
```

Here, `a.greet` and `b.greet` are separate function objects. With many instances, that is wasteful.

With a prototype, the method is shared:

```js
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  console.log(`Hi, ${this.name}`);
};

const asha = new User("Asha");
const ravi = new User("Ravi");

asha.greet();
ravi.greet();

console.log(asha.greet === ravi.greet); // true
```

Both users use one shared `greet` method, while each keeps its own `name`.

## Why students should learn it

1. **Classes are built on prototypes.**  
   `class`, `extends`, and methods look like traditional OOP, but JavaScript implements their shared behavior through prototypes.

2. **It helps debug confusing property behavior.**  
   A property may not appear directly on an object but can still be available through its prototype.

```js
const nums = [3, 1, 2];

nums.sort(); // Why does this exist?
```

`sort` is not written directly on `nums`; it comes from `Array.prototype`.

```js
console.log(nums.hasOwnProperty("sort")); // false
console.log(Array.prototype.hasOwnProperty("sort")); // true
```

3. **It explains built-in objects.**

```js
const text = "hello";

console.log(text.toUpperCase()); // "HELLO"
```

The string value can access methods supplied by `String.prototype`.

4. **It enables shared extensions - carefully.**

```js
function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.move = function () {
  console.log(`${this.type} is moving`);
};

const bike = new Vehicle("Bike");
const car = new Vehicle("Car");

bike.move();
car.move();
```

One behavior applies consistently to every `Vehicle`.

5. **It clarifies inheritance.**

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.makeSound = function () {
  console.log("Generic sound");
};

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.makeSound = function () {
  console.log("Woof!");
};

const puppy = new Dog("Bruno");
puppy.makeSound(); // "Woof!"
```

`Dog` inherits from `Animal`, then overrides one behavior.

## Student-friendly takeaway

> Prototypes are JavaScript's built-in system for sharing properties and methods between objects. You may use `class` syntax most of the time, but prototypes explain what those classes are doing underneath.

## Creating Constructor Functions

A constructor function is a regular function used with `new` to create objects of the same kind. By convention, its name starts with a capital letter.

```js
function Student(name, course) {
  this.name = name;
  this.course = course;
  this.completedLessons = 0;
}

const priya = new Student("Priya", "JavaScript Fundamentals");
const arjun = new Student("Arjun", "JavaScript Fundamentals");

console.log(priya.name); // "Priya"
console.log(arjun.completedLessons); // 0
console.log(Object.getPrototypeOf(priya) === Student.prototype); // true
```

When `new Student(...)` runs, JavaScript creates a new object, makes `Student.prototype` its prototype, calls `Student` with `this` set to that object, and returns the object.

## Adding a Method to a Prototype

Put behavior shared by every instance on the constructor's prototype. Each student keeps separate data, but they can all use one shared function.

```js
Student.prototype.completeLesson = function () {
  this.completedLessons += 1;
  return `${this.name} has completed ${this.completedLessons} lesson(s).`;
};

console.log(priya.completeLesson()); // "Priya has completed 1 lesson(s)."
console.log(arjun.completeLesson()); // "Arjun has completed 1 lesson(s)."
console.log(priya.completeLesson === arjun.completeLesson); // true
```

`completedLessons` changes on the individual object that called the method. The `completeLesson` function itself is found through `Student.prototype`.

## Prototype Inheritance

One constructor can inherit shared behavior from another. Here, `TeachingAssistant` gets the properties of a `Student` and also inherits `completeLesson`.

```js
function TeachingAssistant(name, course, officeHours) {
  Student.call(this, name, course); // initialize Student's own properties
  this.officeHours = officeHours;
}

TeachingAssistant.prototype = Object.create(Student.prototype);
TeachingAssistant.prototype.constructor = TeachingAssistant;

TeachingAssistant.prototype.helpStudent = function (question) {
  return `${this.name} will help with: ${question}`;
};

const neha = new TeachingAssistant("Neha", "JavaScript Fundamentals", "Friday 3 PM");

console.log(neha.completeLesson()); // inherited from Student.prototype
console.log(neha.helpStudent("array methods"));
console.log(neha instanceof Student); // true
console.log(neha instanceof TeachingAssistant); // true
```

`Object.create(Student.prototype)` links the `TeachingAssistant` prototype to the `Student` prototype. The `constructor` assignment restores the correct constructor reference after that replacement.

## Advanced Prototype Use Cases

### 1. Extending Built-in Objects

You can add a method to a built-in prototype. For example, a reporting application might need a reusable `sum` operation for numeric arrays.

```js
Array.prototype.sum = function () {
  return this.reduce((total, value) => total + value, 0);
};

const dailyOrders = [12, 18, 9];
console.log(dailyOrders.sum()); // 39
```

This works because arrays inherit from `Array.prototype`. However, modifying built-in prototypes in application code is usually discouraged: a library may define the same method differently, and the new method affects every array. Prefer a normal utility function unless you control the full environment.

```js
const sum = (numbers) => numbers.reduce((total, value) => total + value, 0);
console.log(sum(dailyOrders)); // 39
```

### 2. Shared Methods for Performance Optimization

For a large number of objects, defining a method inside a constructor makes a new function for each object. A prototype method is stored once and shared.

```js
function Order(id, total) {
  this.id = id;
  this.total = total;
}

Order.prototype.isLargeOrder = function () {
  return this.total >= 100;
};

const firstOrder = new Order("ORD-101", 125);
const secondOrder = new Order("ORD-102", 45);

console.log(firstOrder.isLargeOrder()); // true
console.log(secondOrder.isLargeOrder()); // false
console.log(firstOrder.isLargeOrder === secondOrder.isLargeOrder); // true
```

This reduces duplicated function objects while preserving separate `id` and `total` values per order. It is most useful for frequently created objects with stable shared behavior.

### 3. Dynamic Method Assignment

Because prototypes are objects, adding a method later makes it available to existing and future instances.

```js
function SupportTicket(id, priority) {
  this.id = id;
  this.priority = priority;
}

const existingTicket = new SupportTicket("T-1", "high");

SupportTicket.prototype.getResponseTarget = function () {
  return this.priority === "high" ? "Respond within 1 hour" : "Respond within 1 business day";
};

const newTicket = new SupportTicket("T-2", "normal");

console.log(existingTicket.getResponseTarget()); // "Respond within 1 hour"
console.log(newTicket.getResponseTarget()); // "Respond within 1 business day"
```

This can be useful for plugin systems or feature modules loaded after objects already exist. Use it carefully: changing a shared prototype changes behavior for all instances, which can make code harder to trace.
