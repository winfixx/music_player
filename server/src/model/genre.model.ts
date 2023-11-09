import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { Track } from './track.model'
import { TrackGenre } from './track_genre.model'
import { User } from 'src/user/user.model'
import { Preferences } from './preferences.model'

@Table({ tableName: 'genre' })
export class Genre extends Model<Genre> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false })
    id: number

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name: string

    @BelongsToMany(() => Track, () => TrackGenre)
    track: Track[]

    @BelongsToMany(() => User, () => Preferences)
    user: User[]
}