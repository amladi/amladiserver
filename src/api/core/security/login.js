const DtoLogin = require("../../model/security/dtoLogin");
module.exports = class Login {
  constructor() {}

  async auth(params) {
    let username = params.username;
    let password = params.password;
    let dtoLogin = new DtoLogin();
    let user = await dtoLogin.returnUser(username, password);
    if (user.rows.lenght === 1 ){
      return user.rows[0];
    }else {
      return {}
    }
  }
};
