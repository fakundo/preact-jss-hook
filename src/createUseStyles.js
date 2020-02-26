/* eslint-disable no-param-reassign */
import { useContext, useLayoutEffect, useState, useMemo } from 'preact/hooks'
import jss from 'jss'
import ThemeContext from './ThemeContext'

const isEmptyObject = (obj) => (
  !Object.keys(obj).length
)

class StorageItem {
  constructor(derivedStyles, sheetOptions, theme) {
    const styles = typeof derivedStyles === 'function' ? derivedStyles(theme) : derivedStyles
    this.sheet = jss.createStyleSheet(styles, sheetOptions)
    this.mountedComponents = {}
  }

  addComp(key) {
    this.mountedComponents[key] = true
  }

  removeComp(key) {
    delete this.mountedComponents[key]
  }

  attachSheet() {
    this.sheet.attach()
  }

  destroySheet() {
    jss.removeStyleSheet(this.sheet)
  }

  hasMountedComponents() {
    return !isEmptyObject(this.mountedComponents)
  }

  getClasses() {
    return this.sheet.classes
  }
}

let globalIndex = 1

export default (derivedStyles, derivedCreationOptions = {}) => {
  const index = globalIndex++
  const creationOptions = { storage: new WeakMap(), ...derivedCreationOptions }

  return (adhocOptions) => {
    const theme = useContext(ThemeContext)
    const [key] = useState(() => Math.random())

    const { storage, ...sheetOptions } = useMemo(() => ({
      index,
      ...creationOptions,
      ...adhocOptions,
    }), [creationOptions, adhocOptions])

    const storageItem = useMemo(() => {
      const exItem = storage.get(theme)

      if (exItem) {
        return exItem
      }

      const newItem = new StorageItem(derivedStyles, sheetOptions, theme)
      storage.set(theme, newItem)
      return newItem
    }, [theme])

    useLayoutEffect(() => {
      storageItem.addComp(key)
      storageItem.attachSheet()
      return () => {
        storageItem.removeComp(key)
        if (!storageItem.hasMountedComponents()) {
          storageItem.destroySheet()
          storage.delete(theme)
        }
      }
    }, [theme])

    return { theme, classes: storageItem.getClasses() }
  }
}
