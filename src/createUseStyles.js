/* eslint-disable no-param-reassign */
import { useContext, useLayoutEffect, useState, useMemo } from 'preact/hooks'
import jss from 'jss'
import ThemeContext from './ThemeContext'

const isEmptyObject = (obj) => (
  !Object.keys(obj).length
)

const handleComponentRender = ({ storage, derivedStyles, theme, sheetOptions }) => {
  if (isEmptyObject(storage)) {
    storage.mountedComponents = {}
    storage.theme = theme
    storage.sheet = null
  }

  if (storage.theme !== theme && typeof derivedStyles === 'function') {
    if (storage.sheet) {
      jss.removeStyleSheet(storage.sheet)
      storage.sheet = null
    }
    storage.theme = theme
  }

  if (!storage.sheet) {
    const styles = typeof derivedStyles === 'function' ? derivedStyles(theme) : derivedStyles
    storage.sheet = jss.createStyleSheet(styles, sheetOptions)
  }
}

const handleComponentMount = ({ storage, key }) => {
  storage.mountedComponents[key] = true
  if (!storage.sheet.attached) {
    storage.sheet.attach()
  }
}

const handleComponentUnmount = ({ storage, key }) => {
  delete storage.mountedComponents[key]
  if (isEmptyObject(storage.mountedComponents) && storage.sheet) {
    storage.sheet.detach()
  }
}

let globalIndex = 1

export default (derivedStyles, derivedCreationOptions = {}) => {
  const index = globalIndex++
  const creationOptions = { storage: {}, ...derivedCreationOptions }

  return (adhocOptions) => {
    const theme = useContext(ThemeContext)
    const [key] = useState(() => Math.random())

    const { storage, ...sheetOptions } = useMemo(() => ({
      index,
      ...creationOptions,
      ...adhocOptions,
    }), [creationOptions, adhocOptions])

    handleComponentRender({ storage, derivedStyles, theme, sheetOptions })

    useLayoutEffect(() => {
      handleComponentMount({ storage, key })
      return () => handleComponentUnmount({ storage, key })
    }, [storage])

    const { classes } = storage.sheet
    return { classes, theme }
  }
}
