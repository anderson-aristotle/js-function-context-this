[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# JavaScript: Context \& `this`

## Objectives

By the end of this lesson, students should be able to:

-   Recall whether or not `this` is determined at declaration.
-   Explain what `this` points to in each calling context.
-   Read and follow the execution context of code that uses different `this`
idioms.

## Preparation

1.  [Fork and clone](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
this repository.
1.  `npm install`

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

## Block Scope
Scope refers to where variables and functions are accessible.

Example 1:
```js
let a = 1

if (true) {
  a = 2
  console.log(a) // What logs?
}
console.log(a) // What logs?
```

Example 2:
```js
let a = 1

if (true) {
  let a = 2
  console.log(a) // What logs?
}
console.log(a) // What logs?
```

Example 3:
```js
const reAssign = function () {
  a = b
  console.log( a )
}

let a = 1
let b = 2

reAssign() // What logs?
console.log(a) // What logs?
```

Example 4:
```js
const reAssign = function (a, b) {
  a = b
  console.log( a )
}

let a = 1
let b = 2

reAssign() // What logs?
console.log(a) // What logs?
```

Example 5:
```js
const reAssign = function (a, b) {
  a = b
  console.log( a )
}

let a = 1
let b = 2

reAssign(a, b) // What logs?
console.log(a) // What logs?
```

Scope can be helpful in understanding call context.

```js
const reAssign = function (a, b) {
  a = b
  console.log( a )
}

reAssign(2, 3) // what logs
reAssign(10, 11) // what logs
reAssign(10, 11) // what logs
```

The value of our parameters `a` and `b` depend on when the function is called,
we can not define what `a` or `b` are until the function has been called.

## `this` Changes by Call Context

A function can indiscriminately operate upon *any* object. When a function is
invoked, it is *bound* to an object on which it operates. The *contextual*
object on which a function operates is referenced using the keyword `this`.

```js
let xwing = {
    pilot: null,

    setPilot: function(pilot) {
        this.pilot = pilot
        this.update()
    },

    update: function() {
        console.log('This X-Wing has changed!')
    }
}

xwing.setPilot('Luke Skywalker')
// >> "This X-Wing has changed!"

console.log(xwing.pilot)
// >> "Luke Skywalker"
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

## Demo

Let's take a look at the `global_function.js` file to see an example of this pattern. We are going to use `index.html` to execute this code.

### Method Invocation Pattern

When a function is defined on an object, it is said to be a *method* of the
object. When a method is invoked through its host object, the method is bound
to its host:

```js
let deathstar = {
    goBoom: function() {
      console.log('this is ', this)
  }
}

deathstar.goBoom()
// this === deathstar
```

**Context**: `this` refers to the host object.


## Code Along

Together, let's take a look at `object_literal.js` and try to determine what's happening in there.

### Call/Apply Invocation Pattern

Function objects have their own set of native methods, most notably are
[`.call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
and [`.apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
These methods will invoke the function with a provided
contextual object.
While the syntax of these functions are almost identical,
the fundamental difference is that `call()` accepts an argument list,
while `apply()` accepts a single array of arguments.

```js
const personOne = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: function() {
        return this.firstName + ' ' + this.lastName
    }
}

const personTwo = {
    firstName: 'Mary',
    lastName: 'Smith'
}

personOne.fullName.call(personTwo) // What will this return?
// this === personTwo
```

**Context**: `this` refers to the passed object.  Here you would say
"Call the method fullName with myObject as the context (this)".

### Constructor Invocation Pattern

Any function may act as a constructor for new object instances. New object
instances may be constructed with the `new` keyword while invoking a
function.

Constructors are very similar to Ruby class constructors, in that they
represent proper nouns within our application. Therefore they should follow
the convention of capitalized names:

```js
const Planet = function (color, name) {
    console.log('this is ', this)
    this.name = name
    this.color = color
    this.whatIsThis = function () {
        console.log('Inside whatIsThis, this is ', this)
  }
  console.log('this is ', this)
}

const mercury = new Planet('Mercury', 'slightly brownish')
const pluto = new Planet('Pluto', 'blue')
// this === shiny new Planet instance
```

**Context**: `this` refers to the newly-created object instance.  Here we
would say "the object receives the method".

How this breaks down:

1.  Creates a new empty object ({}) `// {}`
1.  Attaches the constructor to the object as a property
`// {}.constructor = Deathstar`
1.  Invokes the constructor function on the new object
`// {}.constructor('???')`
1.  Returns the object `// {}`

## Lab
On your own, see if you can predict the results of running `invoking_a_function_as_a_function.js`, `invoking_a_function_as_a_method.js`, `invoking_a_function_with_a_function_constructor.js`, and `invoking_a_function_with_a_function_method.js` before running them using the `index.html` file as we did earlier.

## Binding

Consider the following code:

```javascript
//            <button>Get Random Person</button>​
​//        <input type="text">​
​
​
let user = {
  data: [
          { name: 'T. Woods', handicap:2 },
          { name: 'P. Mickelson', handicap:1 },
          { name: 'C. Austin', handicap:0 }
        ],
  clickHandler: function(event){
    let randomNum = ((Math.random() * 2 | 0) + 1) - 1 // random number between 0 and 1​
    // This line is adding a random person from the data array to the text field​
    $('input').val(this.data[randomNum].name + ' ' + this.data[randomNum].handicap)
  }
}
​
​// Assign an eventHandler to the button's click event​
$('button').on('click', user.clickHandler)
```

What is happening and will this work?

With the `.bind()` method we can bind the context of user.clickHandler to the
user object like so:

```javascript
$('button').on('click', user.clickHandler.bind(user))
```

## Summary

1.  Is the function called with `new` (**new binding**)? If so, `this` is the
newly constructed object.      `let bar = new Foo()`
1.  Is the function called with `call` or `apply` (**explicit binding**), even
hidden inside a `bind` *hard binding*? If so, `this` is the explicitly
specified object.
     `let bar = foo.call( obj2 )`
1.  Is the function called with a context (**implicit binding**), otherwise
known as an owning or containing object? If so, `this` is *that* context
object.
     `obj1.foo() // this === obj1`
     `obj1.foo.call( obj2 ) // this === obj2`
1.  Otherwise, default the `this` (**default binding**). If in `strict mode`,
pick `undefined`, otherwise pick the `global` object.
     `let bar = foo()`

 Source: [You-Dont-Know-JS/ch2.md](https://github.com/getify/You-Dont-Know-JS/blob/58dbf4f867be0d9c51dfc341765e4e4211608aa1/this%20&%20object%20prototypes/ch2.md)

## Lab (Pair)

Pair with a partner and follow the instructions in [`index.html`](index.html) for the remaining files that we have not already looked at.
Your goal in this assignment is to gain experience using the debugger tool in order to further your understanding of what is happening in the code. Take time to contemplate the execution flow, and note any questions
you have for discussion.

Many of these scripts use the special `debugger` keyword to stop JS execution
and open your console. Use this opportunity to inspect your environment (perhaps
by looking at `this`?) and then
[continue](https://developer.chrome.com/devtools/docs/javascript-debugging).

When you're ready to begin, run `grunt serve` and navigate to (http://localhost:7165/)

## Additional Resources

-   [Functions - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
-   [Everything you wanted to know about JavaScript scope](http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)
-   [Understand JavaScript’s “this” With Clarity, and Master It | JavaScript is Sexy](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/)
-   [You-Dont-Know-JS/README.md at master · getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)
-   [this - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
-   [Fat Arrow - Strongloop](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-arrow-functions/)

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
