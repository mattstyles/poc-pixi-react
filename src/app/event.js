
const EventEmitter = require('eventemitter3')

export const events = new EventEmitter()

window.events = events
