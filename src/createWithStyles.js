import { createElement } from 'preact'
import { forwardRef } from 'preact/compat'
import defaultCreateUseStyles from './createUseStyles'

export default (derivedStyles, {
  createUseStyles = defaultCreateUseStyles,
  ...derivedOptions
} = {}) => {
  const useStyles = createUseStyles(derivedStyles)

  return ({
    withTheme = false,
    ...adhocOptions
  } = {}) => (
    (component) => (
      forwardRef((ownProps, ref) => {
        const { classes, theme } = useStyles({
          meta: component.name || '',
          ...derivedOptions,
          ...adhocOptions,
        })

        return createElement(component, {
          ...ownProps,
          ...(withTheme ? { theme } : {}),
          classes,
          ref,
        })
      })
    )
  )
}
