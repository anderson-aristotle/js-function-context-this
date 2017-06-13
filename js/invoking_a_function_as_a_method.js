// Invoking a Function as a Method
'use strict'

// In JavaScript you can define function as object methods.
// The following example creates an object (elon_musk),
//   with two properties (firstName and lastName),
//   and a method (hello):

// The thing called this, is the object that "owns" the JavaScript code.
// In this case the value of this is `elon_musk`.

const elonMusk = {
  name: 'Elon Musk',
  hello: function (message) {
    console.log('this(in hello):', this)
    console.log(this.name + ' says, "Hello ' + message + '"')
  }
}

// this:
elonMusk.hello('SpaceX!')

// desugars to this:
// elon_musk.hello.call(elon_musk, "SpaceX!");
