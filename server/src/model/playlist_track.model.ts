import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Playlist } from './playlist.model'
import { Track } from './track.model'

@Table({ tableName: 'playlist_track' })
export class PlaylistTrack extends Model<PlaylistTrack> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true })
    id: number

    @ForeignKey(() => Playlist)
    @Column({ type: DataType.INTEGER })
    playlistId: number

    @ForeignKey(() => Track)
    @Column({ type: DataType.INTEGER })
    trackId: number
}