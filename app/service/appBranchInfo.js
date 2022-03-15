'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

// 服务类入口，用于封装具体的数据库访问
class AppBranchInfo extends Service {
  async list() {
    const appBranchInfos = await this.ctx.model.AppBranchInfo.findAll();
    return appBranchInfos;
  }

  async findByAppIdAndBranchName(id, name) {
    const AppBranchInfo = await this.ctx.model.AppBranchInfo.findOne({
      where: { appId: id, branchName: name },
      order: [['versionId', 'desc']],
      limit: 1,
    });
    if (!AppBranchInfo) {
      this.ctx.status = 404;
      return;
    }
    return AppBranchInfo;
  }

  async findByVersion(versionId) {
    const AppBranchInfo = await this.ctx.model.AppBranchInfo.findOne({
      where: { versionId },
    });
    if (!AppBranchInfo) {
      this.ctx.status = 404;
      return;
    }
    return AppBranchInfo;
  }

  async find(id) {
    const AppBranchInfo = await this.ctx.model.AppBranchInfo.findByPk(id);
    if (!AppBranchInfo) {
      this.ctx.status = 404;
      return;
    }
    return AppBranchInfo;
  }

  async create(AppBranchInfo) {
    return this.ctx.model.AppBranchInfo.create(AppBranchInfo);
  }

  async update({ id, updates }) {
    const AppBranchInfo = await this.ctx.model.AppBranchInfo.findByPk(id);
    if (!AppBranchInfo) {
      this.ctx.status = 404;
      return;
    }
    return AppBranchInfo.update(updates);
  }

  async del(id) {
    const AppBranchInfo = await this.ctx.model.AppBranchInfo.findByPk(id);
    if (!AppBranchInfo) {
      this.ctx.status = 404;
      return;
    }
    return AppBranchInfo.destroy();
  }

  async delBranchByAppId(id) {
    return await this.ctx.model.AppBranchInfo.destroy({ where: { appId: id } });
  }
  async delBranchByIdAndName(appId, branchName) {
    return await this.ctx.model.AppBranchInfo.destroy({
      where: { appId, branchName },
    });
  }
  async delBranchExclude(appId, branchName) {
    return await this.ctx.model.AppBranchInfo.destroy({
      where: { appId, branchName: { [Op.ne]: branchName } },
    });
  }
}

module.exports = AppBranchInfo;
