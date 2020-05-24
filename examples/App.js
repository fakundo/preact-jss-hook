/** @jsx h */
import { create as createJss } from 'jss'
import preset from 'jss-preset-default'
import { h, Fragment } from 'preact'
import { useState, useCallback } from 'preact/hooks'
import { JssProvider } from '../src'
import DecoratedClassComponent from './DecoratedClassComponent'
import DecoratedFunctionalComponent from './DecoratedFunctionalComponent'
import HookedComponent from './HookedComponent'
import WithoutThemeComponent from './WithoutThemeComponent'
import Button from './Button'
import NestedTest from './NestedTest'

const jss = createJss().setup(preset())

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
  const toggleVisibility = useCallback(() => setVisibility((oldVisible) => !oldVisible))
  return (
    <Fragment>
      <WithoutThemeComponent />
      <JssProvider theme={theme}>
        <DecoratedFunctionalComponent />
        <hr />
        <button onClick={toggleVisibility} type="button">toggle visibility</button>

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
      </JssProvider>

      <hr />

      <JssProvider theme={theme} jss={jss}>
        <Button>theme 1</Button>
      </JssProvider>

      {!!visible && (
        <JssProvider theme={theme2} jss={jss}>
          <Button>theme 2</Button>
        </JssProvider>
      )}

      <hr />
      <JssProvider jss={jss}>
        <NestedTest />
      </JssProvider>

      <hr />
      <NestedTest />
    </Fragment>
  )
}
