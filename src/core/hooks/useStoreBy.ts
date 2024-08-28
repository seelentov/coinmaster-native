import { useSelector } from 'react-redux'

export const useStoreBy = <T>(name: string): T => {

  return useSelector((state: any) => state[name])
}