import { createElement } from 'preact'
import { forwardRef } from 'preact/compat'
import defaultCreateUseStyles from './createUseStyles'

export default (derivedStyles, {
  createUseStyles = defaultCreateUseStyles,
  compNameMeta = true,
  ...creationOptions
} = {}) => {
  const useStyles = createUseStyles(derivedStyles, creationOptions)

  return ({ withTheme = false, ...adhocOptions } = {}) => (
    (component) => (
      forwardRef((ownProps, ref) => {
        const { classes, theme } = useStyles({
          meta: (compNameMeta && component.name) || '',
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
