import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

export const useLocationPath = (path: string): boolean => {
    const location = useLocation()

    return useMemo<boolean>(() => location.pathname === path, [location.pathname])
}