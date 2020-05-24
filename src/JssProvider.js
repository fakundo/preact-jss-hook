/** @jsx h */
import { h } from 'preact'
import { useMemo } from 'preact/hooks'
import globalJss from 'jss'
import JssContext from './JssContext'

export default ({ jss = globalJss, theme = {}, children }) => {
  const value = useMemo(() => ({ jss, theme }), [jss, theme])
  return (
    <JssContext.Provider value={value}>
      { children }
    </JssContext.Provider>
  )
}
