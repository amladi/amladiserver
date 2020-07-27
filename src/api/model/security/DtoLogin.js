const DataConnection = require("./../DataConnection");

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
                  (email ='${user}' or username ='${user}')
                  and password = '${pass}'`;

    try {
      result = await this.dataConnection.client.query(query);
      this.dataConnection.client.end();
    } catch (ex) {
      throw Error(`dtoLogin:returnUser=${ex.message}`);
    }
    return result;
  }
};
