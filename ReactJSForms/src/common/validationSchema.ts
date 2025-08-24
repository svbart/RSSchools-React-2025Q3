import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z]/, 'Name must start with an uppercase letter'),
    age: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: 'Age must be a positive number',
      }),
    email: z.string().email({
      message: 'Invalid email address',
    }),
    password: z
      .string()
      .min(1, 'Password is required')
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/,
        'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
      ),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
    gender: z
      .enum(['male', 'female', 'other'])
      .refine((val) => ['male', 'female', 'other'].includes(val), {
        message: 'Gender is required',
      }),
    country: z.string().min(1, 'Country is required'),
    terms: z.string().refine((val) => val === 'on', {
      message: 'You must accept the terms',
    }),
    picture: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => !file || ['image/png', 'image/jpeg'].includes(file.type),
        'Only PNG or JPEG files are allowed'
      )
      .refine(
        (file) => !file || file.size <= 5 * 1024 * 1024,
        'File size must be less than 5MB'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormData = z.infer<typeof formSchema>;
