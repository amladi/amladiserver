const DtoUser = require("../../model/user/dtoUser");
const email = require ("./../../tool/email");

module.exports = class user {
  constructor() {
    this.dtoUser = new DtoUser();
  }

  async getUserInfo(params) {
    let username = params.username;
    let user = await this.dtoUser.getUserInfo(username);
    if (user.rowCount === 1) {
      return user.rows[0];
    } else {
      return {};
    }
  }

  async updateProfile(params) {
    let newUser = {
      id: params.id,
      email: params.email,
      password: params.password,
      name: params.name,
      lastname: params.lastname,
      username: params.username,
      organizationurl: params.organizationurl,
      organizationname: params.organizationname,
      organizationemail: params.organizationemail,
    };
    await this.dtoUser.updateInfo(newUser);
  }

  async new(params) {
    let newUser = {
      email: params.email,
      password: params.password,
      name: params.name,
      lastname: params.lastname,
      username: params.username,
      organizationurl: params.organizationurl,
      organizationname: params.organizationname,
      organizationemail: params.organizationemail,
    };
    if (!(await this.checkAvalible(params))) {
      return {
        userAvalible: false,
      };
    }
    await this.dtoUser.new(newUser);
    let user = await this.dtoUser.getUserInfo(params.username);
    if (user.rowCount === 1) {
      return user.rows[0];
    } else {
      return {};
    }
  }
  async checkAvalible(params) {
    let username = params.username;
    let result = await this.dtoUser.checkIfExist(username);
    if (result.rowCount !== 1) {
      return true;
    } else {
      return false;
    }
  }
  async forgotpassword(params) {
    if ((await this.checkAvalible(params))) {
      return {
        userAvalible: false,
      };
    }
    let username = params.username;
    let userInfo = await this.getUserInfo(params);
    let result = await this.dtoUser.getSettingForgotPassword(username);
    let emailSetting = {
      from: result.rows.find((x) => x.datakey === "from").value,
      subject: result.rows.find((x) => x.datakey === "subject").value,
      template: result.rows.find((x) => x.datakey === "template").value,
      userAuth: result.rows.find((x) => x.datakey === "userAuth").value,
      passAuth: result.rows.find((x) => x.datakey === "passAuth").value,
    };

    let emailsender = new email();
    emailsender.send(emailSetting, userInfo);
  }
};
