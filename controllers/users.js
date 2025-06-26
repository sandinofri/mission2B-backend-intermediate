import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { register, getUserByEmail } from "../models/users.js";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "../utils/mailer.js";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;
const verifyToken = uuidv4();

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
    await register(fullname, username, hashedPassword, email, verifyToken);
    await sendVerificationEmail(email, verifyToken);
    return res.status(201).json({
      message: "success register user,cek your email to verify",
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
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  const { token } = req.query;

  const [users] = await db.query('SELECT * FROM users WHERE verify_token = ?', [token]);

  if (users.length === 0) {
    return res.status(400).json({ message: 'Token tidak valid.' });
  }

  await db.query('UPDATE users SET is_verified = 1, verify_token = NULL WHERE verify_token = ?', [token]);

  res.json({ message: 'Akun berhasil diverifikasi!' });
};

