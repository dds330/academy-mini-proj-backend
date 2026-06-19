import {Request, Response} from 'express';
import { ExpenseService } from '../services/expenseService.js';
import { ExpenseResponseDto, CreateExpenseRequestDto } from '../dtos/expenseDto.js';

export class ExpenseController {
    constructor(private expenseService: ExpenseService) {}

    async getAll(req: Request, res: Response): Promise<void> {
        const expenses = await this.expenseService.findAll();
        const ExpenseResponseDtos = expenses.map(e => ({
            id: e.id,
            date: e.date,
            description: e.description,
            amount: e.amount,
            user: e.user
        }));
        res.status(200).json(ExpenseResponseDtos);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        if(isNaN(id)) {
            res.status(400).json({ message: "ID must be a number" });
            return;
        }
        const expense = await this.expenseService.findByID(id);

        if (expense) {
            const expenseDto : ExpenseResponseDto = { id: expense.id, date: expense.date, description: expense.description, amount: expense.amount, user: expense.user };
            res.status(200).json(expenseDto);

        } else {
            res.status(404).json({ message: "Expense not found" });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        const body: CreateExpenseRequestDto = req.body;
        if(!body.date || !body.description || !body.amount || !body.user) {
            res.status(400).json({ message: "Date, description, amount, and user are required" });
            return;
        }
        const expense = await this.expenseService.create(body);
        const dto : ExpenseResponseDto = { id: expense.id, date: expense.date, description: expense.description, amount: expense.amount, user: expense.user };
        res.status(201).json(dto);
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        if(isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }
        const {date, description, amount, user} = req.body;
        const expense = await this.expenseService.update(id, {date, description, amount, user});
        if (expense) {
            const expenseDto : ExpenseResponseDto = { id: expense.id, date: expense.date, description: expense.description, amount: expense.amount, user: expense.user };
            res.status(200).json(expenseDto);
        } else {
            res.status(404).json({ message: "Expense not found" });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        if(isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }
        const success = await this.expenseService.delete(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Expense not found" });
        }
    }
}