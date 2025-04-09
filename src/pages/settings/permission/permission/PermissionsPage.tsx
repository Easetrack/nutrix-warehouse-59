import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Eye, MoreHorizontal, Edit, Copy, Trash2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog';

interface Permission {
  id: string;
  name: string;
  code: string;
  description: string;
  lastUpdate: string;
  usedInRole: number;
  isNew?: boolean;
}

const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'Read Users',
    code: 'users:read',
    description: 'Can view user information',
    lastUpdate: '4/3/2025, 5:29:04 PM',
    usedInRole: 2
  },
  {
    id: '2',
    name: 'Create Users',
    code: 'users:create',
    description: 'Can create new users',
    lastUpdate: '4/3/2025, 5:29:04 PM',
    usedInRole: 2
  },
  {
    id: '3',
    name: 'Update Users',
    code: 'users:update',
    description: 'Can modify user information',
    lastUpdate: '4/3/2025, 5:29:04 PM',
    usedInRole: 2
  },
  {
    id: '4',
    name: 'Delete Users',
    code: 'users:delete',
    description: 'Can remove users from the system',
    lastUpdate: '4/3/2025, 5:29:04 PM',
    usedInRole: 2
  },
  {
    id: '5',
    name: 'Read Roles',
    code: 'roles:read',
    description: 'Can view role information',
    lastUpdate: '4/3/2025, 5:29:04 PM',
    usedInRole: 2
  },
  {
    id: '6',
    name: 'Create Roles',
    code: 'roles:create',
    description: 'Can create new roles',
    lastUpdate: '4/3/2025, 5:29:04 PM',
    usedInRole: 1
  },
  {
    id: '7',
    name: 'Update Roles',
    code: 'roles:update',
    description: 'Can modify role information',
    lastUpdate: '4/3/2025, 5:29:04 PM',
    usedInRole: 1
  },
  {
    id: '8',
    name: 'Delete Roles',
    code: 'roles:delete',
    description: 'Can remove roles from the system',
    lastUpdate: '4/3/2025, 5:29:04 PM',
    usedInRole: 1
  }
];

export default function PermissionsPage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
  const [isAddPermissionDialogOpen, setIsAddPermissionDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDetailsMode, setIsViewDetailsMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newPermissionName, setNewPermissionName] = useState('');
  const [newPermissionCode, setNewPermissionCode] = useState('');
  const [newPermissionDescription, setNewPermissionDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddPermission = () => {
    if (!newPermissionName.trim() || !newPermissionCode.trim()) {
      toast({
        title: "Error",
        description: "Permission name and code are required",
        variant: "destructive"
      });
      return;
    }

    const newPermission: Permission = {
      id: String(Date.now()),
      name: newPermissionName,
      code: newPermissionCode,
      description: newPermissionDescription,
      lastUpdate: new Date().toLocaleString(),
      usedInRole: 0,
      isNew: true
    };

    setPermissions([...permissions, newPermission]);
    setNewPermissionName('');
    setNewPermissionCode('');
    setNewPermissionDescription('');
    setIsAddPermissionDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Permission added successfully"
    });
  };

  const handleDeletePermission = () => {
    if (selectedPermission) {
      setPermissions(permissions.filter(permission => permission.id !== selectedPermission.id));
      setIsDeleteDialogOpen(false);
      setSelectedPermission(null);
      
      toast({
        title: "Success",
        description: `Permission "${selectedPermission.name}" has been deleted`
      });
    }
  };

  const handleDuplicatePermission = (permission: Permission) => {
    const duplicatedPermission = {
      ...permission,
      id: String(Date.now()),
      name: `${permission.name} (Copy)`,
      isNew: true
    };
    
    setPermissions([...permissions, duplicatedPermission]);
    
    toast({
      title: "Success",
      description: `Permission "${permission.name}" has been duplicated`
    });
  };

  const handleViewPermissionDetails = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsViewDetailsMode(true);
  };

  const handleEditPermission = (permission: Permission) => {
    setSelectedPermission(permission);
    setNewPermissionName(permission.name);
    setNewPermissionCode(permission.code);
    setNewPermissionDescription(permission.description);
    setIsEditMode(true);
  };

  const handleSaveEdit = () => {
    if (selectedPermission) {
      const updatedPermissions = permissions.map(permission => 
        permission.id === selectedPermission.id 
          ? {
              ...permission,
              name: newPermissionName,
              code: newPermissionCode,
              description: newPermissionDescription,
              lastUpdate: new Date().toLocaleString()
            } 
          : permission
      );
      
      setPermissions(updatedPermissions);
      setIsEditMode(false);
      setSelectedPermission(null);
      
      toast({
        title: "Success",
        description: "Permission updated successfully"
      });
    }
  };

  const handleSearch = () => {
    // Implement search functionality
  };

  const handleClear = () => {
    setSearchTerm('');
    // Reset search results
  };

  if (isViewDetailsMode && selectedPermission) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="link" 
            onClick={() => setIsViewDetailsMode(false)}
            className="p-0 flex items-center text-foreground gap-1"
          >
            <ArrowLeft className="size-4" />
            <span>Back</span>
          </Button>
          <div className="ml-2">
            <h1 className="text-2xl font-bold tracking-tight">Permission Details</h1>
            <p className="text-muted-foreground">View permission information and usage</p>
          </div>
          <div className="ml-auto">
            <Button 
              onClick={() => {
                setIsEditMode(true);
                setIsViewDetailsMode(false);
                setNewPermissionName(selectedPermission.name);
                setNewPermissionCode(selectedPermission.code);
                setNewPermissionDescription(selectedPermission.description);
              }}
              className="bg-primary"
            >
              Edit Permission
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border bg-white p-6 space-y-6">
          <div>
            <h2 className="font-medium mb-2">Permission Name</h2>
            <p className="text-lg">{selectedPermission.name}</p>
          </div>
          
          <div>
            <h2 className="font-medium mb-2">Code <span className="text-sm text-gray-500 font-normal">{selectedPermission.code}</span></h2>
            <p className="text-sm text-gray-500">A unique code used to identify this permission in your system</p>
          </div>
          
          <div>
            <h2 className="font-medium mb-2">Description</h2>
            <p>{selectedPermission.description}</p>
          </div>
          
          <div>
            <h2 className="font-medium mb-2">Created</h2>
            <p>01/04/2025, 17:36:28</p>
          </div>
          
          <div>
            <h2 className="font-medium mb-2">Last Updated</h2>
            <p>{selectedPermission.lastUpdate}</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Used In Roles</h2>
          <p className="text-muted-foreground mb-4">Roles that currently use this permission</p>
          
          <div className="rounded-md border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-primary">Admin</TableCell>
                  <TableCell>System administrator with all permissions</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-primary">Manager</TableCell>
                  <TableCell>Can manage users but has limited system access</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }

  if (isEditMode && selectedPermission) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="link" 
            onClick={() => setIsEditMode(false)}
            className="p-0 flex items-center text-foreground gap-1"
          >
            <ArrowLeft className="size-4" />
            <span>Back</span>
          </Button>
          <div className="ml-2">
            <h1 className="text-2xl font-bold tracking-tight">Edit Permission</h1>
            <p className="text-muted-foreground">Modify permission details</p>
          </div>
          <div className="ml-auto">
            <Button 
              onClick={handleSaveEdit}
              className="bg-primary"
            >
              Save Changes
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border bg-white p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="font-medium">Permission Name</label>
            <Input 
              id="name"
              value={newPermissionName}
              onChange={(e) => setNewPermissionName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="code" className="font-medium">Code</label>
            <Input 
              id="code"
              value={newPermissionCode}
              onChange={(e) => setNewPermissionCode(e.target.value)}
            />
            <p className="text-sm text-gray-500">A unique code used to identify this permission in your system</p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="font-medium">Description</label>
            <Textarea 
              id="description"
              className="w-full min-h-[150px] p-3 border rounded-md"
              value={newPermissionDescription}
              onChange={(e) => setNewPermissionDescription(e.target.value)}
            />
          </div>
          
          <div>
            <h2 className="font-medium mb-2">Created</h2>
            <p>01/04/2025, 17:36:28</p>
          </div>
          
          <div>
            <h2 className="font-medium mb-2">Last Updated</h2>
            <p>{selectedPermission.lastUpdate}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Permissions</h1>
          <p className="text-muted-foreground">Manage permissions in your system.</p>
        </div>
        <Button 
          onClick={() => setIsAddPermissionDialogOpen(true)}
          className="gap-1 bg-primary"
        >
          <Plus className="size-4" /> Add Permission
        </Button>
      </div>
      
      <div className="rounded-md border bg-white">
        <div className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Input 
                placeholder="Search all" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Button variant="default" onClick={handleSearch}>
              <Search className="size-4 mr-1" /> Search
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <span>Clear</span>
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead>Used In Role</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="font-medium">{permission.name}</TableCell>
                <TableCell>{permission.code}</TableCell>
                <TableCell>{permission.description}</TableCell>
                <TableCell>{permission.lastUpdate}</TableCell>
                <TableCell>{permission.usedInRole}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleViewPermissionDetails(permission)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 bg-white">
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => handleEditPermission(permission)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => handleDuplicatePermission(permission)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                          onClick={() => {
                            setSelectedPermission(permission);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isAddPermissionDialogOpen} onOpenChange={setIsAddPermissionDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle>Add New Permission</DialogTitle>
            <DialogDescription>
              Create a new permission in the system. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input 
                id="name" 
                placeholder="e.g. Create Users"
                value={newPermissionName}
                onChange={(e) => setNewPermissionName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-medium">Code</label>
              <Input 
                id="code"
                placeholder="e.g. users:create" 
                value={newPermissionCode}
                onChange={(e) => setNewPermissionCode(e.target.value)}
              />
              <p className="text-xs text-gray-500">A unique code used to identify this permission in your system</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description"
                placeholder="Describe what this permission allows" 
                className="min-h-[100px] resize-none"
                value={newPermissionDescription}
                onChange={(e) => setNewPermissionDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              variant="default" 
              className="bg-primary"
              onClick={handleAddPermission}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeletePermission}
        title="Delete Permission"
        description={`Are you sure you want to delete the permission "${selectedPermission?.name}"? This will remove it from all roles that use it. This action cannot be undone.`}
      />
    </div>
  );
}
