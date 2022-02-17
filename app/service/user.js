'use strict';

const Service = require('egg').Service;

//服务类入口，用于封装具体的数据库访问
class User extends Service {
  async login(usernameOrEmail, password) {
    var user = await this.ctx.model.User.findOne({
      where: {
        $or: [{ username: usernameOrEmail }, { emailaddress: usernameOrEmail }],
      },
    });

    var success = false;
    var error = '';
    if (user) {
      success = true;
    }

    return {
      success,
      error,
    };
  }

  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.User.findAndCountAll({
      offset,
      limit,
      order: [
        ['creationtime', 'desc'],
        ['id', 'desc'],
      ],
    });
  }

  async find(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async create(user) {
    return this.ctx.model.User.create(user);
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

  async del(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.destroy();
  }
}

module.exports = User;
