import { Router } from "express";
import { ExpenseController } from "../controllers/expenseController";
import { ExpenseService } from "../services/expenseService";
import { validateBody, validateParams, validateQuery} from "../middleware/validate";
import { IdParamSchema, CreateExpenseRequestSchema, ExpenseQuerySchema} from "../dtos/expenseDto";

const router = Router();
const controller = new ExpenseController(new ExpenseService());

router.get("/", validateQuery(ExpenseQuerySchema), (req, res) => controller.getAll(req, res));
router.get("/:id", validateParams(IdParamSchema), (req, res) => controller.getById(req, res));
router.post("/", validateBody(CreateExpenseRequestSchema), (req, res) => controller.create(req, res));
router.put("/:id", validateParams(IdParamSchema), validateBody(CreateExpenseRequestSchema), (req, res) => controller.update(req, res));
router.delete("/:id", validateParams(IdParamSchema), (req, res) => controller.delete(req, res));

export default router;