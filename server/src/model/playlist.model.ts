import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript'
import { Track } from './track.model'
import { PlaylistTrack } from './playlist_track.model'
import { LibraryFolder } from './library_folder.model'
import { User } from 'src/user/user.model'
import { LibraryPlaylist } from './library_playlist.model'

@Table({ tableName: 'playlist' })
export class Playlist extends Model<Playlist> {
    @Column({ type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true, allowNull: false })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    public: boolean

    @Column({ type: DataType.STRING })
    avatar: string

    @BelongsToMany(() => Track, () => PlaylistTrack)
    track: Track[]

    @HasOne(() => LibraryFolder)
    libraryFolder: LibraryFolder

    @HasOne(() => LibraryPlaylist)
    libraryPlaylist: LibraryPlaylist

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number
    @BelongsTo(() => User)
    user: User
}