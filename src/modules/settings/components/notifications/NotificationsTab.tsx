
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/common/hooks/use-toast";

const NotificationsTab: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    sms: false,
    stockAlerts: true,
    shipmentUpdates: true,
    systemUpdates: true,
  });

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    });
  };

  return (
    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-medium">Delivery Channels</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="browser-notifications">
                    Browser Notifications
                  </Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications in your browser
                  </p>
                </div>
                <Switch
                  id="browser-notifications"
                  checked={notifications.browser}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      browser: checked,
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">
                    SMS Notifications
                  </Label>
                  <p className="text-sm text-gray-500">
                    Receive critical alerts via SMS
                  </p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={notifications.sms}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, sms: checked })
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-4 text-lg font-medium">
              Notification Types
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="stock-alerts">Stock Alerts</Label>
                  <p className="text-sm text-gray-500">
                    Low stock and inventory alerts
                  </p>
                </div>
                <Switch
                  id="stock-alerts"
                  checked={notifications.stockAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      stockAlerts: checked,
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shipment-updates">
                    Shipment Updates
                  </Label>
                  <p className="text-sm text-gray-500">
                    Updates on shipment status changes
                  </p>
                </div>
                <Switch
                  id="shipment-updates"
                  checked={notifications.shipmentUpdates}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      shipmentUpdates: checked,
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-updates">System Updates</Label>
                  <p className="text-sm text-gray-500">
                    Updates and maintenance notifications
                  </p>
                </div>
                <Switch
                  id="system-updates"
                  checked={notifications.systemUpdates}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      systemUpdates: checked,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">
              <RotateCcw className="mr-1 h-4 w-4" />
              Reset
            </Button>
            <Button onClick={handleSaveNotifications} className="bg-primary">
              <Save className="mr-1 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NotificationsTab;
