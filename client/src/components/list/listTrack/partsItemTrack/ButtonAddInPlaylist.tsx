import * as React from 'react'
import ButtonShared from '../../../button/button-shared/ButtonShared'

interface IButtonAddInPlaylistProps {
}

const ButtonAddInPlaylist: React.FunctionComponent<IButtonAddInPlaylistProps> = () => {
    return (
        <ButtonShared type='submit'
            onClickButton={() => { }}
            style={{
                color: '#fff',
                background: 'none',
                border: '1px solid #1ed760',
                fontSize: '14px'
            }}
        >
            Добавить
        </ButtonShared>
    )
}

export default ButtonAddInPlaylist
