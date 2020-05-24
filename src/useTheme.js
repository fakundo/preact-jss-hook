import { useContext } from 'preact/hooks'
import JssContext from './JssContext'

export default () => {
  const { theme } = useContext(JssContext)
  return theme
}
