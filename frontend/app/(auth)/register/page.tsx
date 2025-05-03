// app/(auth)/register/page.tsx
'use client';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import InputField from '../../../components/Input';
import Button from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';

// 1️⃣ Define Zod schema
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.string().min(1, 'Role is required'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', role: '' },
  });

  // 2️⃣ Submission handler
  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message || 'Registration failed');
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Register</h2>

        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputField {...field} type="text" placeholder="Name" />
          )}
        />
        {errors.name && <ErrorMessage message={errors.name.message!} />}

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField {...field} type="email" placeholder="Email" />
          )}
        />
        {errors.email && <ErrorMessage message={errors.email.message!} />}

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField {...field} type="password" placeholder="Password" />
          )}
        />
        {errors.password && <ErrorMessage message={errors.password.message!} />}

        {/* Role */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          )}
        />
        {errors.role && <ErrorMessage message={errors.role.message!} />}

        {/* Submit */}
        <Button
          type="submit"
          text={isSubmitting ? 'Registering…' : 'Register'}
        />

        <p className="text-sm mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
