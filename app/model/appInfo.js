'use strict';

module.exports = (app) => {
  const { STRING } = app.Sequelize;

  const AppInfo = app.model.define('appInfo', {
    id: { type: STRING(64), primaryKey: true },
    appName: STRING(64),
  });

  return AppInfo;
};
