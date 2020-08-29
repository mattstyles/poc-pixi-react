
import React, { useState } from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle, Button, Input, Label, Box, Spacer, Flex, Center } from '@raid/basic-kit'

import { App } from './app'
import { events } from './app/event'
import { config } from './app/config'

const root = document.querySelector('.js-root')

const str = s => `hello ${s}`

const FillRate = () => {
  const [fillRate, setFillRate] = useState(config.fillRate)

  function onChange (value) {
    setFillRate(value)
    events.emit('updateCell', {
      key: 'fillRate',
      value: Number(value)
    })
  }

  return (
    <Box bg='background.75' px={2} py={1}>
      <Label htmlFor='fillrate'>Fill Rate</Label>
      <Spacer py={0} />
      <Input
        id='fillrate'
        onChange={onChange}
        value={fillRate}
        submitOnEnter
      />
    </Box>
  )
}

const Root = ({ children }) => {
  const [value, setValue] = useState(0)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Center>
        <Flex row>
          <App message={value} />
          <Spacer px={2} />
          <Box>
            <div>{str(value)}</div>
            <Button onClick={() => setValue(v => ++v)}>Click me</Button>
            <FillRate />
          </Box>
        </Flex>
      </Center>
    </ThemeProvider>
  )
}

render(
  <Root />,
  root
)
