/** @jsx h */
import jss from 'jss'
import preset from 'jss-preset-default'
import { h, Fragment } from 'preact'
import { useState, useCallback } from 'preact/hooks'
import { ThemeProvider } from '../src'
import DecoratedClassComponent from './DecoratedClassComponent'
import DecoratedFunctionalComponent from './DecoratedFunctionalComponent'
import HookedComponent from './HookedComponent'
import Button from './Button'

jss.setup(preset())

const theme = {
  primaryColor: 'green',
  secondaryColor: 'blue',
  errorColor: 'red',
}

const theme2 = {
  primaryColor: 'purple',
  secondaryColor: 'blue',
  errorColor: 'red',
}

export default () => {
  const [visible, setVisibility] = useState(false)
  const toggleHidden = useCallback(() => setVisibility((oldVisible) => !oldVisible))
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <DecoratedFunctionalComponent />
        <hr />
        <button onClick={toggleHidden} type="button">toggle visibility</button>

        { !!visible && (
          <Fragment>
            <hr />
            <DecoratedClassComponent />
            <DecoratedFunctionalComponent />
            <HookedComponent />
          </Fragment>
        ) }

        <hr />

        <div>
          { !!visible && (
            <Button>button1</Button>
          ) }
          { !visible && (
            <Button>button2</Button>
          ) }
        </div>
      </ThemeProvider>

      <hr />

      <ThemeProvider theme={theme}>
        <Button>theme 1</Button>
      </ThemeProvider>

      {!!visible && (
        <ThemeProvider theme={theme2}>
          <Button>theme 2</Button>
        </ThemeProvider>
      )}
    </Fragment>
  )
}
