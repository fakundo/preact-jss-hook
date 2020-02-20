/** @jsx h */
import { h } from 'preact'
import { createWithStyles } from '../src'

const withStyles = createWithStyles((theme) => ({
  root: {
    color: theme.secondaryColor,
  },
}))

function DecoratedFunctionalComponent({ classes }) {
  return (
    <div className={classes.root}>
      DecoratedFunctionalComponent
    </div>
  )
}

export default withStyles()(DecoratedFunctionalComponent)
