import { CreateExpenseRequestDto } from "../dtos/expenseDto";
import { Expense } from "../models/expense";
const mockExpenses: Expense[] = [
    { "id": 1, 
    "date": "20-10-2025",
    "description": "Academy induction",
    "amount": 100,
    "user": "Dhruvi"
   },
   { "id": 2, 
    "date": "01-09-2025",
    "description": "Client Lunch",
    "amount": 75,
    "user": "Alicia"
   },
   { "id": 3, 
    "date": "31-05-2025",
    "description": "Soccer Viewing",
    "amount": 300,
    "user": "Conrad"
   }
];

export class ExpenseService {
    async findAll(): Promise<Expense[]> {
        return mockExpenses;
    }

    async findByID(id: number): Promise<Expense | undefined> {
        if(id < mockExpenses.length && id > 0) {
            return mockExpenses[id - 1];
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