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
                 username ='${username}'`;
    try {
      result = await this.dataConnection.client.query(query);
      this.dataConnection.client.end();
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
                  email = '${newUser.email}' , password = '${newUser.password}' , 
                  username ='${newUser.username}' , name ='${newUser.name}' , 
                  lastname ='${newUser.lastname}' , organizationurl = '${newUser.organizationurl}' , 
                  organizationname ='${newUser.organizationname}' , organizationemail ='${newUser.organizationemail}' 
              WHERE
                  id = '${newUser.id}'`;
    try {
      result = await this.dataConnection.client.query(query);
      this.dataConnection.client.end();
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
      let values = 
      [newUser.email, newUser.password,
        newUser.username,newUser.name, 
        newUser.lastname, newUser.organizationurl, 
        newUser.organizationname, newUser.organizationemail];
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
