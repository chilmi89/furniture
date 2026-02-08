"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
// src/controllers/users.controller.ts
const prisma_1 = __importDefault(require("../conectionsPrisma/prisma"));
async function getAllUsers() {
    return prisma_1.default.users.findMany();
}
//# sourceMappingURL=users.controller.js.map