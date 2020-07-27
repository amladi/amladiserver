const DataConnection = require("../dataConnection");

module.exports = class dtoUser {
  constructor() {
    this.dataConnection = new DataConnection();
  }

  async getUserInfo(username) {
    let result = {};
    let query = `SELECT 
                  *
                  FROM public."user"
                  WHERE 
                 username ='${username}'`;
    try {
      result = await this.dataConnection.client.query(query);
      this.dataConnection.client.end();
    } catch (ex) {
      throw Error(`dtoUser:getUserInfo=${ex.message}`);
    }
    return result;
  }
};
