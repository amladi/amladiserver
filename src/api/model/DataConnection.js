const configEnv = require("../../env/settingEnv.json");
const { Client } = require("pg");

module.exports = class DataConnection {
  constructor() {
    let env = configEnv.db;
    let database = "amladidb";
    let _client = new Client({
      user: env.user,
      host: env.host,
      database: database,
      password: env.password,
      port: env.port,
    });
    try{
      _client.connect();
      this.client = _client;
    }catch(ex){
      throw Error(`Err on connect to db: ${ex.message}`);
    }
  }
};
