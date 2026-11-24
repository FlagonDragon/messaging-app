import { prisma } from "../lib/prisma.js";

async function createUser(username, password) {

  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
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

export default {
    createUser,
    getUser,
    getUsers
}