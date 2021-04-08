# preact-jss-hook

[![npm](https://img.shields.io/npm/v/preact-jss-hook.svg)](https://www.npmjs.com/package/preact-jss-hook)

JSS integration with Preact.

### Installation
  
```
npm i preact-jss-hook
```

### Usage

Basic Example

```js
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

JSS Provider

```js
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

Using Theme

```js
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

Using HOC

```js
import { createWithStyles } from 'preact-jss-hook'

const withStyles = createWithStyles((theme) => ({
  root: {
    color: theme.primaryColor
  }
}))

const SuperComponent = ({ classes, theme }) => (
  <div className={classes.root}>
    Red block
  </div>
)

export default withStyles({ withTheme: true })(SuperComponent)
```

### API

- `createUseStyles(styles, hookOptions)` - hook creator

- `useStyles(hookOptions)` - hook

- `createWithStyles(styles, decoratorOptions)` - decorator creator

- `withStyles(decoratorOptions)` - decorator

- `useTheme()` - hook

- `withTheme()` - decorator

- `hookOptions = { purgeUnused = true, ...jssSheetOptions }` 

- `decoratorOptions = { withTheme = false, ...hookOptions }`

- `JssProvider`

`JssProvider` props

- `children`
- `jss` - global jss by default
- `theme` - empty object by default
