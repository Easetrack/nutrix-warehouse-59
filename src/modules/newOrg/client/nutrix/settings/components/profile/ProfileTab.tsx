
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import ProfileImageSection from './ProfileImageSection';
import PersonalInfoSection from './PersonalInfoSection';

const ProfileTab: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-12">
      <motion.div variants={containerVariants} className="md:col-span-4">
        <ProfileImageSection />
      </motion.div>
      <motion.div variants={containerVariants} className="md:col-span-8">
        <PersonalInfoSection />
      </motion.div>
    </motion.div>
  );
};

export default ProfileTab;
