import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsersQuery } from "@/store/api/authApi";
import { toast } from "sonner";

const AdminUsers = () => {
  const { data, isLoading, isError } = useGetAllUsersQuery();

  // Toast notifications for success and error
  const showToast = (message, type = "success") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleDeleteUser = (userId) => {
    // Delete user logic (e.g., calling an API or dispatching an action)
    // After success or failure, show appropriate toast message
    showToast("User deleted successfully!", "success");
  };

  if (isLoading) {
    return <div className="text-center py-10 text-xl">Loading users...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-xl text-red-500">
        Error loading users.
      </div>
    );
  }

  if (!data?.users) {
    return <div className="text-center py-10 text-xl">No users found.</div>;
  }

  return (
    <div className="px-6 py-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center text-cyan-800 mb-6">
        User Management
      </h1>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.users.map((user) => (
            <TableRow key={user._id} className="hover:bg-gray-100">
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUsers;
