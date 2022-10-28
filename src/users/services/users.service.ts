import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserCreationAttrs, Users } from "../models/users.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private userRepository: typeof Users) {
  }

  create(dto: UserCreationAttrs): Promise<Users> {
    return  this.userRepository.create(dto)
  }

  update(user: Users) {
    return this.userRepository.update(user, {where: {id: user.id}})
      .then(() => {
      return { message: 'ok', user }
    })
  }

  getAll(params: any): Promise<Users[]> {
    return  this.userRepository.findAll({where: { ...params }})
  }

  _getAll(): Promise<Users[]> {
    return  this.userRepository.findAll()
  }
}
