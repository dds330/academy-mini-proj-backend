export class Expense {
    constructor(
        public readonly id: number,
        public readonly date: Date,
        public readonly description: string,
        public readonly amount: number,
        public readonly user: string
    ) {
        if(id <= 0){
            throw new Error("ID must be a positive number");
        }
        if(!date || description.trim() === "" || user.trim() === "") {
            throw new Error("Date, description, and user cannot be empty");
        }
        if(amount <= 0) {
            throw new Error("Amount must be a positive number");
        }
    }
}