'use strict';

const Controller = require('egg').Controller;

// 控制器类入口
// 实现路由几个常规函数，包括列表及CRUD的操作
class appInfoController extends Controller {
  // Get: /appInfos
  async index() {
    // 展示列表数据-L
    const ctx = this.ctx;

    const data = await ctx.service.appInfo.list();

    const json = ctx.helper.json(data);
    ctx.body = json;
  }

  // GET: /appInfos/:id
  async show() {
    // 显示某记录具体的数据-R
    const ctx = this.ctx;
    ctx.body = await ctx.service.appInfo.find(ctx.params.id);
  }

  // POST: /appInfos
  async create() {
    // 新增一个记录-C
    const ctx = this.ctx;
    const appInfo = await ctx.service.appInfo.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = appInfo;
  }

  // PUT: /appInfos/:id
  async update() {
    // 更新指定的记录-U
    const ctx = this.ctx;
    const id = ctx.params.id;
    const { branchNames, curUserConfig, curBranch } = ctx.request.body;

    let data1 = {},
      data2 = {},
      data3 = {};
    if (curBranch) {
      data1 = {
        curBranch,
      };
    }
    if (branchNames) {
      data2 = {
        branchNames,
      };
    }

    if (curUserConfig) {
      data3 = {
        curUserConfig,
      };
    }

    ctx.body = await ctx.service.appInfo.update({
      id,
      updates: Object.assign(data1, data2, data3),
    });
  }

  // DELETE: /appInfos/:id
  async destroy() {
    // 删除指定的记录-D
    const ctx = this.ctx;
    const id = ctx.params.id;
    await ctx.service.appInfo.del(id);
    await ctx.service.appBranchInfo.delBranchByAppId(id);
    await ctx.service.branchCommitLog.delByAppId(id);
    ctx.status = 200;
  }
}

module.exports = appInfoController;
