
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoleDetailsPage from '@/modules/settings/permission/role/RoleDetailsPage';
import RoleEditPage from '@/modules/settings/permission/role/RoleEditPage';
import RolesPage from '@/modules/settings/permission/role/RolesPage';

const RoleRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RolesPage />} />
      <Route path="/new" element={<RoleEditPage isNew={true} />} />
      <Route path="/edit/:id" element={<RoleEditPage />} />
      <Route path="/details/:id" element={<RoleDetailsPage />} />
    </Routes>
  );
};

export default RoleRoutes;
