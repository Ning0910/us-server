'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

// 服务类入口，用于封装具体的数据库访问
class BranchCommitLog extends Service {
  async list() {
    const BranchCommitLogs = await this.ctx.model.BranchCommitLog.findAll();
    return BranchCommitLogs;
  }

  async find(id) {
    const BranchCommitLog = await this.ctx.model.BranchCommitLog.findByPk(id);
    if (!BranchCommitLog) {
      this.ctx.status = 404;
      return;
    }
    return BranchCommitLog;
  }

  async create(BranchCommitLog) {
    return this.ctx.model.BranchCommitLog.create(BranchCommitLog);
  }

  async update({ id, updates }) {
    const BranchCommitLog = await this.ctx.model.BranchCommitLog.findByPk(id);
    if (!BranchCommitLog) {
      this.ctx.status = 404;
      return;
    }
    return BranchCommitLog.update(updates);
  }

  async del(id) {
    const BranchCommitLog = await this.ctx.model.BranchCommitLog.findByPk(id);
    if (!BranchCommitLog) {
      this.ctx.status = 404;
      return;
    }
    return BranchCommitLog.destroy();
  }
  async delByAppId(id) {
    return await this.ctx.model.BranchCommitLog.destroy({
      where: { appId: id },
    });
  }
  async delByAppIdExclude(id) {
    return await this.ctx.model.BranchCommitLog.destroy({
      where: { id: { [Op.ne]: id } },
    });
  }
}

module.exports = BranchCommitLog;
