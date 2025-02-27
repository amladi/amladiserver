const DtoUser = require("../../model/user/dtoUser");
const email = require("./../../tool/email");

module.exports = class user {

  constructor() {
    this.dtoUser = new DtoUser();
  }

  async getUserInfo(params) {
    let username = params.username;
    let user = await this.dtoUser.getUserInfo(username);
    if (user.rows.length === 1) {
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
    // check if the user is avalible, if not then end process.
    if (!(await this.checkAvalible(params))) {
      return {
        userAvalible: false,
      };
    }
    await this.dtoUser.new(newUser);
    let user = await this.dtoUser.getUserInfo(params.username);
    if (user.rows.length === 1) {
      return user.rows[0];
    } else {
      return {};
    }
  }

  /**
   * check if the username was added yet on db
   * @param {body} params 
   */
  async checkAvalible(params) {
    let username = params.username;
    let result = await this.dtoUser.checkIfExist(username);
    return result.rows.length === 0;
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
      host: result.rows.find((x) => x.datakey === "host").value,
      port: result.rows.find((x) => x.datakey === "port").value,
    };

    let emailsender = new email();
    emailsender.send(emailSetting, userInfo);
  }

  async testTable() {
    await this.dtoUser.createTableTemp();
    await this.dtoUser.insertData();
    let result = await this.dtoUser.selectTableTemp();
    this.dtoUser.deleteTableTemp();
    if (result.rows.length === 1) {
      return result.rows[0];
    } else {
      return {};
    }
  }

  async getAllUsers() {
    return this.dtoUser.getUsers();
  }
};
