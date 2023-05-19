import { useContext } from 'react'
import { Context } from '../context/StateContext'

export const useStateContext = () => useContext(Context)
