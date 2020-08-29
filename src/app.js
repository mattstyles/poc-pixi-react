
import React, { useRef, useEffect } from 'react'
import { Center } from '@raid/basic-kit'

import { app, stage } from './app/application'
import { init, update } from './app/simulation'

const fps = 16

const run = (fn, fps) => {
  const start = () => {
    fn()
    setTimeout(start, 1000 / fps)
  }
  return start
}

export const App = ({ message }) => {
  const container = useRef(null)

  // Props can be used to directly pass mutations to objects here
  // text.text = message

  useEffect(() => {
    container.current.appendChild(app.view)
    init(stage)
    run(update, fps)()
    // render()
  }, [])

  return (
    <Center ref={container} />
  )
}
