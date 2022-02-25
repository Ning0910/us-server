'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  // 创建表
  app.beforeStart(async () => {
    await app.model.sync({ alter: true });
  });
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.resources('appInfos', '/appInfos', controller.appInfos);
  router.resources(
    'appBranchInfos',
    '/appBranchInfos',
    controller.appBranchInfos
  );
  router.resources(
    'branchCommitLogs',
    '/branchCommitLogs',
    controller.branchCommitLogs
  );
  router.delete(
    '/appBranchInfos/deleteByAppId/:appId',
    controller.appBranchInfos.destroyBranchByAppId
  );

  router.delete(
    '/appBranchInfos/deleteByIdAndName/:appId/:branchName',
    controller.appBranchInfos.destroyBranchByName
  );

  router.get(
    '/appBranchInfos/byName/:appId/:branchName',
    controller.appBranchInfos.getByName
  );
  router.get(
    '/appBranchInfos/byVersion/:versionId',
    controller.appBranchInfos.getByVersion
  );

  router.delete(
    '/branchCommitLogs/deleteByAppId/:appId',
    controller.branchCommitLogs.destroyBranchByAppId
  );
};
