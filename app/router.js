'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.get('/news', controller.news.list);
  // router.post('/login', controller.users.login); //登录并生成Token
  // router.resources('users', '/users', controller.users);
};
