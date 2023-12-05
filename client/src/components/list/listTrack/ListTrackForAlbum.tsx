import * as React from 'react'
import ListTrack from './ListTrack'

interface ListTrackForAlbum {
    children: React.ReactNode
}

const ListTrackForAlbum: React.FunctionComponent<ListTrackForAlbum> = React.memo(({
    children
}) => {
    return (
        <ListTrack>
            {children}
        </ListTrack>
    )
})

export default ListTrackForAlbum
