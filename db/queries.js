import { prisma } from "../lib/prisma.js";

async function createUser(username, password) {

  const user = await prisma.user.create({
    data: {
      username: username,
      password: password
    },
  });

  console.log("Created user:", user);
  
}

async function getUser(username) {

  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  return user;
  
}

async function getUsers() {

  const users = await prisma.user.findMany();

  return users;
  
}

async function getChat(chatId) {

  const chat = await prisma.chat.findUnique({
    where: { id: Number(chatId) },
    include: {
      users: true,
    },
  });

  return chat;
  
}

async function createChat(userId1, userId2) {

  const chat = await prisma.chat.create({
    data: {
      users: {
        connect: [{ id: Number(userId1) }, { id: Number(userId2) }], 
      }, 
    },
    include: {
      users: true,
    },
  });

  console.log("Created chat:", chat);
  
}

async function getUserChats(userId) {

  // const user = await prisma.user.findUnique({
  //   where: { id: Number(userId) },
  //   include: {
  //     chats: true,
  //   },
  // });

  // return user.chats;

  const chats = await prisma.chat.findMany({
    where: { 
      users: {
        some: {
          id: Number(userId),
        },
      },
    },
    include: {
      users: true,
    },
  });

  return chats;
  
}

async function createMessage(content, username, chatId) {

  const message = await prisma.message.create({
    data: {
      content: content,
      username: username,
      chatId: Number(chatId)
    },
  });

  console.log("Created message:", message);
  
}

export default {
  createUser,
  getUser,
  getUsers,
  getChat,
  createChat,
  getUserChats,
  createMessage
}