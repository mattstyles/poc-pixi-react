
import { Application } from 'pixi.js'

import { config } from './config'

export const app = new Application({
  width: config.mapWidth * config.cellWidth,
  height: config.mapHeight * config.cellHeight,
  resolution: window.devicePixelRatio,
  autoResize: true
})

export const stage = app.stage
