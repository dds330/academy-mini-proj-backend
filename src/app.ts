import express from "express";
import expenseRouter from "./routes/expenseRouter.js";

const app = express();

// Middleware
app.use(express.json());
app.use("/api/expenses", expenseRouter);

export { app };