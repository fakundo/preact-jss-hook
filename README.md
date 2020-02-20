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

Theme provider

```javascript
import { ThemeProvider } from 'preact-jss-hook'

const theme = {
  primaryColor: 'red'
}

export default () => (
  <ThemeProvider theme={theme}>
    Children
  </ThemeProvider>
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
  const { classes } = useStyles()
  return (
    <div className={classes.root}>
      Red block
    </div>
  )
}
```

Using decorator

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

- `createUseStyles(styles, sheetOptions)`

- `useStyles(sheetOptions)`

- `createWithStyles(styles, { createUseStyles,  compNameMeta = true, ...sheetOptions })`

- `withStyles({ withTheme = false, ...sheetOptions })`

- `ThemeProvider`

#### `ThemeProvider` props

- `children`
- `theme`
