const DataConnection = require("../dataConnection");

module.exports = class dtoUser {
  constructor() {
    this.dataConnection = new DataConnection();
  }

  async getUserInfo(username) {
    let result = {};
    let query = `SELECT 
                  *
                  FROM public.userp
                  WHERE 
                 username = $1`;
    let values = [username];
    try {
      result = await this.dataConnection.executeQuery(query, values);
    } catch (ex) {
      throw Error(`dtoUser:getUserInfo=${ex.message}`);
    }
    return result;
  }

  async updateInfo(newUser) {
    let result = {};
    let query = `UPDATE
                  public.userp 
              SET
                  email = $1 , password = $2 , 
                  username = $3 , name = $4 , 
                  lastname = $5 , organizationurl = $6 , 
                  organizationname = $7 , organizationemail = $8
              WHERE
                  id = $9`;

    let values = [
      newUser.email,
      newUser.password,
      newUser.username,
      newUser.name,
      newUser.lastname,
      newUser.organizationurl,
      newUser.organizationname,
      newUser.organizationemail,
      newUser.id
    ];
    try {
      result = await this.dataConnection.executeQuery(query, values);
    } catch (ex) {
      throw Error(`dtoUser:updateInfo=${ex.message}`);
    }
    return result;
  }

  async new(newUser) {
    let result = {};
    let query = `
    INSERT INTO public.userp(
      email, password, username, name, lastname, organizationurl, organizationname, organizationemail, joindate, isactive)
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, NOW(), TRUE)`;
    let values = [
      newUser.email,
      newUser.password,
      newUser.username,
      newUser.name,
      newUser.lastname,
      newUser.organizationurl,
      newUser.organizationname,
      newUser.organizationemail,
    ];
    try {
      result = await this.dataConnection.executeQuery(query, values);
    } catch (ex) {
      throw Error(`dtoUser:NEW=${ex.message}`);
    }
    return result;
  }

  async checkIfExist(username) {
    let result = {};
    let query = `select 1 from public.userp where username = $1`;
    let values = [username];
    try {
      result = await this.dataConnection.executeQuery(query, values);
    } catch (ex) {
      throw Error(`dtoUser:checkIfExist=${ex.message}`);
    }
    return result;
  }

  async getSettingForgotPassword(username) {
    let result = {};
    let query = `SELECT id, category, datakey, value FROM public.setting where category = 'mailforgot'`;
    try {
      result = await this.dataConnection.executeQuery(query);
    } catch (ex) {
      throw Error(`dtoUser:checkIfExist=${ex.message}`);
    }
    return result;
  }

  async createTableTemp() {
    let result = {};
    let query = `CREATE TABLE TB_TEMP( TIMENOW  DATE)`;
    try {
      result = await this.dataConnection.executeQuery(query);
    } catch (ex) {
      throw Error(`dtoUser:createTableTemp=${ex.message}`);
    }
    return result;
  }

  async insertData() {
    let result = {};
    let query = `INSERT INTO TB_TEMP(TIMENOW) VALUES( NOW() )`;
    try {
      result = await this.dataConnection.executeQuery(query);
    } catch (ex) {
      throw Error(`dtoUser:insertData=${ex.message}`);
    }
    return result;
  }

  async selectTableTemp() {
    let result = {};
    let query = `SELECT TIMENOW FROM TB_TEMP`;
    try {
      result = await this.dataConnection.executeQuery(query);
    } catch (ex) {
      throw Error(`dtoUser:selectTableTemp=${ex.message}`);
    }
    return result;
  }

  async deleteTableTemp() {
    let result = {};
    let query = `DROP TABLE TB_TEMP`;
    try {
      result = await this.dataConnection.executeQuery(query);
    } catch (ex) {
      throw Error(`dtoUser:deleteTableTemp=${ex.message}`);
    }
    return result;
  }
};
