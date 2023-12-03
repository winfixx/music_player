import * as React from 'react'
import ListTrack from './ListTrack'

interface ListTrackForRecommendations {
    children: React.ReactNode
}

const ListTrackForRecommendations: React.FunctionComponent<ListTrackForRecommendations> = React.memo(({
    children
}) => {
    return (
        <ListTrack>
            {children}
        </ListTrack>
    )
})

export default ListTrackForRecommendations
