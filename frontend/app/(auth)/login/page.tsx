'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

import InputField from '../../../components/Input';
import Button from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';

import { login } from '@/redux/authThunk';
import type { AppDispatch, RootState } from '@/redux/store';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

type DecodedToken = {
  role: string;
  [key: string]: unknown;
};

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const token = useSelector((state: RootState) => state.auth.token);
  const error = useSelector((state: RootState) => state.auth.error);
  const loading = useSelector((state: RootState) => state.auth.loading);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.role === 'admin') {
          router.push('/dashboard');
        } else {
          router.push('/user');
        }
      } catch (err) {
        console.error('Invalid token:', err);
      }
    } else {
      setCheckingAuth(false);
    }
  }, [token, router]);

  const onSubmit = (data: LoginForm) => {
    dispatch(login(data))
      .unwrap()
      .then((resToken) => {
        const decoded: DecodedToken = jwtDecode(resToken);
        if (decoded.role === 'admin') {
          router.push('/dashboard');
        } else {
          router.push('/user');
        }
      })
      .catch(() => {
        // Error is already handled via Redux
      });
  };

  return checkingAuth ? (
    <div className="h-screen flex items-center justify-center">Checking authentication...</div>
  ) : (
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

        {error && <ErrorMessage message={error} />}

        <Button type="submit" text={loading ? 'Logging in…' : 'Login'} />

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
