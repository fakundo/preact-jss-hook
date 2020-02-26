/** @jsx h */
import { h } from 'preact'
import { createUseStyles } from '../src'

const useStyles = createUseStyles({
  root: {
    color: 'olive',
  },
})

export default function WithoutThemeComponent() {
  const { classes } = useStyles()
  return (
    <div className={classes.root}>
      WithoutThemeComponent
    </div>
  )
}
