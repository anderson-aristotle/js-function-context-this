const satellite = {
  orbits: 0,
  orbit: function () {
    this.orbits++
    console.log(`Bleep bloop... I have orbited the earth ${this.orbits} times.`)
  }
}

satellite.orbit().orbit().orbit() // Make this work!
