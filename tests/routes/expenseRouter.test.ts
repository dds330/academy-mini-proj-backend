import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "../../src/app.js";

describe("Expense Router", () => {
    it("should return 200 and an array of expenses for GET /api/expenses", async () => {
        const response = await request(app).get("/api/expenses");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 200 and the correct expense for GET /api/expenses/:id", async () => {
        const response = await request(app).get("/api/expenses/1");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", 1);  
    });
    
    it("should return 404 for GET /api/expenses/:id with non-existent ID", async () => {
        const response = await request(app).get("/api/expenses/999");
        expect(response.status).toBe(404);
    });

    it("should return 400 for GET /api/expenses/:id with non-numeric ID", async () => {
        const response = await request(app).get("/api/expenses/abc");
        expect(response.status).toBe(400);
    });
    
    it("should return 201 and the created expense for POST /api/expenses", async () => {
        const newExpense = {
            date: new Date().toISOString(),
            description: "Test Expense",
            amount: 100,
            user: "Test User"
        };
        const response = await request(app).post("/api/expenses").send(newExpense);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toMatchObject({
            description: "Test Expense",
            amount: 100,
            user: "Test User"
        });
    });

    it("should return 400 for POST /api/expenses with missing fields", async () => {
        const response = await request(app).post("/api/expenses").send({
            description: "Incomplete Expense"
        });
        expect(response.status).toBe(400);
    });

    it("should return 200 and the updated expense for PUT /api/expenses/:id", async () => {
        const updatedExpense = {
            date: new Date().toISOString(),
            description: "Updated Expense",
            amount: 150,
            user: "Updated User"
        };
        const response = await request(app).put("/api/expenses/1").send(updatedExpense);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            id: 1,
            description: "Updated Expense",
            amount: 150,
            user: "Updated User"
        });
    });

    it("should return 204 for DELETE /api/expenses/:id", async () => {
        const response = await request(app).delete("/api/expenses/1");
        expect(response.status).toBe(204);
    });
});