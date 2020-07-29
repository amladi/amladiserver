const configEnv = require("../../env/settingEnv.json");
const { Client } = require("pg");

module.exports = class DataConnection {
  constructor() {
    let env = configEnv.db;
    let database = configEnv.database;
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
  
  async executeQuery (text, values){
    try {
      let res = await this.client.query(text, values)
      return res;
    } catch (err) {
      console.log(err.stack)
      throw Error(`DataConnection:executeQuery=${err.stack}`);
    }
  }
};
