const DataConnection = require("./../DataConnection");

module.exports = class dtoLogin {
  constructor() {
    let dataConnection =  new DataConnection();
    this.sequelize = dataConnection.getSequelize();
  }

  async returnUser(user, pass) {}
};
