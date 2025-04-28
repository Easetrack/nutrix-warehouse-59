
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DeleteConfirmationDialog from "@/modules/settings/permission/DeleteConfirmationDialog";
import { usePermissionData } from "@/modules/settings/permission/permission/hooks/usePermissionData";
import PermissionHeader from "@/modules/settings/permission/permission/components/PermissionHeader";
import PermissionSearchBar from "@/modules/settings/permission/permission/components/PermissionSearchBar";
import PermissionTable from "@/modules/settings/permission/permission/components/PermissionTable";
import PermissionAddForm from "@/modules/settings/permission/permission/components/PermissionAddForm";
import PermissionDetailsView from "@/modules/settings/permission/permission/components/PermissionDetailsView";
import PermissionEditView from "@/modules/settings/permission/permission/components/PermissionEditView";

export default function PermissionsPage() {
  const {
    permissions,
    selectedPermission,
    isAddPermissionDialogOpen,
    isDeleteDialogOpen,
    isViewDetailsMode,
    isEditMode,
    newPermissionName,
    newPermissionCode,
    newPermissionDescription,
    searchTerm,
    setSearchTerm,
    setSelectedPermission,
    setIsAddPermissionDialogOpen,
    setIsDeleteDialogOpen,
    setIsViewDetailsMode,
    setIsEditMode,
    setNewPermissionName,
    setNewPermissionCode,
    setNewPermissionDescription,
    handleAddPermission,
    handleDeletePermission,
    handleViewPermissionDetails,
    handleEditPermission,
    handleSaveEdit,
    handleSearch,
    handleClear,
  } = usePermissionData();

  if (isViewDetailsMode && selectedPermission) {
    return (
      <PermissionDetailsView
        selectedPermission={selectedPermission}
        setIsViewDetailsMode={setIsViewDetailsMode}
        handleEditPermission={handleEditPermission}
      />
    );
  }

  if (isEditMode && selectedPermission) {
    return (
      <PermissionEditView
        selectedPermission={selectedPermission}
        newPermissionName={newPermissionName}
        setNewPermissionName={setNewPermissionName}
        newPermissionCode={newPermissionCode}
        setNewPermissionCode={setNewPermissionCode}
        newPermissionDescription={newPermissionDescription}
        setNewPermissionDescription={setNewPermissionDescription}
        setIsEditMode={setIsEditMode}
        handleSaveEdit={handleSaveEdit}
      />
    );
  }

  return (
    <div className="">
      <PermissionHeader onAddPermission={() => setIsAddPermissionDialogOpen(true)} />

      <div className="rounded-md border bg-white">
        <PermissionSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          handleClear={handleClear}
        />

        <PermissionTable
          permissions={permissions}
          handleViewPermissionDetails={handleViewPermissionDetails}
          handleEditPermission={handleEditPermission}
          handleDeleteConfirmation={(permission) => {
            setSelectedPermission(permission);
            setIsDeleteDialogOpen(true);
          }}
        />
      </div>

      <Dialog
        open={isAddPermissionDialogOpen}
        onOpenChange={setIsAddPermissionDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px] bg-white">
          <PermissionAddForm
            newPermissionName={newPermissionName}
            setNewPermissionName={setNewPermissionName}
            newPermissionCode={newPermissionCode}
            setNewPermissionCode={setNewPermissionCode}
            newPermissionDescription={newPermissionDescription}
            setNewPermissionDescription={setNewPermissionDescription}
            handleAddPermission={handleAddPermission}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeletePermission}
        title="Delete Permission"
        description={`Are you sure you want to delete the permission "${selectedPermission?.PermissionName}"? This will remove it from all roles that use it. This action cannot be undone.`}
      />
    </div>
  );
}
