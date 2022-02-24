'use strict';

module.exports = (app) => {
  const { STRING, TEXT } = app.Sequelize;

  const AppInfo = app.model.define('appInfo', {
    id: { type: STRING(64), primaryKey: true },
    appName: STRING(64),
    curBranch: STRING(64),
    curUserConfig: TEXT,
    branchNames: STRING,
  });

  return AppInfo;
};
