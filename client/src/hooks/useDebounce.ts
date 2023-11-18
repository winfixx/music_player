import * as React from 'react'

function useDebounce<T, U extends number>(value: T, delay: U) {
    const [debouncedValue, setDebouncedValue] = React.useState(value)

    React.useEffect(() => {

        const t = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(t)

    }, [value, delay])

    return debouncedValue
}

export default useDebounce