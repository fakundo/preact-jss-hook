/** @jsx h */
import { h } from 'preact'
import { useState } from 'preact/hooks'
import { createUseStyles } from '../src'

const useStyles = createUseStyles({
  nestedChild: {
    padding: [0, 50],
    display: 'inline-block',
    transition: 'all 2000ms',
  },
}, { purgeUnused: false })

function NestedChild({ onClick }) {
  const { classes } = useStyles()
  return (
    <button
      type="button"
      onClick={onClick}
      className={classes.nestedChild}
    >
      Hide nested child
    </button>
  )
}

export default function NestedTest() {
  const [childComp, setChildComp] = useState(null)

  const handleNestedChildClick = () => {
    setChildComp(null)
  }

  const handleClick = () => {
    setChildComp(<NestedChild onClick={handleNestedChildClick} />)
  }

  return childComp || (
    <button
      type="button"
      onClick={handleClick}
    >
      Show nested child
    </button>
  )
}
