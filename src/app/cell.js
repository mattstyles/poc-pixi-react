
import { Text, TextStyle, Point } from 'pixi.js'
import { events } from './event'
import { config } from './config'

const style = new TextStyle({
  fontFamily: 'Source Code Pro',
  fontSize: 12,
  fill: 'white',
  align: 'center'
})

// export const cellConfig = {
//   width: 16,
//   height: 16,
//   fillRate: 7
// }

events.on('updateCell', event => {
  config[event.key] = event.value
})

const colorMap = []
const range = (a, b, value) => {
  while (--b >= a) {
    colorMap[b] = value
  }
}
range(0, 2, '#2B6CB0')
range(2, 5, '#3182CE')
range(5, 9, '#4299E1')
range(9, 12, '#63B3ED')
range(12, 15, '#90CDF4')
range(15, 17, '#BEE3F8')
range(17, 19, '#EBF8FF')
const tail = colorMap[colorMap.length - 1]
const getColor = value => {
  if (value >= colorMap.length) {
    return tail
  }

  return colorMap[value]
}

export class Cell {
  amount = 0
  isBlock = false
  isFilling = false
  size = new Point(config.cellWidth, config.cellHeight)

  constructor (value) {
    this.sprite = new Text(this.amount, { ...style })
    this.sprite.anchor.set(0.5)
    this.sprite.interactive = true
    this.sprite.on('mouseover', this.onHoverStart)
    this.sprite.on('mouseout', this.onHoverEnd)
    this.setAmount(value)
  }

  setAmount (value) {
    if (this.isBlock) {
      return
    }

    this.amount = value
    this.sprite.text = value

    this.sprite.style.fill = getColor(this.amount)
  }

  setBlock (flag) {
    this.isBlock = flag

    if (this.isBlock) {
      this.sprite.style.fill = 'white'
      this.sprite.text = '#'
    } else {
      this.setAmount(0)
    }
  }

  onHoverStart = () => {
    this.isFilling = true
  }

  onHoverEnd = () => {
    this.isFilling = false
  }

  update () {
    if (this.isBlock) {
      return
    }

    if (this.isFilling) {
      this.setAmount(this.amount + config.fillRate)
    }
  }
}
