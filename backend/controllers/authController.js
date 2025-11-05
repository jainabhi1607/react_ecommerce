import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthModel } from "../models/authModel.js";
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await AuthModel.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(404).json({ error: "Invalid credentials" });

    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    
    const msg = {
      to: 'jainabhi1607@gmail.com',
      from: 'abhidevphp1@gmail.com', // Must be a verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'And easy to do anywhere, even with Node.js',
      html: '<strong>And easy to do anywhere, even with Node.js</strong>',
    };

    sgMail
      .send(msg)
      .then(() => {
      })
      .catch((error) => {
        console.error(error);
      });
    
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
export async function register(req, res) {
  try {
    let { name, email, username, password, phone } = req.body;
    password = await bcrypt.hash(password, 10);

    const dataToAdd = new AuthModel({ name, email, username, password, phone });
    await dataToAdd.save();
    res
      .status(201)
      .json({ message: "Data added successfully", newRecord: dataToAdd });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export function authCheck(req, res) {
  
  if (req.cookies?.authToken) {
    res.status(200).json({ message: "User is authenticated" });
  } else {
    res.status(401).json({ error: "User is not authenticated" });
  }
}
export function logout(req, res) {
  res.cookie("authToken", '', {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 0,
    });
  if (req.cookies?.authToken) {
    res.status(401).json({ error: "User can't logout" });
  } else {
    
    res.status(200).json({ message: "User logout" });
  }
}

export async function fetchUsers(req, res) {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "User is not authenticated" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded._id;

        const users = await AuthModel.find({ userId }).sort({
            createdAt: -1,
        });
        res.json(users);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}
