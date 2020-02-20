import { useContext } from 'preact/hooks'
import ThemeContext from './ThemeContext'

export default () => {
  const theme = useContext(ThemeContext)
  return theme
}
