import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'
import { Album } from '../model/album.model'

@Table({ tableName: 'library_album' })
export class LibraryAlbum extends Model<LibraryAlbum> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false })
    id: number

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    fixed: boolean

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number
    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Album)
    @Column({ type: DataType.INTEGER })
    albumId: number
    @BelongsTo(() => Album)
    album: Album
}