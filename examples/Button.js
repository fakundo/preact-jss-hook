/** @jsx h */
import { h } from 'preact'
import { createUseStyles } from '../src'

const useStyles = createUseStyles((theme) => ({
  root: {
    background: theme.primaryColor,
    border: '3px solid red',
    outline: 0,
    transition: 'all 1000ms',
    '&:hover': {
      background: 'red',
      borderColor: theme.primaryColor,
    },
  },
}))

export default function Button({ children }) {
  const { classes } = useStyles()
  return (
    <button type="button" className={classes.root}>
      { children }
    </button>
  )
}
