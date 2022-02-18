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
  // router.get('/news', controller.news.list);
  // router.post('/login', controller.users.login); //登录并生成Token
  router.resources('appInfos', '/appInfos', controller.appInfos);
  router.resources('appConfigs', '/appConfigs', controller.appConfigs);
  router.get(
    '/appConfigs/branchNames/:appId',
    controller.appConfigs.getBranchNamesByAppId
  );
  router.delete(
    '/appConfigs/deleteAppBranch/:appId',
    controller.appConfigs.destroyBranchByAppId
  );
};
