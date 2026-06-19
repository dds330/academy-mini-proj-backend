import {describe, it, expect, beforeEach, vi} from 'vitest';
import { ExpenseController } from '../../src/controllers/expenseController.js';
import { ExpenseService } from '../../src/services/expenseService.js';
import { Request, Response } from 'express';

describe("ExpenseController", () => {
    let controller: ExpenseController;
    const mockService = {
    findAll: vi.fn(),
    findByID: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
} as unknown as ExpenseService;

    const mockReq = {
        params: {},
        query: {},
        body: {}
    } as unknown as Request;
    
    const mockRes = {
        locals: {validatedQuery: {}},
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
        send: vi.fn()
    } as unknown as Response;

    beforeEach(() => {
        controller = new ExpenseController(mockService);
    });

    //should get 200 with the expenses array
    it("should get all expenses", async () => {
        const expense = [{
            id: 1,
            date: new Date(),
            description: "Test Expense",
            amount: 100,
            user: "Test User"
        }];
        
        mockService.findAll = vi.fn().mockResolvedValue(expense);
        await controller.getAll(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(expense);
    });
});