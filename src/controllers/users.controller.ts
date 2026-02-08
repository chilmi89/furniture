import { Request, Response } from "express";
import prisma from "../conectionsPrisma/prisma";
import { ApiResponse } from "../utils/apiResponse";
import { createUserSchema, updateUserSchema, userIdSchema } from "../validations/user.validation";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany();
    return ApiResponse.success(res, users, "Users fetched successfully");
  } catch (error) {
    return ApiResponse.error(res, "Failed to fetch users", 500, error instanceof Error ? error.message : "Unknown error");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const validated = userIdSchema.parse({ params: req.params });
    const user = await prisma.users.findUnique({
      where: { id: validated.params.id },
    });

    if (!user) return ApiResponse.error(res, "User not found", 404);
    return ApiResponse.success(res, user, "User fetched successfully");
  } catch (error) {
    return ApiResponse.error(res, "Invalid ID or user not found", 400, error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const validated = createUserSchema.parse({ body: req.body });
    const newUser = await prisma.users.create({
      data: validated.body,
    });
    return ApiResponse.success(res, newUser, "User created successfully", 201);
  } catch (error) {
    return ApiResponse.error(res, "Failed to create user", 400, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const validated = updateUserSchema.parse({ params: req.params, body: req.body });
    const updatedUser = await prisma.users.update({
      where: { id: validated.params.id },
      body: {
        name: validated.body.name,
        email: validated.body.email,
        password: validated.body.password,
        is_active: validated.body.is_active,
      },
    });
    return ApiResponse.success(res, updatedUser, "User updated successfully");
  } catch (error) {
    return ApiResponse.error(res, "Failed to update user", 400, error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const validated = userIdSchema.parse({ params: req.params });
    await prisma.users.delete({
      where: { id: validated.params.id },
    });
    return ApiResponse.success(res, null, "User deleted successfully");
  } catch (error) {
    return ApiResponse.error(res, "Failed to delete user", 400, error);
  }
};
