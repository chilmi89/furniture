import { Request, Response } from "express";
import prisma from "../conectionsPrisma/prisma";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users", details: error instanceof Error ? error.message : "Unknown error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(id) },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user", details: error instanceof Error ? error.message : "Unknown error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await prisma.users.create({
      data: { name, email, password },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user", details: error instanceof Error ? error.message : "Unknown error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, is_active } = req.body;
  try {
    const updatedUser = await prisma.users.update({
      where: { id: Number(id) },
      data: { name, email, password, is_active },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user", details: error instanceof Error ? error.message : "Unknown error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.users.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user", details: error instanceof Error ? error.message : "Unknown error" });
  }
};
