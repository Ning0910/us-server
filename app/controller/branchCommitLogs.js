'use strict';

const Controller = require('egg').Controller;

// 控制器类入口
// 实现路由几个常规函数，包括列表及CRUD的操作
class branchCommitLogController extends Controller {
  // Get: /branchCommitLogs
  async index() {
    // 展示列表数据-L
    const ctx = this.ctx;

    const data = await ctx.service.branchCommitLog.list();

    const json = ctx.helper.json(data);
    ctx.body = json;
  }

  // GET: /branchCommitLogs/:id
  async show() {
    // 显示某记录具体的数据-R
    const ctx = this.ctx;
    ctx.body = await ctx.service.branchCommitLog.find(ctx.params.id);
  }

  // POST: /branchCommitLogs
  async create() {
    // 新增一个记录-C
    const ctx = this.ctx;
    const branchCommitLog = await ctx.service.branchCommitLog.create(
      ctx.request.body
    );
    ctx.status = 201;
    ctx.body = branchCommitLog;
  }

  // PUT: /branchCommitLogs/:id
  async update() {
    // 更新指定的记录-U
    const ctx = this.ctx;
    const id = ctx.params.id;

    ctx.body = await ctx.service.branchCommitLog.update({
      id,
      updates: ctx.request.body,
    });
  }

  // DELETE: /branchCommitLogs/:id
  async destroy() {
    // 删除指定的记录-D
    const ctx = this.ctx;
    const id = ctx.params.id;
    await ctx.service.branchCommitLog.del(id);
    ctx.status = 200;
  }

  // DELETE: /branchCommitLogs/deleteByAppId/:appId
  async destroyBranchByAppId() {
    // 删除指定的记录-D
    const ctx = this.ctx;
    const id = ctx.params.appId;
    await ctx.service.branchCommitLog.delByAppId(id);
    ctx.status = 200;
  }
}

module.exports = branchCommitLogController;
