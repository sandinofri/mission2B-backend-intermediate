import { dbConnection } from "../config/db.js";

export const register = async (fullname, username, password, email,verifyToken) => {
  const [result] = await dbConnection.query(
    "INSERT INTO users (fullname ,username,password,email,verifyToken) VALUES (?,?,?,?,?)",
    [fullname, username, password, email,verifyToken]
  );
  return result;
};

export const getUserByEmail = async (email) => {
  const [result] = await dbConnection.query(
    "SELECT * FROM users WHERE email=?",
    [email]
  );
  return result[0];
};
