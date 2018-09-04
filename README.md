[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# JavaScript: `this`

The keyword `this` in JavaScript can be a major point of a confusion and a
source of tricky bugs. Let's dig into what it references in different contexts.

## Prerequisites

- [js-reference-types](https://git.generalassemb.ly/ga-wdi-boston/js-reference-types)
- [js-functions](https://git.generalassemb.ly/ga-wdi-boston/js-functions)
- [js-objects-this](https://git.generalassemb.ly/ga-wdi-boston/js-objects-this)

## Objectives

By the end of this, developers should be able to:

- Explain the difference between a value being determined at declaration versus runtime.
- Read and follow the execution of code that uses `this` in different calling contexts.
- Use `apply`, `call`, and `bind` to explicitly set the value of `this`.

## Preparation

1. Fork and clone this repository.
 [FAQ](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
1. Create a new branch, `training`, for your work.
1. Checkout to the `training` branch.
1. Install dependencies with `npm install`.

## `this` Is A Reference

> We use this similar to the way we use pronouns in natural languages like
> English and French. We write: “John is running fast because he is trying to
> catch the train.” Note the use of the pronoun “he.” We could have written this:
> “John is running fast because John is trying to catch the train.” We don’t
> reuse “John” in this manner, for if we do, our family, friends, and colleagues
> would abandon us. Yes, they would. In a similar aesthetic manner, we use the
> this keyword as a shortcut, a referent to refer to an object.
> Source: [Understanding Javascript 'this' pointer.](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/)

## `this` in the Global Scope Depends on the Environment

### In browsers

- The top-level scope is the global scope.
- In the top-level scope in browsers `this` is equivalent to `window`.

### In Node.js

- The top-level scope is not the global scope.
- Node does have a global variable named `global` and is documented [here](https://nodejs.org/api/globals.html#globals_global).

**GOTCHA** Global variables, methods, or functions can easily create name
conflicts and bugs in the global object.

## Demo: `this` Changes by Call Context

A function can indiscriminately operate upon any object. When a function is
invoked, it is bound to an object on which it operates. The contextual object
on which a function operates is referenced using the keyword this.

Watch as I run the following example in Node. What will each instance of `this`
refer to at runtime?

```js
let rocket = {
    destination: null,

    setDestination: function(planet) {
        this.destination = planet
        this.blastOff()
    },

    blastOff: function() {
        console.log(`VRROOOMM!! Off to ${this.destination}!`)
    }
}

rocket.setDestination("Mars") // What will this log?
```

## The Four Patterns of Invocation

We must *invoke* a function to run it (ie: call upon the function to do its
thing). Amazingly, there are FOUR ways to invoke a function in JavaScript. This
makes JS both amazingly flexible and absolutely insane.

### Function Invocation Pattern

When a function is invoked without explicit context, the function is bound to
global scope:

```js
const goBoom = function() {
    console.log('this is ', this)
}

goBoom() // what logs in the browser vs in node?
```

Following best practices, we can add `use strict` to get consistent results

```js
'use strict'

const goBoom = function() {
    console.log('this is ', this)
}

goBoom() // what logs in the browser vs in node?
```

**Context**: `this` refers to the `window` object (global scope).  Here we
would say "a method is called on an object".  In this case the object is the
`window`.

**Gotcha**: This behavior has changed in ECMAScript 5 only when using strict
mode: `'use strict'`

#### Lab: `this` in global functions

Take a look at `lib/global-function.js`, then run it. Next, paste that function
into the Node REPL and invoke it. Is the output the same? Why or why not?

### Method Invocation Pattern

When a function is defined on an object, it is said to be a *method* of the
object. When a method is invoked through its host object, the method is bound
to its host:

```js
let alien = {
    contact: function () {
      console.log('We are:', this)
      console.log('We come in peace.')
  }
}

alien.contact()
// this === alien
```

**Context**: `this` refers to the host object.

#### Lab: method chaining

Let's take advantage of this invocation pattern to implement methods that can
be chained on the object that they're called on. Open up `lib/method-chain.js`
and change the `satellite` object so that the method invocation at the bottom
of the file logs the message three times.

### Constructor Invocation Pattern

Remember constructor functions from unit 1? Any function may act as a
constructor for new object instances. New object instances may be constructed
with the `new` keyword while invoking a function.

Constructors are very similar to Ruby class constructors, in that they
represent proper nouns within our application. Therefore they should follow
the convention of capitalized names.

```js
const Planet = function (color, name) {
    console.log('this is ', this)
    this.name = name
    this.color = color
}

const mercury = new Planet('Mercury', 'slightly brownish')
const pluto = new Planet('Pluto', 'blue')
// this === shiny new Planet instance
```

**Context**: `this` refers to the newly-created object instance.  Here we
would say "the object receives the method".

How this breaks down:

1. Creates a new empty object `// {}`
1. Attaches the constructor to the object as a property `// {}.constructor = Planet`
1. Invokes the constructor function on the new object `// {}.constructor('???')`
1. Returns the object `// {}`

### Call/Apply Invocation Pattern

Function objects have their own set of native methods, most notably are
[`.call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
and [`.apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
These methods will invoke the function with a provided
contextual object.
While the syntax of these functions are almost identical,
the fundamental difference is that `call()` accepts an argument list,
while `apply()` accepts a single array of arguments.
You won't need to use these methods often, but it's good to know they exist.

#### Demo: Using `.call`

Take a look at `lib/call.js`. What do you think will happen when we run it?

**Context**: `this` refers to the passed object.  Here you would say
"Call the method `fullName` with `personTwo` as the context (this)".

## Fat arrow functions and `this`

ES6 arrow functions behave differently with regards to `this`. Specifically,
`this` inside a fat arrow function will refer to whatever `this` would be
_outside_ of the arrow function's scope. In other words, arrow functions don't
have "their own" `this`.

```js
'use strict'

const blackHole = {
  escaped: 'Whew! Our heroes escaped the black hole.',
  tryToEscape: () => {
    console.log(this.escaped)
  }
}

blackHole.tryToEscape()
// undefined, because `this` in global functions is undefined in strict mode
```

## Lab: binding `this`

JavaScript also provides a method called `.bind`, which lets us create a new
function that is identical to an existing function, except that `this` will be
permanently set to whatever we want! Read up a bit on `.bind` [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind),
then open `lib/bind.js` and use `.bind` to save these poor astronauts from the
black hole they've found their way into.

## `this` cheatsheet

How to determine what `this` refers to:

1. In a function invoked with `new`, `this` will be the constructed
  object.
1. In a function invoked with `.call` or `.apply`, `this` will be the
  first argument passed to call or apply.
1. In a function created with `.bind`, `this` will be the first argument passed
  to `.bind`.
1. In a (non-fat arrow) function declared as a method on an object, `this` will
  be the object on which the method is declared.
1. If none of the above apply, `this` will be either the global object, or
  `undefined` depending on whether `'use strict'` is enabled.

## Additional Resources

- [Functions - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
- [JavaScript Basics - Execution Context](https://medium.com/dailyjs/javascript-basics-the-execution-context-and-the-lexical-environment-3505d4fe1be2)
- [Everything you wanted to know about JavaScript scope](http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)
- [Understand JavaScript’s “this” With Clarity, and Master It | JavaScript is Sexy](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/)
- [You-Dont-Know-JS/README.md at master · getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)
- [this - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [Fat Arrow - Strongloop](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-arrow-functions/)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
