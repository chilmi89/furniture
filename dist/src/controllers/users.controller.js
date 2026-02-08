"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const prisma_1 = __importDefault(require("../conectionsPrisma/prisma"));
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma_1.default.users.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch users", details: error instanceof Error ? error.message : "Unknown error" });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma_1.default.users.findUnique({
            where: { id: Number(id) },
        });
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch user", details: error instanceof Error ? error.message : "Unknown error" });
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await prisma_1.default.users.create({
            data: { name, email, password },
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create user", details: error instanceof Error ? error.message : "Unknown error" });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, is_active } = req.body;
    try {
        const updatedUser = await prisma_1.default.users.update({
            where: { id: Number(id) },
            data: { name, email, password, is_active },
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update user", details: error instanceof Error ? error.message : "Unknown error" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma_1.default.users.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete user", details: error instanceof Error ? error.message : "Unknown error" });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controller.js.map