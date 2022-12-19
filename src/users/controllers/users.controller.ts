import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UserCreationAttrs, Users } from "../models/users.model";

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() dto: UserCreationAttrs) {
    return this.userService.create(dto);
  }

  @Put('/:id')
  updateUser(@Body() dto: Users, @Param('id') id: number) {
    return this.userService.update(dto, id);
  }

  @Get()
  getAll( @Query() query) {
    return this.userService._getAll(query);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
