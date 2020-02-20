/** @jsx h */
import { h } from 'preact'
import ThemeContext from './ThemeContext'

export default ({ theme, children }) => (
  <ThemeContext.Provider value={theme}>
    { children }
  </ThemeContext.Provider>
)
