import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Album } from './album.model'
import { TrackGenre } from './track_genre.model'
import { Genre } from './genre.model'
import { Playlist } from './playlist.model'
import { PlaylistTrack } from './playlist_track.model'
import { User } from 'src/user/user.model'

@Table({ tableName: 'track' })
export class Track extends Model<Track> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.STRING })
    image: string
    
    @ForeignKey(() => Album)
    @Column({type: DataType.INTEGER})
    albumId: number
    @BelongsTo(() => Album)
    album: Album

    @BelongsToMany(() => Genre, () => TrackGenre)
    genre: Genre[]

    @BelongsToMany(() => Playlist, () => PlaylistTrack)
    playlist: Playlist[]

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number
    @BelongsTo(() => User)
    user: User
}