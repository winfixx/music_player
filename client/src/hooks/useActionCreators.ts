import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit'
import { useAppDispatch } from './redux'
import { useMemo } from 'react'

export const useActionCreators = (action: ActionCreatorsMapObject) => {
    const dispatch = useAppDispatch()

    return useMemo(() => bindActionCreators(action, dispatch), [])
}