import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be at least 3 characters").max(100),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    }),
});

export const updateUserSchema = z.object({
    params: z.object({
        id: z.string().transform((val) => Number(val)),
    }),
    body: z.object({
        name: z.string().min(3).max(100).optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
        is_active: z.number().int().min(0).max(1).optional(),
    }),
});

export const userIdSchema = z.object({
    params: z.object({
        id: z.string().transform((val) => Number(val)),
    }),
});
