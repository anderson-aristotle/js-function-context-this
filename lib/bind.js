'use strict'

const blackHole = {
  escaped: 'Whew! Our heroes escaped the black hole.',
  tryToEscape: () => {
    console.log(this)
    console.log(this.escaped)
  }
}

const escapeWithWarpDrive = function () {
  console.log(this.escaped)
}

// don't change anything above this line

// use `.bind` somewhere above this line to save our intrepid astronauts

escapeWithWarpDrive()
