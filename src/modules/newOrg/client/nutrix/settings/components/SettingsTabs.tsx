
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Key, SettingsIcon } from "lucide-react";

const SettingsTabs: React.FC<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}> = ({ activeTab, setActiveTab }) => {
  return (
    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
      <TabsTrigger value="profile" className="flex items-center space-x-2">
        <User size={16} />
        <span>Profile</span>
      </TabsTrigger>
      <TabsTrigger value="notifications" className="flex items-center space-x-2">
        <Bell size={16} />
        <span>Notifications</span>
      </TabsTrigger>
      <TabsTrigger value="security" className="flex items-center space-x-2">
        <Key size={16} />
        <span>Security</span>
      </TabsTrigger>
      <TabsTrigger value="system" className="flex items-center space-x-2">
        <SettingsIcon size={16} />
        <span>System</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default SettingsTabs;
