import {describe, it, expect, beforeEach, vi} from 'vitest';
import { ExpenseController } from '../../src/controllers/expenseController.js';
import { ExpenseService } from '../../src/services/expenseService.js';
import { Request, Response } from 'express';

describe("ExpenseController", () => {
    const expense = {
        id: 1,
        date: new Date(),
        description: "Test Expense",
        amount: 100,
        user: "Test User"
    };
     
    let controller: ExpenseController;
    beforeEach(() => {
        controller = new ExpenseController(new ExpenseService());
        vi.clearAllMocks();
    });

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
         const expense = {
        id: 1,
        date: new Date(),
        description: "Test Expense",
        amount: 100,
        user: "Test User"
    };
        mockService.findAll = vi.fn().mockResolvedValue([expense]);
        await controller.getAll(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith([expense]);
    });

    //should get 500 when service throws an error
    it("should handle errors in getAll", async () => {
        mockService.findAll = vi.fn().mockRejectedValue(new Error("Test Error"));
        await controller.getAll(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });

    //should get 200 with the expense for valid id
    it("should get expense by ID", async () => {
        mockReq.params.id = "1";
        mockService.findByID = vi.fn().mockResolvedValue(expense);
        await controller.getById(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(expense);
    });

    //should get 404 for non-existent id
    it("should return 404 for non-existent ID", async () => {
        mockReq.params.id = "999";
        mockService.findByID = vi.fn().mockResolvedValue(undefined);
        await controller.getById(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Expense not found" });
    });

    //should get 400 for non-numeric id
    it("should return 400 for non-numeric ID", async () => {
        mockReq.params.id = "abc";
        await controller.getById(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Invalid ID parameter" });
    });

    //should get 500 when service throws an error for getById
    it("should handle errors in getById", async () => {
        mockReq.params.id = "1";
        mockService.findByID = vi.fn().mockRejectedValue(new Error("Test Error"));
        await controller.getById(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });

    //should create a new expense and return 201
    it("should create a new expense", async () => {
        const newExpense = { id: 2, date: new Date(), description: "New Expense", amount: 150, user: "New User" };
        mockReq.body = { date: newExpense.date, description: newExpense.description, amount: newExpense.amount, user: newExpense.user };
        mockService.create = vi.fn().mockResolvedValue(newExpense);
        await controller.create(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(newExpense);
    });

    //should return 500 when service throws an error for create
    it("should handle errors in create", async () => {
        mockReq.body = { date: new Date(), description: "New Expense", amount: 150, user: "New User" };
        mockService.create = vi.fn().mockRejectedValue(new Error("Test Error"));
        await controller.create(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
    
    //should update an existing expense and return 200
    it("should update an existing expense", async () => {
        mockReq.params.id = "1";
        mockReq.body = { date: new Date(), description: "Updated Expense", amount: 200, user: "Updated User" };
        const updatedExpense = { id: 1, ...mockReq.body };
        mockService.update = vi.fn().mockResolvedValue(updatedExpense);
        await controller.update(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(updatedExpense);
    });
    
    //should return 404 when trying to update non-existent expense
    it("should return 404 when updating non-existent expense", async () => {
        mockReq.params.id = "999";
        mockReq.body = { date: new Date(), description: "Updated Expense", amount: 200, user: "Updated User" };
        mockService.update = vi.fn().mockResolvedValue(undefined);
        await controller.update(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Expense not found" });
    });
    
    //should delete an existing expense and return 204
    it("should delete an existing expense", async () => {
        mockReq.params.id = "1";
        mockService.delete = vi.fn().mockResolvedValue(true);
        await controller.delete(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(204);
        expect(mockRes.send).toHaveBeenCalled();
    });

    //should return 404 when trying to delete non-existent expense
    it("should return 404 when deleting non-existent expense", async () => {
        mockReq.params.id = "999";
        mockService.delete = vi.fn().mockResolvedValue(false);
        await controller.delete(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Expense not found" });
    });

});