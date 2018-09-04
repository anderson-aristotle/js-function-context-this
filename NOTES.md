# Delivery Notes

- Show `this.alert()` example for window scope in browser

- In Node, defining a variable in "global" scope wil actually be local to that module. The global object contains stuff like `require`, etc.

## Code annotations for README code

### Changes by call context

```js
// rocket becomes the containing object for the methods
let rocket = {
    destination: null,

    // setDestination is a method on rocket
    setDestination: function(planet) {
        // when invoked through rocket.setDestination
        // `this` points to the rocket object
        this.destination = planet
        this.blastOff()
    },

    blastOff: function() {
        console.log(`VRROOOMM!! Off to ${this.destination}!`)
    }
}

// invoking the method through rocket. sets rocket as
// `this` in the scope of the method
rocket.setDestination("Mars") // What will this log?
```

## Call/Apply Invocation Pattern

`.apply` example:

```js
const personOne = {
    firstName: 'John',
    lastName: 'Doe',
    // defining fullNameIntro method on the personOne object
    // when invoked through personOne.fullNameIntro `this` is set to personOne
    fullNameIntro: function(greeting, message) {
        return greeting + " " + this.firstName + " " + this.lastName + " " +message;
    }
}

const personTwo = {
    firstName:'Mary',
    lastName: 'Smith',
}

// passing peronTwo as the first argument to `call` sets personTwo as `this`
// in the method that we are invoking: fullNameIntro
personOne.fullNameIntro.call(personTwo, 'Hello', 'how are you?');
// returns 'Hello Mary Smith how are you'

// behaves similar to the call example above, but accepts an array of arguments
// to pass to the method
personOne.fullNameIntro.apply(personTwo, ['Hello', 'how are you?']);
// also returns 'Hello Mary Smith how are you'
```

The first argument sets the value of `this` when the function is executed. The second is an array of parameters for that function.

## Why `this` is undefined in global functions

[Taken from this stack overflow](https://stackoverflow.com/questions/9822561/why-is-this-in-an-anonymous-function-undefined-when-using-strict)

> It's because, until ECMAscript 262 edition 5, there was a big confusion if people who where using the constructor pattern, forgot to use the new keyword. If you forgot to use new when calling a constructor function in ES3, this referenced the global object (window in a browser) and you would clobber the global object with variables.

> That was terrible behavior and so people at ECMA decided, just to set this to undefined.

> Example:

```js
function myConstructor() {
    this.a = 'foo';
    this.b = 'bar';
}

myInstance = new myConstructor() // all cool, all fine. a and b were created in a new local object
myBadInstance = myConstructor() // oh my gosh, we just created a, and b on the window object
```
