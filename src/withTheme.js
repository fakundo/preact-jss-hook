import { createElement } from 'preact'
import { forwardRef } from 'preact/compat'
import useTheme from './useTheme'

export default (component) => (
  forwardRef((ownProps, ref) => {
    const theme = useTheme()
    return createElement(component, { ...ownProps, theme, ref })
  })
)
