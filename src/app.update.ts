import { Ctx, InjectBot, Message, On, Start, Update } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { v1 } from "uuid";
import { UsersService } from "./users/services/users.service";

interface IContext extends Context {
  session: {
    type: 'register' | null,
    token: string
  }
}

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<IContext>,
    private userService: UsersService
  ) {
  }

  @Start()
  async sayHello(ctx: IContext) {
    const token = v1();
    ctx.session.type = 'register';
    ctx.session.token = token
    await ctx.reply('Отправил сенсею @SuanAbzal токен, отправь следующим сообщением данный токен:')
    await ctx.telegram.sendMessage(process.env.ADMIN_TELEGRAM_ID, token)
    await ctx.telegram.sendMessage(process.env.ADMIN_TELEGRAM_ID, JSON.stringify(ctx.from))
  }

  @On('text')
  async confirmRegister(@Message('text') message: string,  @Ctx() ctx: IContext) {
    if (ctx.session?.type !== 'register') return;
    if (message === ctx.session.token) {
      try {
         await this.userService.create({
          telegram_id: ctx.from.id.toString(),
          telegram_user_name: ctx.from.username,
        })
        await ctx.reply(`Успешно зарегистрирован!`)
        await ctx.telegram.sendMessage(process.env.ADMIN_TELEGRAM_ID, `Успешно зарегистрирован!`)

      } catch (e) {
        await ctx.reply(`Что то пошло не так!`)
        await ctx.telegram.sendMessage(process.env.ADMIN_TELEGRAM_ID, `Что то пошло не так!`)
      }
    } else {
      await ctx.reply('Не валидный токен!')
      await ctx.telegram.sendMessage(process.env.ADMIN_TELEGRAM_ID, `Не валидный токен! Нужно:${message}, получаю:${ctx.session.token}`)
    }
    ctx.session.type = null;
    ctx.session.token = '';
  }
}