import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'
import { Playlist } from '../playlist/playlist.model'
import { PlaylistTrack } from '../playlist/playlist_track.model'
import { Album } from './album.model'
import { Genre } from './genre.model'
import { TrackGenre } from './track_genre.model'

@Table({ tableName: 'track' })
export class Track extends Model<Track> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.STRING, allowNull: false })
    fileName: string

    @Column({ type: DataType.STRING })
    avatar: string

    @ForeignKey(() => Album)
    @Column({ type: DataType.INTEGER })
    albumId: number
    @BelongsTo(() => Album)
    album: Album

    @BelongsToMany(() => Genre, () => TrackGenre)
    genres: Genre[]

    @BelongsToMany(() => Playlist, () => PlaylistTrack)
    playlists: Playlist[]

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    authorId: number
    @BelongsTo(() => User)
    author: User
}