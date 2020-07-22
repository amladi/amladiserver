const { Sequelize } = require("sequelize");
const configEnv = require("../../env/settingEnv.json");

module.exports = class DataConnection {
  constructor() {
    let env = configEnv.db;
    let database = "amladidb";
    this.sequelize = new Sequelize(database, env.user, env.password, {
      host: env.host,
      dialect: "postgres",
    });
  }

  async getSequelize() {
    return this.sequelize;
  }
};
