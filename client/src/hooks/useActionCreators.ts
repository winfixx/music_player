import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit'
import { useAppDispatch } from './redux'
import { useMemo } from 'react'

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(
    action: Actions
) => {
    const dispatch = useAppDispatch()

    return useMemo(() => bindActionCreators(action, dispatch), [dispatch])
}