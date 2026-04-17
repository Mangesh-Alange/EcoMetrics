"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Save, Edit2, X } from "lucide-react";
import { motion } from "framer-motion";

interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  bio?: string;
}

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (user) {
      fetchProfile(user);
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchProfile = async (clerkUser: any) => {
    if (!clerkUser?.id) return;
    
    try {
      const res = await fetch(`/api/user/${clerkUser.id}`);
      if (res.ok) {
        const data = await res.json();
        const mergedProfile = {
          ...data.user,
          // Use Clerk data if database doesn't have names
          firstName: data.user.firstName || clerkUser.firstName || "",
          lastName: data.user.lastName || clerkUser.lastName || "",
          email: data.user.email || clerkUser.primaryEmailAddress?.emailAddress || "",
        };
        setProfile(mergedProfile);
        setFormData(mergedProfile);
      } else {
        const newProfile: UserProfile = {
          id: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress || "",
          firstName: clerkUser.firstName || "",
          lastName: clerkUser.lastName || "",
        };
        setProfile(newProfile);
        setFormData(newProfile);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      const tempProfile: UserProfile = {
        id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
      };
      setProfile(tempProfile);
      setFormData(tempProfile);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleSave = async () => {
    if (!formData || !user?.id) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/user/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setProfile(data.user);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-secondary">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>
          <Button
            onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
            className="rounded-full"
          >
            {isEditing ? (
              <>
                <X className="mr-2 h-4 w-4" /> Cancel
              </>
            ) : (
              <>
                <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
              </>
            )}
          </Button>
        </div>

        <Card className="border-none shadow-lg rounded-3xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center md:col-span-1">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={`${formData?.firstName} ${formData?.lastName}`}
                    className="w-24 h-24 rounded-full mb-4 border-4 border-primary/20"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl mb-4 font-bold text-primary">
                    {formData?.firstName?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <h2 className="text-xl font-bold text-secondary">
                  {formData?.firstName || user?.firstName || "User"} {formData?.lastName || user?.lastName || ""}
                </h2>
                <p className="text-muted-foreground text-sm">{profile?.email}</p>
              </div>

              {/* Basic Info */}
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-secondary">
                      First Name
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData?.firstName || ""}
                      onChange={handleChange}
                      disabled={true}
                      className="mt-2 rounded-xl bg-muted cursor-not-allowed text-secondary font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-secondary">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData?.lastName || ""}
                      onChange={handleChange}
                      disabled={true}
                      className="mt-2 rounded-xl bg-muted cursor-not-allowed text-secondary font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-secondary flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Phone
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData?.phone || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                      className="mt-2 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-secondary flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email
                    </label>
                    <Input
                      type="email"
                      value={profile?.email}
                      disabled
                      className="mt-2 rounded-xl bg-muted cursor-not-allowed text-secondary font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-8" />

            {/* Address Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-secondary">Address</label>
                  <Input
                    type="text"
                    name="address"
                    value={formData?.address || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your address"
                    className="mt-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-secondary">City</label>
                  <Input
                    type="text"
                    name="city"
                    value={formData?.city || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your city"
                    className="mt-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-secondary">State</label>
                  <Input
                    type="text"
                    name="state"
                    value={formData?.state || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your state"
                    className="mt-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-secondary">Pincode</label>
                  <Input
                    type="text"
                    name="pincode"
                    value={formData?.pincode || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your pincode"
                    className="mt-2 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <label className="text-sm font-semibold text-secondary">Bio</label>
              <Textarea
                name="bio"
                value={formData?.bio || ""}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Tell us about yourself..."
                className="mt-2 rounded-xl"
                rows={4}
              />
            </div>

            {isEditing && (
              <Button
                onClick={handleSave}
                disabled={saving}
                size="lg"
                className="w-full rounded-full"
              >
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
