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
    '/appBranchInfos/byVersion/:appId/:branchName/:version',
    controller.appBranchInfos.getByVersion
  );
};
