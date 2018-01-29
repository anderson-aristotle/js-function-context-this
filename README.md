[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# JavaScript: `this`

The keyword `this` in JavaScript can be a major point of a confusion and a
source of tricky bugs. Let's dig into what it references in different contexts.

## Prerequisites

- [js-reference-types](https://git.generalassemb.ly/ga-wdi-boston/js-reference-types)
[js-functions-ins-and-outs](https://git.generalassemb.ly/ga-wdi-boston/js-functions-ins-and-outs)
[js-objects-this](https://git.generalassemb.ly/ga-wdi-boston/js-objects-this)

## Objectives

By the end of this, developers should be able to:

- Explain the difference between a value being determined at declaration versus runtime.
- Read and follow the execution of code that uses `this` in different calling contexts.
- Use `apply`, `call`, and `bind` to explicitly set the value of `this`.

## Preparation

1.  Fork and clone this repository.
 [FAQ](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
1.  Create a new branch, `training`, for your work.
1.  Checkout to the `training` branch.
1.  Install dependencies with `npm install`.

## `this` Is A Reference

> We use this similar to the way we use pronouns in natural languages like
>English and French. We write: “John is running fast because he is trying to
>catch the train.” Note the use of the pronoun “he.” We could have written this:
>“John is running fast because John is trying to catch the train.” We don’t
>reuse “John” in this manner, for if we do, our family, friends, and colleagues
>would abandon us. Yes, they would. In a similar aesthetic manner, we use the
>this keyword as a shortcut, a referent to refer to an object.
>
> Source: [Understanding Javascript 'this' pointer.](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/)

## `this` in the Global Scope Depends on the Environment
**In browsers**
- The top-level scope is the global scope.
- In the top-level scope in browsers `this` is equivalent to `window`.

**In Node.js**
- The top-level scope is not the global scope.
- Node does have a global variable named `global` and is documented [here](https://nodejs.org/api/globals.html#globals_global).

**GOTCHA** Global variables, methods, or functions can easily create name conflicts and bugs in the global object.

## Demo: `this` Changes by Call Context

A function can indiscriminately operate upon any object. When a function is invoked, it is bound to an object on which it operates. The contextual object on which a function operates is referenced using the keyword this.

Watch as I run the following example in Node. What will each instance of `this` refer to at runtime?

```js
let rocket = {
    destination: null,

    setDestination: function(planet) {
        this.destination = destination
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

When a function is invoked without explicit context, the function is bound to global
scope:

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

## Lab: `this` in global functions

Take a look at `lib/global-function.js`, then run it. Next, paste that function
into the Node REPL and invoke it. Is the output the same? Why or why not?

## Additional Resources

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
