"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Edit, UserPlus, Users } from "lucide-react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../actions/userActions";

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function Component() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<{
    username: string;
    firstName: string;
    lastName: string;
    image: File | null;
  }>({
    username: "",
    firstName: "",
    lastName: "",
    image: null,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data as User[]);
      } catch (error) {
        console.error("Error fetching users:", error);
        setErrorMessage("Failed to fetch users. Please try again.");
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
    formData.set(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let userData: User;
      if (editingId !== null) {
        userData = (await updateUser(editingId, formData)) as User;
      } else {
        userData = (await createUser(formData)) as User;
      }

      if (editingId !== null) {
        setUsers((prev) =>
          prev.map((user) => (user.id === editingId ? userData : user))
        );
        setEditingId(null);
      } else {
        setUsers((prev) => [...prev, userData]);
      }
      resetForm();
      setErrorMessage(null);
    } catch (error) {
      console.error("Error saving user:", error);
      setErrorMessage("Failed to save user. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setErrorMessage(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage("Failed to delete user. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setInputValues((prev) => ({ ...prev, image: selectedFile }));
      formData.set("image", selectedFile);
    } else {
      setInputValues((prev) => ({ ...prev, image: null }));
      formData.delete("image");
    }
  };

  const handleEdit = (id: number) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setEditingId(id);
      setInputValues({
        username: userToEdit.username,
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        image: null,
      });
      formData.set("username", userToEdit.username);
      formData.set("firstName", userToEdit.firstName);
      formData.set("lastName", userToEdit.lastName);
    }
  };

  const resetForm = () => {
    setInputValues({ username: "", firstName: "", lastName: "", image: null });
    setFormData(new FormData());
  };

  return (
    <div className="container mx-auto p-4 space-y-8 mt-10">
      {errorMessage && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md shadow-md"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{errorMessage}</p>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="md:col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-center text-2xl">
              {editingId !== null ? (
                <Edit className="mr-2" />
              ) : (
                <UserPlus className="mr-2" />
              )}
              {editingId !== null ? "Edit User" : "Add New User"}
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    value={inputValues.username}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={inputValues.firstName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={inputValues.lastName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="image"
                    className="text-sm font-medium text-gray-700"
                  >
                    Profile Image
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700
                      hover:file:bg-violet-100"
                  />
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  type="submit"
                  className="w-full md:w-2/3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  {editingId !== null ? "Update User" : "Add User"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-center text-2xl">
              <Users className="mr-2" />
              User List
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Username</TableHead>
                    <TableHead className="text-left">Name</TableHead>
                    <TableHead className="text-center">Image</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length > 0 &&
                    users.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {user.username}
                        </TableCell>
                        <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                        <TableCell className="text-center">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.username}
                              width="40"
                              height="40"
                              className="rounded-full inline-block"
                            />
                          ) : (
                            <span className="text-gray-400">No Image</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(user.id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(user.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
