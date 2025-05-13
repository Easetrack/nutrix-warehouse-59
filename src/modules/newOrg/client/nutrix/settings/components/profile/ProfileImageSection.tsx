
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ProfileImageSection: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Image</CardTitle>
        <CardDescription>Update your profile picture</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Avatar className="h-32 w-32">
          <AvatarImage src={profileImage || undefined} />
          <AvatarFallback className="text-3xl">JD</AvatarFallback>
        </Avatar>
        <div className="mt-6 flex flex-col items-center">
          <Label
            htmlFor="picture"
            className="mb-2 cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
          >
            Upload Image
          </Label>
          <Input
            id="picture"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <p className="mt-2 text-xs text-gray-500">
            Supports JPG, PNG, GIF up to 2MB
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileImageSection;
