/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1645077786626_7957';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // Mysql
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'usDataBase',
    username: 'root',
    password: '592476819',
    define: {
      // freezeTableName默认值为false，会自动在表名后加s
      freezeTableName: false,
      // timestamps默认值为true，会自动添加create_time和update_time
      timestamps: false,
    },
  };

  // csrf 安全配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 允许访问接口的白名单
    domainWhiteList: ['*'], // ['http://localhost:8080']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH',
  };

  return {
    ...config,
    ...userConfig,
  };
};
