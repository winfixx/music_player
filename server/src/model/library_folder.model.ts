import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'
import { Playlist } from './playlist.model'

@Table({ tableName: 'library_folder' })
export class LibraryFolder extends Model<LibraryFolder> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true })
    id: number

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name: string

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number
    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Playlist)
    @Column({ type: DataType.INTEGER })
    playlistId: number
    @BelongsTo(() => Playlist)
    playlist: Playlist
}