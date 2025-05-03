"use client";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type UserTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
};

const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  return (
    <div className="space-y-4">
      {users.length === 0 ? (
        <div className="text-center text-gray-500">No users found.</div>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 border rounded shadow-sm sm:hidden"
          >
            {/* Card-style layout for small screens */}
            <div className="flex justify-between">
              <div>
                <div className="text-sm font-semibold">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
              <div className="space-x-2 text-right">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-600 hover:underline text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-600 hover:underline text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="overflow-x-auto sm:block hidden">
        {/* Table for larger screens */}
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Role</th>

              <th className="p-3 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-sm text-gray-800 border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>

                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
