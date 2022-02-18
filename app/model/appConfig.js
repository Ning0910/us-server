'use strict';

module.exports = (app) => {
  const { STRING, TEXT, BIGINT } = app.Sequelize;

  const AppConfig = app.model.define('appConfig', {
    id: { type: STRING(64), primaryKey: true },
    appId: STRING(64),
    branchName: STRING(64),
    versionId: BIGINT(16),
    userConfig: TEXT,
  });

  return AppConfig;
};
