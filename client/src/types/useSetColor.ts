import React from 'react'

export const useSetColor = (avatar: string | undefined) => {
    const [color, setColor] = React.useState<[f: string, s: string, t: string]>(['', '', ''])

    const onSetColor = React.useCallback((colors: any) => {
        if (avatar) {
            return setColor(colors[5])
        }
        return setColor(['', '', ''])
    }, [avatar])

    React.useEffect(() => {
        if (!avatar) {
            return setColor(['', '', ''])
        }
    }, [avatar])

    return {
        onSetColor,
        color
    }
}