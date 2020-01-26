const Telegraf = require('telegraf');
const session = require('telegraf/session');
const WizardScene = require('telegraf/scenes/wizard');
const Stage = require('telegraf/stage');
const axios = require('axios');
const db = require('./db');

const bot = new Telegraf(process.env.BOT_ID || '');
bot.start((ctx) => ctx.reply('Добро пожаловать! Для регистрации запустите команду /register'));

const { enter, leave } = Stage;

const registration = new WizardScene(
  'registration',
  ctx => {
    ctx.reply('Введите имя своего GitHub аккаунта');
    return ctx.wizard.next();
  },
  async ctx => {
    let result = '';
    try {
      result = await axios.get(`https://api.github.com/users/${ctx.message.text}`);

      await db.User.create({
        github_account: result.data.login,
        github_id: result.data.id,
        telegram_id: ctx.from.id,
        telegram_username: ctx.from.telegram_username,
      });

      ctx.reply(`Ваши данные были успешно сохранены.`);
      return ctx.scene.leave();
    } catch (e) {
      ctx.reply('Не удалось зарегистрироваться, попробуйте снова');
      return ctx.scene.leave();
    }
  }
);

const stage = new Stage([registration], { default: 'registration' });

bot.use(session());
bot.use(stage.middleware());

bot.command('register', ctx => ctx.scene.enter('registration'));

bot.launch();
