/** @jsx h */
import { h } from 'preact'
import { createUseStyles } from '../src'

const useStyles = createUseStyles((theme) => ({
  root: {
    color: theme.errorColor,
  },
}))

export default function HookedComponent() {
  const { classes } = useStyles()
  return (
    <div className={classes.root}>
      HookedComponent
    </div>
  )
}
