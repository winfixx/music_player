import * as React from 'react'

export const useSetImage = (error: string, setError: (error: string) => void) => {
    const [avatarPreview, setAvatarPreview] = React.useState('')
    const [avatarAsFile, setAvatarAsFile] = React.useState<FileList[0] | undefined>(undefined)

    const onFileChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setAvatarPreview(URL.createObjectURL(event.target.files[0]))
            setAvatarAsFile(event.target.files[0])
        }
    }, [])

    React.useMemo(() => {
        if (!error) {
            return
        }
        setAvatarAsFile(undefined)
    }, [error])

    const onImgLoad = React.useCallback(({ currentTarget }: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (currentTarget.offsetHeight < 180 || currentTarget.offsetWidth < 180) {
            setError('Изображение слишком маленькое. Выберите файл размером не менее 180 x 180.')
            return
        }

        setError('')
        return
    }, [])

    return {
        error,
        avatarPreview,
        avatarAsFile,
        onFileChange,
        onImgLoad
    }
}