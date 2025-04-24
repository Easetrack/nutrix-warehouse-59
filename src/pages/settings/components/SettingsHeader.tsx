
import React from 'react';

interface SettingsHeaderProps {
  title: string;
  description: string;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default SettingsHeader;
