// Invoking a Function as a Function
// 'use strict';

console.log('this(before):', this)

const hello = function (thing) {
  console.log('this(in hello):', this)
  console.log('Hello ' + thing)
}

// this:
hello('World!')

// This function does not belong to any object.
// Therefore it belongs to the default global object.

// Uncomment `use strict` to see the difference
