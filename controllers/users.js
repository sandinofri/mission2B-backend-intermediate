import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { register, getUserByEmail } from "../models/users.js";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const registerController = async (req, res) => {
  try {
    const { fullname, username, password, email } = req.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        message: "email has been registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await register(fullname, username, hashedPassword, email);

    return res.status(201).json({
      message: "success register user",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "wrong password",
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      secretKey,
      {
        expiresIn: "1d",
      }
    );
    return res.json({
      message: "login success",
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
