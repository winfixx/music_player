import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Track } from '../model/track.model'
import { Playlist } from './playlist.model'

@Table({ tableName: 'playlist_track' })
export class PlaylistTrack extends Model<PlaylistTrack> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true })
    id: number

    @ForeignKey(() => Playlist)
    @Column({ type: DataType.INTEGER })
    playlistId: number
    @BelongsTo(() => Playlist)
    playlist: Playlist

    @ForeignKey(() => Track)
    @Column({ type: DataType.INTEGER })
    trackId: number
    @BelongsTo(() => Track)
    track: Track
}