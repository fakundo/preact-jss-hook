/** @jsx h */
import { h } from 'preact'
import { createWithStyles } from '../src'

const withStyles = createWithStyles((theme) => ({
  decoratedFuncComp: {
    color: theme.secondaryColor,
  },
}))

function DecoratedFunctionalComponent({ classes }) {
  return (
    <div className={classes.decoratedFuncComp}>
      DecoratedFunctionalComponent
    </div>
  )
}

export default withStyles()(DecoratedFunctionalComponent)
