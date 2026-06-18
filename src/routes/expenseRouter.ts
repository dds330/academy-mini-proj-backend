import express from "express";
const router = express.Router();

// Sample in-memory data store for expenses
let expenses = [
  { "id": 1, 
    "date": "20-10-2025",
    "description": "Academy induction",
    "amount": "100",
    "user": "Dhruvi"
   },
   { "id": 2, 
    "date": "01-09-2025",
    "description": "Client Lunch",
    "amount": "75",
    "user": "Alicia"
   },
   { "id": 3, 
    "date": "31-05-2025",
    "description": "Soccer Viewing",
    "amount": "300",
    "user": "Conrad"
   }
];

router.get("/expenses", (req, res) => {
    res.status(200).json(expenses);
    });

router.get("/expenses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const expense = expenses.find(e => e.id === id);
    if (expense) {
        res.status(200).json(expense);
    } else {
        res.status(404).json({ message: "Expense not found" });
    }
});

router.post("/expenses", (req, res) => {
    const {date, description, amount, user} = req.body;
    const newExpense = {
        "id": 4,
        "date": date,
        "description": description,
        "amount": amount,
        "user": user
    };
    res.status(201).json(newExpense);
});

router.put("/expenses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {date, description, amount, user} = req.body;
    const updated = {
        "id": id,
        "date": date,
        "description": description,
        "amount": amount,
        "user": user
    };
    res.status(200).json(updated);
});

router.delete("/expenses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.status(204).send();
});

export default router;