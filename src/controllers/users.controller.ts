// src/controllers/users.controller.ts
import prisma from "../conectionsPrisma/prisma";

export async function getAllUsers() {
  return prisma.users.findMany();
}
