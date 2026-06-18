import {Request, Response} from 'express';
import { ExpenseService } from '../services/expenseService.js';

export class ExpenseController {
    constructor(private expenseService: ExpenseService) {}

    async getAll(req: Request, res: Response): Promise<any> {
        const expenses = await this.expenseService.findAll();
        res.status(200).json(expenses);
    }

    async getById(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id);
        if(isNaN(id)) {
            res.status(400).json({ message: "ID must be a number" });
            return;
        }
        const expense = await this.expenseService.findByID(id);
        if (expense) {
            res.status(200).json(expense);
        } else {
            res.status(404).json({ message: "Expense not found" });
        }
    }

    async create(req: Request, res: Response): Promise<any> {
        const {date, description, amount, user} = req.body;
        if(!date || !description || !amount || !user) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const newExpense = await this.expenseService.create({date, description, amount, user});
        res.status(201).json(newExpense);
    }

    async update(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id);
        if(isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }
        const {date, description, amount, user} = req.body;
        const expense = await this.expenseService.update(id, {date, description, amount, user});
        if (expense) {
            res.status(200).json(expense);
        } else {
            res.status(404).json({ message: "Expense not found" });
        }
    }

    async delete(req: Request, res: Response): Promise<any> {
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