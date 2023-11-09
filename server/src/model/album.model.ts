import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import { LibraryAlbum } from './library_album.model'
import { User } from 'src/user/user.model'
import { Track } from './track.model'

@Table({ tableName: 'album' })
export class Album extends Model<Album> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.STRING })
    image: string

    @HasOne(() => LibraryAlbum)
    libraryAlbum: LibraryAlbum

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(() => User)
    user: User

    @HasMany(() => Track)
    track: Track[]
}