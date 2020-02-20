/** @jsx h */
import { h } from 'preact'
import { createUseStyles } from '../src'

const useStyles = createUseStyles({
  root: {
    background: 'green',
    border: '3px solid red',
    outline: 0,
    transition: 'all 1000ms',
    '&:hover': {
      background: 'red',
      borderColor: 'green',
    },
  },
})

export default function Button({ children }) {
  const { classes } = useStyles()
  return (
    <button type="button" className={classes.root}>
      { children }
    </button>
  )
}
