'use client';

import { useState, useEffect } from 'react';
import InputField from './Input';
import Button from './Button';

type User = {
  id?: string;
  name: string;
  email: string;
  role: string;
  profilePhoto?: string;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
  userToEdit?: User; // Optional user to edit
};

const Modal = ({ isOpen, onClose, onSubmit, userToEdit }: ModalProps) => {
  const [name, setName] = useState(userToEdit?.name || '');
  const [email, setEmail] = useState(userToEdit?.email || '');
  const [role, setRole] = useState(userToEdit?.role || '');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setRole(userToEdit.role);
    } else {
      // Reset form for adding new user
      setName('');
      setEmail('');
      setRole('');
    }
  }, [userToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !role) {
      setError('All fields are required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    const newUser = {
      name,
      email,
      role,
      profilePhoto: profilePhoto ? URL.createObjectURL(profilePhoto) : undefined,
    };

    onSubmit(newUser);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      // Disable scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // Clean up when component is unmounted
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm relative">
        {/* Header with title and close button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#102E50]">
            {userToEdit ? 'Edit User' : 'Add User'}
          </h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-600 hover:text-gray-900 cursor-pointer"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <div className="mb-4">
            <label htmlFor="profilePhoto" className="block text-sm text-gray-700">
              Profile Photo
            </label>
            <input
              type="file"
              id="profilePhoto"
              onChange={(e) => setProfilePhoto(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-between">
            <Button type="submit" text={userToEdit ? 'Save Changes' : 'Add User'} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
