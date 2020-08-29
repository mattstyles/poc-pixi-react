
import { getFlowAmount } from './simulation.js'

class Cell {
  constructor (value) {
    this.amount = value
  }
}

const isEqual = (a, b, msg) => {
  if (a === b) {
    console.log('isEqual', msg)
    return
  }

  throw new Error(`${msg}. ${a} is not equal to ${b}`)
}

isEqual(getFlowAmount(new Cell(2), new Cell(0)), 1, 'Low flow pressure')

console.log('Fin')
