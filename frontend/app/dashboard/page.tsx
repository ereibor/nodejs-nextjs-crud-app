"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUsers,
  addUser,
  deleteUser,
  updateUser,
} from "../../redux/userThunk";
import { RootState, AppDispatch } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import UserTable from "../../components/Dashboard";
import Modal from "../../components/Modal";
import useAdminGuard from "../(auth)/hooks/useAdminGuard";

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
}

interface AddUser {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  profilePhoto?: File;
}

interface UpdateUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isChecking, isAuthorized } = useAdminGuard();

  const { users, loading, error, totalPages, hasNextPage, hasPrevPage } =
    useSelector((state: RootState) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const openModal = (user: User | null) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToEdit(null);
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleAddUser = async (user: {
    name: string;
    email: string;
    role: string;
    password: string;
    profilePhoto?: File;
  }) => {
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("role", user.role);
      formData.append("password", user.password);
      if (user.profilePhoto) {
        formData.append("profilePhoto", user.profilePhoto);
      }

      const formDataObject: AddUser = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        role:
          formData.get("role") === "user" || formData.get("role") === "admin"
            ? (formData.get("role") as "user" | "admin")
            : "user",
        password: formData.get("password") as string,
      };

      if (user.profilePhoto) {
        formDataObject.profilePhoto = user.profilePhoto;
      }

      await dispatch(addUser(formDataObject)).unwrap();
      closeModal();
      dispatch(fetchUsers(currentPage));
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = async (user: User) => {
    try {
      const updatedUser: UpdateUser = {
        _id: user._id as string,
        name: user.name,
        email: user.email,
        role:
          user.role === "user" || user.role === "admin" ? user.role : "user",
      };

      await dispatch(updateUser(updatedUser)).unwrap();
      dispatch(fetchUsers(currentPage));
      closeModal();
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  if (isChecking) return <div>Loading</div>;
  if (!isAuthorized) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => openModal(null)}
            className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
          >
            Add User
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      <UserTable users={users} onEdit={openModal} onDelete={handleDeleteUser} />

      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={!hasPrevPage}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={!hasNextPage}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={userToEdit ? handleEditUser : handleAddUser}
        userToEdit={userToEdit || undefined}
      />
    </div>
  );
};

export default DashboardPage;
