const personOne = {
  firstName: 'John',
  lastName: 'Doe',
  fullName: function () {
    console.log(this.firstName + ' ' + this.lastName)
  }
}

const personTwo = {
  firstName: 'Mary',
  lastName: 'Smith'
}

personOne.fullName.call(personTwo) // What will this print?
