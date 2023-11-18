import * as React from 'react'
import { MdOutlineFolder, MdOutlinePlaylistAdd } from 'react-icons/md'
import { RiAlbumLine } from 'react-icons/ri'
import styles from './ContextMenu.module.scss'

interface ContextMenuProps {
    onShowMenu: () => void
    onCreatePlaylist: () => void
}

const ContextMenu: React.FunctionComponent<ContextMenuProps> = ({
    onCreatePlaylist,
    onShowMenu
}) => {
    return (
        <div onClick={onShowMenu} className={styles['context-menu']}>
            <button onClick={onCreatePlaylist}>
                {<MdOutlinePlaylistAdd />}
                <span>Создать плейлист</span>
            </button>
            <button>
                {<RiAlbumLine />}
                <span>Создать альбом</span>
            </button>
            <button>
                {<MdOutlineFolder />}
                <span>Создать папку с плейлистами</span>
            </button>
        </div>
    )
}

export default ContextMenu
