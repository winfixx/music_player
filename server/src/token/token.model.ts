import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from '../user/user.model'

@Table({ tableName: 'token' })
export class Token extends Model<Token> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    refreshToken: string

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number
    @BelongsTo(() => User)
    user: User
}