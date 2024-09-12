import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../store/store'
import { getLang } from '../../lang/lang'
import { useStoreBy } from './useStoreBy'
import { AuthStore } from '../store/auth/auth.store'

export const useLang = () => {
  const { lang } = useStoreBy<AuthStore>("auth")
  return getLang(lang);
}