'use client';

import { useState } from 'react';
import UserTable from '../../components/Dashboard';
import Modal from '../../components/Modal';

const DashboardPage = () => {
  const [users, setUsers] = useState([
    // Example users
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const openModal = (user = null) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToEdit(null);
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { id: (prevUsers.length + 1).toString(), ...newUser },
    ]);
  };

  const handleEditUser = (editedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
  };

  const handleDeleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
        >
          Add User
        </button>
      </div>

      <UserTable users={users} onEdit={openModal} onDelete={handleDeleteUser} />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={userToEdit ? handleEditUser : handleAddUser}
        userToEdit={userToEdit}
      />
    </div>
  );
};

export default DashboardPage;
