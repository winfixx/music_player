import React from 'react'

type IHandleScroll = (e: React.UIEvent<HTMLElement>) => void

const useScroll = () => {
    const [scrollPosition, setPosition] = React.useState(0)
    const [opacity, setOpacity] = React.useState(0)

    const handleScroll: IHandleScroll = React.useCallback((e) => {
        setPosition(e.currentTarget.scrollTop)

        if (scrollPosition >= 0 && scrollPosition < 99) {
            return setOpacity(scrollPosition / 99)
        }
        if (scrollPosition >= 99 && scrollPosition < 149) {
            return setOpacity(scrollPosition / 149)
        }
        if (scrollPosition >= 149) {
            return setOpacity(1)
        }
    }, [scrollPosition, opacity])

    return { opacity, handleScroll }
}

export default useScroll