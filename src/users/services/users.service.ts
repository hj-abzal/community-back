import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserCreationAttrs, Users } from "../models/users.model";
import { FindOptions, Op } from "sequelize";

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private userRepository: typeof Users) {
  }

  create(dto: UserCreationAttrs): Promise<Users> {
    return  this.userRepository.create(dto)
  }

  update(user: Users, id: number) {
    delete user.id;
    delete user.telegram_id;
    delete user.telegram_user_name;

    return this.userRepository.update(user, {where: {id}})
      .then(() => {
      return { message: 'ok', user }
    })
  }

  getAll(params: any): Promise<Users[]> {
    return  this.userRepository.findAll({where: { ...params }})
  }

  async _getAll(query: any) {
    const limit = 10;
    let where: any = {};
    if (query.search) {
      where.first_name = {
        [Op.like]: `%${query.search}%`
      };
    }

    let request: FindOptions = { where, limit, offset: 0 };

    if (query.page) {
      request.offset = query.page * limit - limit;
    }
    return {
      currentPage: query?.page || 1,
      totalCount: await this.userRepository.count({where}),
      users: await this.userRepository.findAll(request)
    }
  }

  async delete(id: number) {
    return this.userRepository.destroy({where: {id}})
      .then(() => {
        return { message: 'ok', id }
      })
  }
}
