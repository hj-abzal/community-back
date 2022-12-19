import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { MessagesService } from "../services/messages.service";
import { UsersService } from "../services/users.service";

@Controller("messages")
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
    private usersService: UsersService
  ) {
  }

  @Post('/by-group')
  async sendByGroup(@Body() body: any) {
    try {
      const users = await this.usersService.getAll({group: body.group})
      return this.messagesService.sendMessage(body.message, users)
    } catch (e) {
      return new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }

  @Post('/to-all')
  async sendToAll(@Body() body: any) {
    try {
      const users = await this.usersService.getAll({})
      return this.messagesService.sendMessage(body.message, users)
    } catch (e) {
      return new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }

  @Post("")
  async sendMessage(@Body() body: any) {
    try {
      return  await this.usersService.getAll({...body});
    } catch (e) {

    }
  }
}
