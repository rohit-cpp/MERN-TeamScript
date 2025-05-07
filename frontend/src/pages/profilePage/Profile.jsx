import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  useLoadUserQuery,
  useUpdateProfileMutation,
} from "@/store/api/authApi";
import { useGetMyTeamsQuery } from "@/store/api/teamApi";
import Team from "@/components/shared/Team";
import { toast } from "sonner";

const Profile = () => {
  const {
    data: userData,
    isLoading: loadingUser,
    refetch,
  } = useLoadUserQuery();
  const { data: myTeamsData, isLoading: loadingTeams } = useGetMyTeamsQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [form, setForm] = useState({ name: "", bio: "" });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto") {
      setFile(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (form.name) formData.append("name", form.name);
    if (form.bio) formData.append("bio", form.bio);
    if (file) formData.append("profilePhoto", file);

    try {
      await updateProfile(formData).unwrap();
      refetch();
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  if (loadingUser || loadingTeams)
    return (
      <div className="mt-30 text-cyan-700 text-5xl font-semibold text-center my-10">
        Loading Profile...
      </div>
    );

  const { user } = userData;
  const userTeams = user?.teams || [];
  const fetchedTeams = myTeamsData?.teams || [];

  // Merge and deduplicate by team _id
  const allTeamsMap = new Map();
  [...userTeams, ...fetchedTeams].forEach((team) => {
    if (team && team._id) {
      allTeamsMap.set(team._id, team);
    }
  });
  const uniqueTeams = Array.from(allTeamsMap.values());

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 my-24">
        <h1 className="font-semibold text-2xl text-center md:text-left">
          Profile
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={user?.profile?.profilePhoto} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong> {user?.role?.toUpperCase()}
            </p>
            <p>
              <strong>Bio:</strong> {user?.profile?.bio || "N/A"}
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile below.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="col-span-3"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="bio" className="text-right">
                        Bio
                      </Label>
                      <Input
                        id="bio"
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        className="col-span-3"
                        placeholder="Short bio"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="profilePhoto" className="text-right">
                        Photo
                      </Label>
                      <Input
                        id="profilePhoto"
                        name="profilePhoto"
                        type="file"
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save Changes
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Your Teams</h2>
          {uniqueTeams.length ? (
            <div className="space-y-4">
              {uniqueTeams.map((team) => (
                <Team key={team._id} team={team} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You are not in any team yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
