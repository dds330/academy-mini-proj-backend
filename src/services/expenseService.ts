import { CreateExpenseRequestDto } from "../dtos/expenseDto";
import { Expense } from "../models/expense";
const mockExpenses: Expense[] = [
    { "id": 1, 
    "date": new Date(2025, 9, 20),
    "description": "Academy induction",
    "amount": 100,
    "user": "Dhruvi"
   },
   { "id": 2, 
    "date": new Date(2025, 8, 1),
    "description": "Client Lunch",
    "amount": 75,
    "user": "Alicia"
   },
   { "id": 3, 
    "date": new Date(2025, 4, 31),
    "description": "Soccer Viewing",
    "amount": 300,
    "user": "Conrad"
   }
];

export class ExpenseService {
    async findAll(minAmount?: number): Promise<Expense[]> {
        if (minAmount !== undefined) {
            return mockExpenses.filter(expense => expense.amount >= minAmount);
        } 
        return mockExpenses;
    }

    async findByID(id: number): Promise<Expense | undefined> {
        if(id < mockExpenses.length && id > 0) {
            return mockExpenses.find(e => e.id === id);
        } else {
            return undefined;
        }
    }

    async create(expense: CreateExpenseRequestDto): Promise<Expense> {
        const newExpense = {
            "id": mockExpenses.length + 1,
            "date": expense.date,
            "description": expense.description,
            "amount": expense.amount,
            "user": expense.user
        };
        mockExpenses.push(newExpense);
        return newExpense;
    }

    async update(id: number, expense: CreateExpenseRequestDto): Promise<Expense | undefined> {
        const index = mockExpenses.findIndex(e => e.id === id);
        if(index < mockExpenses.length && index >= 0) {
            const updatedExpense = {
                "id": id,
                "date": expense.date,
                "description": expense.description,
                "amount": expense.amount,
                "user": expense.user
            };
            mockExpenses[index] = updatedExpense;
            return updatedExpense;
        } else {
            return undefined;
        }
    }

    async delete(id: number): Promise<boolean> {
        const index = mockExpenses.findIndex(e => e.id === id);
        if(index < mockExpenses.length && index >= 0) {
            mockExpenses.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }


}