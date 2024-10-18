"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Edit } from "lucide-react";

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  image?: string; // Add image field in User interface
}

export default function Component() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [inputValues, setInputValues] = useState<{ username: string; firstName: string; lastName: string; image: File | null }>({
    username: '',
    firstName: '',
    lastName: '',
    image: null,
  });

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Adjusted to API endpoint
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
    formData.set(name, value); // Update FormData
  };

  // Handle form submit (Add or Update user)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingId !== null ? "PUT" : "POST"; // Determine method based on editing state
      const response = await fetch(`/api/users${editingId !== null ? `/${editingId}` : ''}`, { // Adjusted to API endpoint
        method,
        body: formData, // Use formData to send multipart form data
      });

      if (!response.ok) {
        throw new Error(`Failed to ${method === "PUT" ? "update" : "add"} user`);
      }

      const userData = await response.json();
      if (editingId !== null) {
        // Update existing user in state
        setUsers((prev) =>
          prev.map((user) => (user.id === editingId ? userData : user))
        );
        setEditingId(null); // Reset editing state
      } else {
        // Add new user to state
        setUsers((prev) => [...prev, userData]);
      }
      resetForm(); // Reset form inputs
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Handle delete user
  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/users/${id}`, { // Adjusted to API endpoint
        method: "DELETE",
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle image input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setInputValues((prev) => ({ ...prev, image: selectedFile }));
      formData.set('image', selectedFile); // Set image to selected file
    } else {
      // Clear image input if no file is selected
      setInputValues((prev) => ({ ...prev, image: null }));
    }
  };

  // Handle edit user
  const handleEdit = (id: number) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setEditingId(id);
      setInputValues({
        username: userToEdit.username,
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        image: null, // Do not set the image here; it's a file input
      });
      formData.set("username", userToEdit.username);
      formData.set("firstName", userToEdit.firstName);
      formData.set("lastName", userToEdit.lastName);
    }
  };

  // Reset form inputs and FormData
  const resetForm = () => {
    setInputValues({ username: '', firstName: '', lastName: '', image: null });
    setFormData(new FormData());
  };

  return (
    <div className="container mx-auto p-4 space-y-8 mt-10">
      <Card className="md:mx-80 ">
        <CardHeader>
          <CardTitle className="flex justify-center">{editingId !== null ? "Edit User" : "Add New User"}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <form onSubmit={handleSubmit} className="space-y-4 w-96 ">
            <div className="grid grid-rows-1 md:grid-rows-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={inputValues.username} // Set value for controlled input
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={inputValues.firstName} // Set value for controlled input
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={inputValues.lastName} // Set value for controlled input
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Profile Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="w-52 ">
                {editingId !== null ? "Update User" : "Add User"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="md:mx-40">
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 &&users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>
                      {user.image ? (
                        <img src={user.image} alt={user.username} width="50" />
                      ) : (
                        "No Image"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(user.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(user.id)}>
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
  );
}
