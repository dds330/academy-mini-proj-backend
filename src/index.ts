
import express from "express";
import expenseRouter from "./routes/expenseRouter.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use("/api", expenseRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Try: http://localhost:${PORT}/api/expenses`);
});