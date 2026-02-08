import serverless from "serverless-http";
import express from "express";
import prisma from "../../src/conectionsPrisma/prisma";

const app = express();

app.get("/api/users", async (req, res) => {
  const users = await prisma.users.findMany();
  res.json(users);
});

export default serverless(app);
