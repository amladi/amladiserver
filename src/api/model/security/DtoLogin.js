const DataConnection = require("../dataConnection");

module.exports = class dtoLogin {
  constructor() {
    this.dataConnection = new DataConnection();
  }

  async returnUser(user, pass) {
    let result = {};
    let query = `SELECT 
                  id, 
                  email, 
                  username, 
                  name, 
                  lastname
                  FROM public."user"
                  WHERE 
                  (email = $1 or username = $1)
                  and password = $2`;
    let values = [user, pass];

    try {
      result = await this.dataConnection.executeQuery(query, values);
    } catch (ex) {
      throw Error(`dtoLogin:returnUser=${ex.message}`);
    }
    return result;
  }
};
