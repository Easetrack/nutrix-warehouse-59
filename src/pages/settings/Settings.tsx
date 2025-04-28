
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Loading } from "@/components/ui/custom/loading";
import SettingsHeader from "@/modules/settings/components/SettingsHeader";
import SettingsTabs from "@/modules/settings/components/SettingsTabs";
import ProfileTab from "@/modules/settings/components/profile/ProfileTab";
import NotificationsTab from "@/modules/settings/components/notifications/NotificationsTab";
import SecurityTab from "@/modules/settings/components/security/SecurityTab";
import SystemTab from "@/modules/settings/components/system/SystemTab";

const Settings = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Check if warehouse is selected
    const selectedWarehouse = localStorage.getItem("selectedWarehouse");
    if (!selectedWarehouse) {
      navigate("/select-warehouse");
      return;
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading text="Loading settings..." />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      className="container mx-auto"
    >
      <SettingsHeader 
        title="Settings"
        description="Manage your profile and application preferences"
      />

      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="system">
          <SystemTab />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Settings;
