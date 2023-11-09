import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'
import { Playlist } from './playlist.model'

@Table({ tableName: 'library_playlist' })
export class LibraryPlaylist extends Model<LibraryPlaylist> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false })
    id: number

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    fixed: boolean

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number
    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Playlist)
    @Column({ type: DataType.INTEGER })
    playlistId: number
    @BelongsTo(() => User)
    playlist: Playlist
}