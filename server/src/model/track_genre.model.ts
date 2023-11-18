import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Genre } from './genre.model'
import { Track } from './track.model'

@Table({ tableName: 'track_genre' })
export class TrackGenre extends Model<TrackGenre> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false })
    id: number

    @ForeignKey(() => Genre)
    @Column({ type: DataType.INTEGER })
    genreId: number
    @BelongsTo(() => Genre)
    genre: Genre

    @ForeignKey(() => Track)
    @Column({ type: DataType.INTEGER })
    trackId: number
    @BelongsTo(() => Track)
    track: Track
}