import React from 'react'

export const useClickOutside = (
    ref: React.RefObject<HTMLDivElement>,
    onClickOutside: () => void
) => {
    React.useEffect(() => {

        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, [ref, onClickOutside])
}