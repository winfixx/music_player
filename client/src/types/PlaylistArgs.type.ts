import { ChangeInfoHeading } from './ChangeInfoHeading.type'

export interface PlaylistArgs extends Partial<ChangeInfoHeading> {
    userId: number | null | undefined
    playlistId?: number | string | undefined | null
    trackId?: number | null
}

export interface PickIdsPlaylistArgs extends Pick<PlaylistArgs, 'userId' | 'trackId' | 'playlistId'> { }