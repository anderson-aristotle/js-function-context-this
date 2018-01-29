'use strict'

const printThis = function () {
  console.log('In a method in the global scope, this is:', this)
}

printThis()
