'use strict';

module.exports = (app) => {
  const { STRING, TEXT, BIGINT, INTEGER } = app.Sequelize;

  const AppConfig = app.model.define('appBranchInfo', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    appId: STRING(64),
    branchName: STRING(64),
    versionId: BIGINT(16),
    commitLog: STRING,
    userConfig: TEXT,
    mergeBranchVer: BIGINT(16),
  });

  return AppConfig;
};
