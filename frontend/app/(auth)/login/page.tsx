'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../../../components/Input';
import Button from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      localStorage.setItem('token', json.token);
      router.push('/dashboard');
    } catch (err: unknown) {
      // show top-level error
      if (err instanceof Error) {
        alert(err.message || 'Login failed');
      } else {
        alert('Login failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Login</h2>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField {...field} type="email" placeholder="Email" />
          )}
        />
        {errors.email && <ErrorMessage message={errors.email.message!} />}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField {...field} type="password" placeholder="Password" />
          )}
        />
        {errors.password && <ErrorMessage message={errors.password.message!} />}

        <Button type="submit" text={isSubmitting ? 'Logging in…' : 'Login'} />

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
