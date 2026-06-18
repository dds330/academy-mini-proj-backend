import { Router } from "express";
import { ExpenseController } from "../controllers/expenseController";
import { ExpenseService } from "../services/expenseService";

const router = Router();
const controller = new ExpenseController(new ExpenseService());

router.get("/",     (req, res) => controller.getAll(req, res));
router.get("/:id",  (req, res) => controller.getById(req, res));
router.post("/",    (req, res) => controller.create(req, res));
router.put("/:id",  (req, res) => controller.update(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;