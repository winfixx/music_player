class UpdateAlbum {
    readonly avatar: FileList[0] | undefined
    readonly deleteAvatar: string
    readonly name: string
}

export class CreateAlbumArgsDto extends UpdateAlbum {
    readonly userId: number | string
    readonly albumId: number | string
}