import express from "express";
import prisma from "./conectionsPrisma/prisma";

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" });
  }
});

export default app;
