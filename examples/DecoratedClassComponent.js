/** @jsx h */
import { h, Component } from 'preact'
import { createWithStyles } from '../src'

const withStyles = createWithStyles((theme) => ({
  root: {
    color: theme.primaryColor,
  },
}))

@withStyles()
export default class DecoratedClassComponent extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        DecoratedClassComponent
      </div>
    )
  }
}
