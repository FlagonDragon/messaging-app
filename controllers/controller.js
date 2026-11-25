import db from '../db/queries.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function homeGet(req, res) {

  res.send('Homepage');

};

async function signUpPost(req, res) {

  const { username, password } = req.body;

  console.log('body: ');

  console.log(req.body);

  console.log(username, password);
  
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.createUser(username, hashedPassword);

  res.status(200).json({ message: "User created succesfully!" });

};

async function logInPost(req, res) {

  let { username, password } = req.body;

  const user = await db.getUser(username);

  if (user != null && username === user.username) {

    const match = await bcrypt.compare(password, user.password);

    if (match) { 

      const opts = {}
      opts.expiresIn = 120; 
      const secret = process.env.SECRET
      const token = jwt.sign({ username }, secret, opts);

      return res.status(200).json({
        message: "Auth Passed",
        username,
        token
      });

    }
  }
  
  return res.status(401).json({ message: "Auth Failed" });

};

async function protectedGet(req, res) {

  return res.status(200).json({ 
    message: "Accessed protected route succesfully!" 
  });

};

async function chatPost(req, res) {

  const { userId1, userId2 } = req.body;

  console.log('body: ');

  console.log(req.body);
  
  await db.createChat(userId1, userId2);

  res.status(200).json({ message: "Chat created succesfully!" });

};

async function messagePost(req, res) {

  const { content, username, chatId } = req.body;

  console.log('body: ');

  console.log(req.body);
  
  await db.createMessage(content, username, chatId);

  res.status(200).json({ message: "Message created succesfully!" });

};

export default {
  homeGet,
  signUpPost,
  logInPost,
  protectedGet,
  chatPost,
  messagePost
}