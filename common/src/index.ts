import z from "zod";
export const signUpInput = z.object({
    userName: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});
export const signinInput = z.object({
    userName: z.string().email(),
    password: z.string().min(6),
});
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
});

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number(),
});

export type SignUpInput = z.infer<typeof signUpInput>;

export type SignInInput = z.infer<typeof signinInput>;
export type CreateBlogSchema = z.infer<typeof createBlogInput>;

export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
