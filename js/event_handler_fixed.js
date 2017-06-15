'use strict'

const user = {
  data: [
    {name: 'T. Woods', handicap: 4},
        {name: 'P. Mickelson', handicap: 1}
  ],
  clickHandler: function () {
    // random number between 0 and 1
    const randomNum = ((Math.random() * 2 | 0) + 1) - 1

    // Hey, what is the 'this' variable pointing to?
    debugger

    // Yaaa, the this pointer is pointing to the user
    // object literal we created above.

    // Why?
    // Because we changed the runtime Context that
    // this function is running in using the 'bind' function
    // below.

    // Does this have a data property?
    // Yes, because this points to the user object literal
    // which has a data property.
    const randomName = this.data[randomNum].name
    const randomHandicap = this.data[randomNum].handicap

    // This line is printing a random person's name and handicap from
    // the data array.
    console.log(randomName + ' ' + randomHandicap)
  }
}

// Here we are using the javascript 'bind' function to
// change the "Context" that clickHandler function will
// be invoked in WHEN IT IS INVOKED/EXECUTED/RAN.
// And the 'this' variable always points to the runtime
// Context of function!
document.querySelector('button').onclick = user.clickHandler.bind(user)
