import express from "express";
import prisma from "./conectionsPrisma/prisma";

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/users", async (req, res) => {
  const users = await prisma.users.findMany();
  res.json(users);
});

export default app;
