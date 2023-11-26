class UpdatePlaylist {
    readonly avatar: FileList[0] | undefined
    readonly deleteAvatar: string
    readonly name: string
}

export class CreatePlaylistArgsDto extends UpdatePlaylist {
    readonly userId: number | string
    readonly playlistId: number | string
    readonly trackId?: number | string
}