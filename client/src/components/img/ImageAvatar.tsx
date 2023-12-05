import * as React from 'react'
import styles from './ImageAvatar.module.scss'

interface IImageAvatarProps {
    sizeWidth?: string
    sizeHight?: string
    borderRadius: string
    src: string | undefined
    onLoad?: React.ReactEventHandler<HTMLImageElement> | undefined
}

const ImageAvatar: React.FunctionComponent<IImageAvatarProps> = ({
    sizeHight,
    sizeWidth,
    src,
    borderRadius,
    onLoad
}) => {
    return <img className={styles.avatar__custom}
        style={{ width: sizeWidth, height: sizeHight, borderRadius }}
        src={src}
        alt=''
        onLoad={onLoad}
    />
}

export default ImageAvatar
