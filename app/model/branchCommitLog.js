'use strict';

module.exports = (app) => {
  const { STRING, TEXT } = app.Sequelize;

  const BranchCommitLog = app.model.define('branchCommitLog', {
    id: { type: STRING(64), primaryKey: true },
    appId: STRING(64),
    branchName: STRING(64),
    commitVersionLog: TEXT,
  });

  return BranchCommitLog;
};
