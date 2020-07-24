const DtoLogin = require("./../../model/security/DtoLogin");
module.exports = class Login {
  constructor() {}

  async auth(params) {
    let username = params.username;
    let password = params.password;
    let dtoLogin = new DtoLogin();
    return await dtoLogin.returnUser(username, password);
  }
};
