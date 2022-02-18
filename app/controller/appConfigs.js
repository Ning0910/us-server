'use strict';

const Controller = require('egg').Controller;

// 控制器类入口
// 实现路由几个常规函数，包括列表及CRUD的操作
class appConfigController extends Controller {
  // Get: /appConfigs
  async index() {
    // 展示列表数据-L
    const ctx = this.ctx;

    const data = await ctx.service.appConfig.list();

    const json = ctx.helper.json(data);
    ctx.body = json;
  }

  // GET: /appConfigs/branchNames/:appId
  async getBranchNamesByAppId() {
    const ctx = this.ctx;
    const data = await ctx.service.appConfig.findBranchNamesByAppId(
      ctx.params.appId
    );

    const json = ctx.helper.json(data);
    ctx.body = json;
  }

  // GET: /appConfigs/:id
  async show() {
    // 显示某记录具体的数据-R
    const ctx = this.ctx;
    ctx.body = await ctx.service.appConfig.find(ctx.params.id);
  }

  // POST: /appConfigs
  async create() {
    // 新增一个记录-C
    const ctx = this.ctx;
    const appConfig = await ctx.service.appConfig.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = appConfig;
  }

  // PUT: /appConfigs/:id
  async update() {
    // 更新指定的记录-U
    const ctx = this.ctx;
    const id = ctx.params.id;
    const body = ctx.request.body;
    ctx.body = await ctx.service.appConfig.update({
      id,
      updates: body,
    });
  }

  // DELETE: /appConfigs/:id
  async destroy() {
    // 删除指定的记录-D
    const ctx = this.ctx;
    const id = ctx.params.id;
    await ctx.service.appConfig.del(id);
    ctx.status = 200;
  }

  // DELETE: /appConfigs/deleteAppBranch/:appId
  async destroyBranchByAppId() {
    // 删除指定的记录-D
    const ctx = this.ctx;
    const id = ctx.params.appId;
    await ctx.service.appConfig.delBranchByAppId(id);
    ctx.status = 200;
  }
}

module.exports = appConfigController;
