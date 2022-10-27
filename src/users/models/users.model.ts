import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

export interface UserCreationAttrs {
  telegram_user_name: string;
  telegram_id: string;
}

@Table({ tableName: "users" })
export class Users extends Model<Users, UserCreationAttrs> {

  @ApiProperty({ example: 1, description: "Id of user" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  telegram_user_name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  telegram_id: string;

  @Column({ type: DataType.STRING })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.STRING })
  membership_type: string;

  @Column({ type: DataType.INTEGER })
  generation: number;

  @Column({ type: DataType.DATE })
  date_of_birth: Date;

  @Column({ type: DataType.DATE })
  date_of_join: Date;
}