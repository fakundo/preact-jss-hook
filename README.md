# preact-jss-hook

[![npm](https://img.shields.io/npm/v/preact-jss-hook.svg)](https://www.npmjs.com/package/preact-jss-hook)

JSS integration with Preact.

## Installation
  
```
npm i preact-jss-hook
```

## Usage

Basic example

```javascript
import { createUseStyles } from 'preact-jss-hook'

const useStyles = createUseStyles({
  root: {
    color: 'red'
  }
})

export default () => {
  const { classes } = useStyles()
  return (
    <div className={classes.root}>
      Red block
    </div>
  )
}
```

JSS provider

```javascript
import { JssProvider } from 'preact-jss-hook'
import { create } from 'jss'

const jss = create()

const theme = {
  primaryColor: 'red'
}

export default () => (
  <JssProvider 
    jss={jss} // optional
    theme={theme} // optional
  >
    Children
  </JssProvider>
)
```

Using theme

```javascript
import { createUseStyles } from 'preact-jss-hook'

const useStyles = createUseStyles((theme) => ({
  root: {
    color: theme.primaryColor
  }
}))

export default () => {
  const { classes, theme } = useStyles()
  return (
    <div className={classes.root}>
      Red block
    </div>
  )
}
```

Using HOC decorator

```javascript
import { createWithStyles } from 'preact-jss-hook'

const withStyles = createWithStyles((theme) => ({
  root: {
    color: theme.primaryColor
  }
}))

@withStyles({ withTheme: true })
export default class SuperComponent extends Component {
  render() {
    const { classes, theme } = this.props
    return (
      <div className={classes.root}>
        Red block
      </div>
    )
  }
}
```

## API

- `createUseStyles(styles, hookOptions)` - hook creator

- `useStyles(hookOptions)` - hook

- `createWithStyles(styles, decoratorOptions)` - decorator creator

- `withStyles(decoratorOptions)` - decorator

- `useTheme()` - hook

- `withTheme()` - decorator

- `hookOptions = { purgeUnused = true, ...jssSheetOptions }` 

- `decoratorOptions = { withTheme = false, ...hookOptions }`

- `JssProvider`

#### `JssProvider` props

- `children`
- `jss` - global jss by default
- `theme` - empty object by default
