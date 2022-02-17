'use strict';

const Controller = require('egg').Controller;

//控制器类入口
//实现路由几个常规函数，包括列表及CRUD的操作
class UserController extends Controller {
  async index() {
    //展示列表数据-L
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    var data = await ctx.service.user.list(query);
    var json = ctx.helper.json(data);
    ctx.body = json;
  }

  async show() {
    //显示某记录具体的数据-R
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    //新增一个记录-C
    const ctx = this.ctx;
    const user = await ctx.service.user.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    //更新指定的记录-U
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.user.update({
      id,
      updates: body,
    });
  }

  async destroy() {
    //删除指定的记录-D
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.user.del(id);
    ctx.status = 200;
  }
}

module.exports = UserController;
