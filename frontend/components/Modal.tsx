'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from './Input';
import Button from './Button';
import ErrorMessage from './ErrorMessage';

// Zod schema
const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email').min(1, 'Email is required'),
  role: z.string().min(1, 'Role is required'),
  profilePhoto: z
    .instanceof(File)
    .optional(),
});

type User = z.infer<typeof userSchema>;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
  userToEdit?: User;
};

const Modal = ({ isOpen, onClose, onSubmit, userToEdit }: ModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: userToEdit || {
      name: '',
      email: '',
      role: '',
      profilePhoto: undefined,
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (userToEdit) {
      setValue('name', userToEdit.name);
      setValue('email', userToEdit.email);
      setValue('role', userToEdit.role);
      setValue('profilePhoto', userToEdit.profilePhoto as File | undefined);
    }
  }, [userToEdit, setValue]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#102E50]">
            {userToEdit ? 'Edit User' : 'Add User'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900" aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          {/* Role */}
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <InputField {...field} type="text" placeholder="Role" />
            )}
          />
          {errors.role && <ErrorMessage message={errors.role.message!} />}

          {/* Profile Photo */}
          <div className="mb-4">
            <label htmlFor="profilePhoto" className="block text-sm text-gray-700">
              Profile Photo
            </label>
            <Controller
              name="profilePhoto"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  id="profilePhoto"
                  onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                  className="w-full p-2 border rounded"
                />
              )}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-between">
            <Button
              type="submit"
              text={userToEdit ? 'Save Changes' : 'Add User'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
