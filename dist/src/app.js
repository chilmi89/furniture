"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("./conectionsPrisma/prisma"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/api", (req, res) => {
    res.json({ status: "ok" });
});
app.get("/api/users", async (req, res) => {
    try {
        const users = await prisma_1.default.users.findMany();
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" });
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map