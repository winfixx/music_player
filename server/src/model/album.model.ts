import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'
import { LibraryAlbum } from '../user/library_album.model'
import { Track } from './track.model'

@Table({ tableName: 'album' })
export class Album extends Model<Album> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.STRING })
    avatar: string

    @BelongsToMany(() => User, () => LibraryAlbum)
    usersLibrary: User[]

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    authorId: number
    @BelongsTo(() => User)
    author: User

    @HasMany(() => Track)
    tracks: Track[]
}