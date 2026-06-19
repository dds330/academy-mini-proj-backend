import {z} from "zod";

export const CreateExpenseRequestSchema = z.object({
    date: z.coerce.date("Invalid date format"),
    description: z.string().min(1, "Description is required"),
    amount: z.coerce.number().min(0, "Amount must be a positive number"),
    user: z.string().min(1, "User is required")
});

export const IdParamSchema = z.object({
    id: z.coerce.number().min(1, "ID must be a positive number")
});

export type CreateExpenseRequestDto = z.infer<typeof CreateExpenseRequestSchema>;
export type IdParamDto = z.infer<typeof IdParamSchema>;

export interface ExpenseResponseDto {
    id: number;
    date: Date;
    description: string;
    amount: number;
    user: string;
}