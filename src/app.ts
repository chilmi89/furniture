import express from "express";
import usersRoutes from "./routes/users.routes";

const app = express();

app.use(express.json());

// Health check
app.get("/api", (req, res) => {
  res.json({ status: "ok", message: "FurniBackend API is running" });
});

// Routes
app.use("/api/users", usersRoutes);

export default app;
