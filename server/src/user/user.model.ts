import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import { Album } from 'src/model/album.model'
import { Genre } from 'src/model/genre.model'
import { LibraryAlbum } from 'src/model/library_album.model'
import { LibraryFolder } from 'src/model/library_folder.model'
import { LibraryPlaylist } from 'src/model/library_playlist.model'
import { Playlist } from 'src/model/playlist.model'
import { Preferences } from 'src/model/preferences.model'
import { Track } from 'src/model/track.model'
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

    @HasOne(() => Token)
    token: Token

    @HasMany(() => LibraryAlbum)
    libraryAlbum: LibraryAlbum[]

    @HasMany(() => LibraryPlaylist)
    libraryPlaylist: LibraryPlaylist[]

    @HasMany(() => Album)
    album: Album[]

    @HasMany(() => Track)
    track: Track[]

    @HasMany(() => LibraryFolder)
    libraryFolder: LibraryFolder[]

    @HasMany(() => Playlist)
    playlist: Playlist[]

    @BelongsToMany(() => Genre, () => Preferences)
    genre: Genre[]
}

