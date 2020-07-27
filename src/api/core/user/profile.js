const DtoUser = require("../../model/user/dtoUser");
module.exports = class user {
  constructor() {}

  async getUserInfo(params) {
    let username = params.username;
    let dtoUser = new DtoUser();
    let user = await dtoUser.getUserInfo(username);
    if (user.rowCount === 1 ){
      return user.rows[0];
    }else {
      return {}
    }
  }
};
