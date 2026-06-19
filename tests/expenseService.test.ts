import {describe, it, expect, beforeEach} from 'vitest';
import { ExpenseService } from '../src/services/expenseService.js';

describe("ExpenseService", () => {
    let service: ExpenseService;

    beforeEach(() => {
        service = new ExpenseService();
    });

    //should return an array
    it("should find all expenses", async () => {
        const expenses = await service.findAll();
        expect(expenses).toBeInstanceOf(Array);
    });

    //should return all seeded expenses
    it("should return all seeded expenses", async () => {
        const expenses = await service.findAll();
        expect(expenses.length).toBe(3);
    });

    //should return correct expense for valid id
    it("should find expense by ID", async () => {
        const expense = await service.findByID(1);
        expect(expense).toBeDefined();
        expect(expense?.id).toBe(1);
    });

    //should return undefined for invalid id
    it("should return undefined for non-existent ID", async () => {
        const expense = await service.findByID(999);
        expect(expense).toBeUndefined();
    });

    //should return a new expense with a generated id
    it("should create a new expense", async () => {
        const newExpense = await service.create({
            date: new Date(),
            description: "Test Expense",
            amount: 100,
            user: "Test User"
        });
        expect(newExpense).toBeDefined();
        expect(newExpense.id).toBeGreaterThan(0);
        expect(newExpense.description).toBe("Test Expense");
    });

    //new expense appears in findAll
    it("newly created expense should appear in findAll", async () => {
        const newExpense = await service.create({
            date: new Date(),
            description: "Another Test Expense",
            amount: 150,
            user: "Another Test User"
        });
        const expenses = await service.findAll();
        expect(expenses).toContainEqual(newExpense);
    });

    //should update an existing expense
    it("should update an existing expense", async () => {
        const updatedExpense = await service.update(1, {
            date: new Date(),
            description: "Updated Expense",
            amount: 200,
            user: "Updated User"
        });
        expect(updatedExpense).toBeDefined();
        expect(updatedExpense?.description).toBe("Updated Expense");
        expect(updatedExpense?.amount).toBe(200);
        expect(updatedExpense?.user).toBe("Updated User");
    });

    //should return undefined when ID does not exist for update
    it("should return undefined when updating non-existent ID", async () => {
        const updatedExpense = await service.update(999, {
            date: new Date(),
            description: "Non-existent Expense",
            amount: 50,
            user: "No User"
        });
        expect(updatedExpense).toBeUndefined();
    });

    //should return true when deleting existing expense 
    it("should delete an existing expense", async () => {
        const success = await service.delete(1);
        expect(success).toBe(true);
        const expense = await service.findByID(1);
        expect(expense).toBeUndefined();
    });

    //should return false when id does not exist for delete
    it("should return false when deleting non-existent ID", async () => {
        const success = await service.delete(999);
        expect(success).toBe(false);
    });
});
