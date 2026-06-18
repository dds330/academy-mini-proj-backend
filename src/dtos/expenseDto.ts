export interface ExpenseResponseDto{
    id: number;
    date: string;
    description: string;
    amount: number;
    user: string;
}

export interface CreateExpenseRequestDto{
    date: string;
    description: string;
    amount: number;
    user: string;
}