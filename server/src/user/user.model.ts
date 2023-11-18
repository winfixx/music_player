import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import { Album } from 'src/model/album.model'
import { Genre } from 'src/model/genre.model'
import { Preferences } from 'src/model/preferences.model'
import { Track } from 'src/model/track.model'
import { Playlist } from 'src/playlist/playlist.model'
import { LibraryAlbum } from 'src/user/library_album.model'
import { LibraryFolder } from 'src/user/library_folder.model'
import { LibraryPlaylist } from 'src/user/library_playlist.model'
import { Token } from '../token/token.model'

@Table({ tableName: 'user' })
export class User extends Model<User>{
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, unique: true })
    id: number

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name: string

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email: string

    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @Column({ type: DataType.STRING })
    avatar: string

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isActivated: boolean

    @Column({ type: DataType.STRING })
    activationLink: string

    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    junior: boolean

    @Column({ type: DataType.INTEGER, defaultValue: 1 })
    countOwnPlaylist: number

    @HasOne(() => Token)
    token: Token

    @BelongsToMany(() => Album, () => LibraryAlbum)
    albumsLibrary: Album[]

    @BelongsToMany(() => Playlist, () => LibraryPlaylist)
    playlistsLibrary: Playlist[]

    @BelongsToMany(() => Playlist, () => LibraryFolder)
    playlistsFolder: Playlist[]

    @HasMany(() => Album)
    albums: Album[]

    @HasMany(() => Track)
    tracks: Track[]

    @HasMany(() => Playlist)
    playlists: Playlist[]

    @BelongsToMany(() => Genre, () => Preferences)
    genres: Genre[]
}

