import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'
import { Track } from '../model/track.model'
import { LibraryFolder } from '../user/library_folder.model'
import { LibraryPlaylist } from '../user/library_playlist.model'
import { PlaylistTrack } from './playlist_track.model'

@Table({ tableName: 'playlist' })
export class Playlist extends Model<Playlist> {
    @Column({ type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true, allowNull: false })
    id: number

    @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
    name: string

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    public: boolean

    @Column({ type: DataType.STRING })
    avatar: string

    @BelongsToMany(() => Track, () => PlaylistTrack)
    tracks: Track[]

    @BelongsToMany(() => User, () => LibraryFolder)
    usersFolder: User[]

    @BelongsToMany(() => User, () => LibraryPlaylist)
    usersPlaylist: User[]

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    authorId: number
    @BelongsTo(() => User)
    author: User
}