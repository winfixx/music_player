import { Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript'
import { User } from 'src/user/user.model'
import { Genre } from './genre.model'

@Table({ tableName: 'preferences' })
export class Preferences extends Model<Preferences> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false })
    id: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @ForeignKey(() => Genre)
    @Column({ type: DataType.INTEGER })
    genreId: number
}