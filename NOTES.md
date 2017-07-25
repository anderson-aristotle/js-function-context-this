-Show `this.alert()` example for window scope in browser

- In Node, defining a variable in "global" scope wil actually be local to that module. The global object contains stuff like `require`, etc.

- For block scope examples, feel free to show that we don'y have to prepend with `if(true)`. Also, ask before running the code.

### Block scope examples
- 1st Example: We are changing the global variable to `a` : 2,2


- 2nd Example: We are defining a new variable called `a` : 2,1


- 3rd Example: We are reassigning a global variable : 2,2


- 4th Example: We are defining a function that takes two parameters, but not passing anything to it : `undefined`, 1


- 5th Example: We are defining a function that takes two parameters, but this time we are actually passing arguments : 2,1

### Code annotations for README code
#### Changes by call context
```js
var xwing = {
    //set pilot to null
    pilot: null,
    //an anonymous funtion
    setPilot: function(pilot) {
        //this.pilot refers to the key pilot in the xwing object
        //this points to an object, but we don't know which one yet
        //pilot (on the right) is a reference to the first argument that is being passed to (anonymous) function that is //assigned to the setPilot property
        this.pilot = pilot
        //call update on this object
        this.update()
    },
    //update is a method that takes no arguments. It prints something to the console.
    update: function() {
        console.log('This X-Wing has changed!')
    }
}
```

* When I call setPilot on xwing, JavaScript looks at the xwing object to find the setPilot keyword.
* The CALLING CONTEXT of this line of code is xwing.
* We get a reference to a function back, then we invoke it, because it is followed by parens. with the params in the parentheses.
* WHEN THE FUNCTION IS CALLED, 'this' now points to xwing before assignment, pilot is null, after the function call, it is set to "Luke Skywalker" then the update method is called from within the setPilot function.
* `this` is bound to xwing, so `this#update` looks in the xwing object for an the update keyword.
* It finds a function and executes it using the variables in the parens (none in this case).
xwing.setPilot("Luke Skywalker");
"This X-Wing has changed!"

```js
console.log(xwing.pilot)
// >> "Luke Skywalker"
```

Because xwing is the calling context, javascript looks for setPilot on xwing. It finds it, and executes it, because there are perentheses.

### global_function Demo:
We are introducing method invocation pattern here, which kind of seems weird because we don't formally go over it until the next section. However, I think the idea is to show that the enclosing block matters.

### object_literal Code Along:
*Have them paste the correct js file into `index.html`*

Yep, it's pointing to the person object literal.

Why? Because the runtime Context of this function is
the person object literal.

Why? Because we invoked this function/method at RUNTIME like this 'person.fullName' below.

The Context is the object literal 'person'
The 'this' pointer in the fullName method is the object literal we defined above, 'person'.

### Call/Apply Invocation Pattern
`.apply` example:

```js
const person = {
  name: 'Ben'
}

const job = {
  name: 'developer'
}

const newObj = {}

function sayName(obj1, obj2){
  console.log('this is: ', this)
  console.log(obj1.name, obj2.name)
}

sayName.apply(null, [person, job])
```
The first argument sets the value of `this` when the function is executed. The second is an array of parameters for that function.
