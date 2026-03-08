import express from "express";
import taskRoutes from "./routes/task.routes.mjs";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Task Manager API is running and test endpoint is working");
});

app.use("/api/v1/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

