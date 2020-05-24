/* eslint-disable no-param-reassign */
import { useContext, useLayoutEffect, useState, useMemo } from 'preact/hooks'
import JssContext from './JssContext'

const isFunction = (obj) => (
  typeof obj === 'function'
)

const isEmptyObject = (obj) => (
  !Object.keys(obj).length
)

class StorageItem {
  constructor(derivedStyles, sheetOptions, jss, theme) {
    const styles = isFunction(derivedStyles) ? derivedStyles(theme) : derivedStyles
    this.sheet = jss.createStyleSheet(styles, sheetOptions)
    this.mountedComponents = {}
    this.jss = jss
  }

  registerComponent(key) {
    this.mountedComponents[key] = true
  }

  unregisterComponent(key) {
    delete this.mountedComponents[key]
  }

  attachSheet() {
    this.sheet.attach()
  }

  detachSheet() {
    this.sheet.detach()
  }

  destroySheet() {
    this.jss.removeStyleSheet(this.sheet)
  }

  hasMountedComponents() {
    return !isEmptyObject(this.mountedComponents)
  }

  getClasses() {
    return this.sheet.classes
  }
}

let globalIndex = -1e9

export default (derivedStyles, derivedOptions = {}) => {
  const options = {
    purgeUnused: true,
    index: globalIndex++,
    storage: new WeakMap(),
    ...derivedOptions,
  }

  return (adhocOptions) => {
    const contextValue = useContext(JssContext)
    const [key] = useState(() => Math.random())

    const { storage, purgeUnused, ...sheetOptions } = useMemo(() => ({
      ...options,
      ...adhocOptions,
    }), [options, adhocOptions])

    const storageItem = useMemo(() => {
      const existingItem = storage.get(contextValue)

      if (existingItem) {
        return existingItem
      }

      const { jss, theme } = contextValue
      const newItem = new StorageItem(derivedStyles, sheetOptions, jss, theme)
      storage.set(contextValue, newItem)
      return newItem
    }, [contextValue, storage])

    storageItem.registerComponent(key)
    storageItem.attachSheet()

    useLayoutEffect(() => () => {
      storageItem.unregisterComponent(key)
      if (!storageItem.hasMountedComponents()) {
        storageItem.detachSheet()
        if (purgeUnused) {
          storageItem.destroySheet()
          storage.delete(contextValue)
        }
      }
    }, [contextValue, storage, storageItem, purgeUnused])

    return {
      theme: contextValue.theme,
      classes: storageItem.getClasses(),
    }
  }
}
