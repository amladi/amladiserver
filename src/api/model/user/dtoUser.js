const DataConnection = require("../dataConnection");

module.exports = class dtoUser {
  constructor() {
    this.dataConnection = new DataConnection();
  }

  async getUserInfo(username) {
    let result = {};
    let query = `SELECT 
                  *
                  FROM public."user"
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
                  public."user" 
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
    INSERT INTO public."user"(
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
    let query = `select 1 from "user" where username = $1`;
    let values = [username];
    try {
      result = await this.dataConnection.executeQuery(query, values);
    } catch (ex) {
      throw Error(`dtoUser:checkIfExist=${ex.message}`);
    }
    return result;
  }
};
