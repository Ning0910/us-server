'use strict';

const Service = require('egg').Service;

// 服务类入口，用于封装具体的数据库访问
class AppConfig extends Service {
  async list() {
    const appConfigs = await this.ctx.model.AppConfig.findAll();
    return appConfigs;
  }

  async findBranchNamesByAppId(id) {
    const appConfigs = await this.ctx.model.AppConfig.findAll({
      attributes: ['branchName'],
      where: { appId: id },
    });
    return appConfigs;
  }

  async find(id) {
    const appConfig = await this.ctx.model.AppConfig.findByPk(id);
    if (!appConfig) {
      this.ctx.status = 404;
      return;
    }
    return appConfig;
  }

  async create(appConfig) {
    return this.ctx.model.AppConfig.create(appConfig);
  }

  async update({ id, updates }) {
    const appConfig = await this.ctx.model.AppConfig.findByPk(id);
    if (!appConfig) {
      this.ctx.status = 404;
      return;
    }
    return appConfig.update(updates);
  }

  async del(id) {
    const appConfig = await this.ctx.model.AppConfig.findByPk(id);
    if (!appConfig) {
      this.ctx.status = 404;
      return;
    }
    return appConfig.destroy();
  }

  async delBranchByAppId(id) {
    return await this.ctx.model.AppConfig.destroy({ where: { appId: id } });
  }
}

module.exports = AppConfig;
