'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('abpusers', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(64),
    username: STRING(64),
    phonenumber: STRING(64),
    creationtime: DATE,
    lastmodificationtime: DATE,
  });

  return User;
};
