'use strict';

const Service = require('egg').Service;

// 服务类入口，用于封装具体的数据库访问
class AppInfo extends Service {
  async list() {
    const appInfos = await this.ctx.model.AppInfo.findAll();
    return appInfos;
  }

  async find(id) {
    const appInfo = await this.ctx.model.AppInfo.findByPk(id);
    if (!appInfo) {
      this.ctx.status = 404;
      return undefined;
    }
    return appInfo;
  }

  async create(appInfo) {
    const app = await this.ctx.model.AppInfo.findOne({
      where: { id: appInfo.id },
    });
    const app1 = await this.ctx.model.AppInfo.findOne({
      where: { appName: appInfo.appName },
    });

    if (app !== null || app1 !== null) {
      return undefined;
    }
    return this.ctx.model.AppInfo.create(appInfo);
  }

  async update({ id, updates }) {
    const appInfo = await this.ctx.model.AppInfo.findByPk(id);
    if (!appInfo) {
      this.ctx.status = 404;
      return;
    }
    return appInfo.update(updates);
  }

  async del(id) {
    const appInfo = await this.ctx.model.AppInfo.findByPk(id);
    if (!appInfo) {
      this.ctx.status = 404;
      return;
    }
    await appInfo.destroy();
    this.status = 200;
  }
}

module.exports = AppInfo;
