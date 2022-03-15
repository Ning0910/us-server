'use strict';

const Controller = require('egg').Controller;

// 控制器类入口
// 实现路由几个常规函数，包括列表及CRUD的操作
class appBranchInfoController extends Controller {
  // Get: /appBranchInfos
  async index() {
    // 展示列表数据-L
    const ctx = this.ctx;

    const data = await ctx.service.appBranchInfo.list();

    const json = ctx.helper.json(data);
    ctx.body = json;
  }

  // GET: /appBranchInfos/byName/:appId/:branchName
  async getByName() {
    const ctx = this.ctx;
    const data = await ctx.service.appBranchInfo.findByAppIdAndBranchName(
      ctx.params.appId,
      ctx.params.branchName
    );

    ctx.body = data;
  }

  // GET: /appBranchInfos/byVersion/:versionId
  async getByVersion() {
    const ctx = this.ctx;
    const data = await ctx.service.appBranchInfo.findByVersion(
      ctx.helper.parseInt(ctx.params.versionId)
    );

    ctx.body = data;
  }

  // GET: /appBranchInfos/:id
  async show() {
    // 显示某记录具体的数据-R
    const ctx = this.ctx;
    ctx.body = await ctx.service.appBranchInfo.find(ctx.params.id);
  }

  // POST: /appBranchInfos
  async create() {
    // 新增一个记录-C
    const ctx = this.ctx;
    const appBranchInfo = await ctx.service.appBranchInfo.create(
      ctx.request.body
    );
    ctx.status = 201;
    ctx.body = appBranchInfo;
  }

  // PUT: /appBranchInfos/:id
  async update() {
    // 更新指定的记录-U
    const ctx = this.ctx;
    const id = ctx.params.id;
    const body = ctx.request.body;
    ctx.body = await ctx.service.appBranchInfo.update({
      id,
      updates: body,
    });
  }

  // DELETE: /appBranchInfos/:id
  async destroy() {
    // 删除指定的记录-D
    const ctx = this.ctx;
    const id = ctx.params.id;
    await ctx.service.appBranchInfo.del(id);
    ctx.status = 200;
  }

  // DELETE: /appBranchInfos/deleteByAppId/:appId
  async destroyBranchByAppId() {
    // 删除指定的记录-D
    const ctx = this.ctx;
    const id = ctx.params.appId;
    await ctx.service.appBranchInfo.delBranchByAppId(id);
    ctx.status = 200;
  }
  // DELETE: /appBranchInfos/deleteByIdAndName/:appId/:branchName
  async destroyBranchByName() {
    const ctx = this.ctx;
    const appId = ctx.params.appId;
    const branchName = ctx.params.branchName;
    await ctx.service.appBranchInfo.delBranchByIdAndName(appId, branchName);
    await ctx.service.branchCommitLog.del(appId.concat('_', branchName));
    ctx.status = 200;
  }
  // DELETE: /appBranchInfos/deleteExclude/:appId/:branchName
  async destroyBranchExclude() {
    const ctx = this.ctx;
    const appId = ctx.params.appId;
    const branchName = ctx.params.branchName;
    await ctx.service.appBranchInfo.delBranchExclude(appId, branchName);
    await ctx.service.branchCommitLog.delByAppIdExclude(
      appId.concat('_', branchName)
    );
    ctx.status = 200;
  }
}

module.exports = appBranchInfoController;
