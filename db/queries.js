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
  createChat,
  createMessage
}