
import { Container } from 'pixi.js'
import { Cell } from './cell'

const width = 50
const height = 50
const evaporation = 0.12
const viscosity = 0.15

const matrix = Array(height).fill(null).map(_ => Array(width).fill(null).map(_ => {
  return new Cell(0)
}))

const matrixIterate = (m, fn) => {
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      const cell = m[y][x]
      fn(cell, x, y)
    }
  }
}

/**
 * Dummy set a load of cells as blockers
 */
const percentage = 0.5
for (let i = 0; i < (width * height * percentage); i++) {
  const x = Math.floor(Math.random() * width)
  const y = Math.floor(Math.random() * height)
  const cell = matrix[y][x]
  // cell.setAmount(cell.amount + 48)
  cell.setBlock(true)
}

/**
 *
 */

export const init = (stage) => {
  const container = new Container()
  stage.addChild(container)
  matrixIterate(matrix, (cell, x, y) => {
    container.addChild(cell.sprite)
    cell.sprite.position.set(
      (cell.size.x * x) + (cell.size.x / 2),
      (cell.size.y * y) + (cell.size.y / 2)
    )
  })
}

export const getFlowAmount = (current, target) => {
  if (current.amount < 1 || current.amount <= target.amount) {
    return 0
  }

  if (current.amount - target.amount < 5) {
    return 1
  }

  return Math.floor((current.amount - target.amount) / 2)
}

const flow = (current, targets) => {
  for (let index = 0; index < targets.length; index++) {
    const target = targets[index]
    const flow = getFlowAmount(current, target)

    current.setAmount(current.amount - flow)

    if (current.setAmount <= 0) {
      break
    }
    target.setAmount(target.amount + flow)
  }
}

// @TODO not the most efficient as it creates and pushes to a new array
// for every cell on every tick
const getTarget = (x, y, m) => {
  const targets = []
  if (x > 0) {
    if (!m[y][x - 1].isBlock) {
      targets.push(m[y][x - 1])
    }
  }
  if (x < m[0].length - 1) {
    if (!m[y][x + 1].isBlock) {
      targets.push(m[y][x + 1])
    }
  }
  if (y > 0) {
    if (!m[y - 1][x].isBlock) {
      targets.push(m[y - 1][x])
    }
  }
  if (y < m.length - 1) {
    if (!m[y + 1][x].isBlock) {
      targets.push(m[y + 1][x])
    }
  }

  return targets
}

export const update = () => {
  matrixIterate(matrix, (cell, x, y) => {
    cell.update()

    if (cell.amount <= 0) {
      return
    }

    if (Math.random() < evaporation) {
      cell.setAmount(cell.amount - 1)
    }

    if (Math.random() < viscosity) {
      return
    }

    try {
      const targets = getTarget(x, y, matrix)
      if (x === 0 && y === 0) {
        console.log(targets)
      }
      // If surrounded by walls then there could be no viable target
      if (targets) {
        flow(cell, targets)
      }
    } catch (err) {
      console.log('error on', x, y)
    }
  })
}
