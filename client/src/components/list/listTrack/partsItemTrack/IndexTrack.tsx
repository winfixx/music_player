import * as React from 'react'

interface IIndexTrackProps {
    index: number
}

const IndexTrack: React.FunctionComponent<IIndexTrackProps> = ({
    index
}) => {
    return <div>{index + 1}</div>
}

export default IndexTrack
