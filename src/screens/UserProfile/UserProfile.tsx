import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { fetchUserProfile, updateUserProfile } from "../../utils/api";
import { Loader } from "../../components/Loader/Loader";

export const UserProfile: React.FC = () => {
  const { data: profile, isLoading } = useQuery(
    "userProfile",
    fetchUserProfile
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const updateProfileMutation = useMutation(updateUserProfile, {
    onSuccess: () => {
      // Handle success (e.g., show a success message)
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      <Card className="bg-[#1b1a1a] text-white">
        <CardContent className="p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Name</p>
              <p className="font-semibold">{profile?.name}</p>
            </div>
            <div>
              <p className="text-gray-400">Email</p>
              <p className="font-semibold">{profile?.email}</p>
            </div>
            <div>
              <p className="text-gray-400">Phone</p>
              <p className="font-semibold">{profile?.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1b1a1a] text-white">
        <CardContent className="p-6">
          <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-[#2a2a2a] text-white border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-[#2a2a2a] text-white border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-[#2a2a2a] text-white border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-[#2a2a2a] text-white border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="bg-[#2a2a2a] text-white border-gray-600"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Update Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
