const DtoUser = require("../../model/user/dtoUser");
module.exports = class user {
  constructor() {}

  async getUserInfo(params) {
    let username = params.username;
    let dtoUser = new DtoUser();
    let user = await dtoUser.getUserInfo(username);
    if (user.rowCount === 1) {
      return user.rows[0];
    } else {
      return {};
    }
  }

  async updateProfile(params) {
    let newUser = {
      id : params.id,
      email : params.email,
      password : params.password,
      name : params.name,
      lastname : params.lastname,
      username : params.username,
      organizationurl : params.organizationurl,
      organizationname : params.organizationname,
      organizationemail : params.organizationemail
    }
    let dtoUser = new DtoUser();
    await dtoUser.updateInfo(newUser);
  }
};
