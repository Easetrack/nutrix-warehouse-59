
# Authentication Module

โมดูลนี้จัดการการยืนยันตัวตนและการจัดการสิทธิ์ในระบบ WMS

## โครงสร้าง (Structure)

```
auth/
├── providers/      # Context providers สำหรับ authentication
│   ├── AdminAuthProvider.tsx   # Provider สำหรับ admin
│   └── ClientAuthProvider.tsx  # Provider สำหรับ client
├── hooks/          # Custom hooks สำหรับ authentication
├── components/     # UI components สำหรับ authentication
└── types/          # TypeScript types สำหรับ authentication
```

## หน้าที่หลัก (Core Responsibilities)

- การจัดการการเข้าสู่ระบบและออกจากระบบ
- การเก็บและจัดการ authentication tokens
- การตรวจสอบสิทธิ์การเข้าถึง
- การจัดการ user session

## Providers

### AuthAdminProvider

Provider นี้ใช้สำหรับการจัดการการยืนยันตัวตนของ admin:

```tsx
const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AuthAdminProvider>
        <AdminSidebarNav>
          <Outlet />
        </AdminSidebarNav>
      </AuthAdminProvider>
    </div>
  );
};
```

### AuthClientProvider

Provider นี้ใช้สำหรับการจัดการการยืนยันตัวตนของ client:

```tsx
const ClientLayout = () => {
  return (
    <div className="min-h-screen">
      <AuthClientProvider>
        <SidebarNavProps>
          <Outlet />
        </SidebarNavProps>
      </AuthClientProvider>
    </div>
  );
};
```

## Hooks

### useAuth

Hook นี้ใช้สำหรับการเข้าถึง authentication context:

```tsx
const { isAuthenticated, isLoading } = useAuth();

if (isLoading) {
  return <Loading />;
}

if (!isAuthenticated) {
  return <Redirect to="/login" />;
}
```

### useUser

Hook นี้ใช้สำหรับการเข้าถึงข้อมูลของผู้ใช้:

```tsx
const { user, roles, permissions } = useUser();

if (permissions.includes("manage-users")) {
  // Show user management UI
}
```

## Components

### LoginForm

```tsx
<LoginForm
  onLogin={(credentials) => login(credentials)}
  loading={isLoading}
  error={error}
/>
```

### ProtectedRoute

```tsx
<ProtectedRoute
  isAuthenticated={isAuthenticated}
  isLoading={isLoading}
  redirectPath="/login"
>
  <Dashboard />
</ProtectedRoute>
```

## Utility Functions

### getAuthTokens

```typescript
function getAuthTokens(): string | null {
  return localStorage.getItem("auth_tokens");
}
```

### setAuthTokens

```typescript
function setAuthTokens(tokens: string): void {
  localStorage.setItem("auth_tokens", tokens);
}
```

### removeAuthTokens

```typescript
function removeAuthTokens(): void {
  localStorage.removeItem("auth_tokens");
}
```

## Types

### AuthContextType

```typescript
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
};
```

### UserContextType

```typescript
type UserContextType = {
  user: UserInfo | null;
  roles: string[];
  permissions: string[];
};
```

### Credentials

```typescript
interface Credentials {
  username: string;
  password: string;
}
```

## การใช้งานฟีเจอร์ (Feature Usage)

### การสร้าง Protected Routes

```tsx
import { useAuth } from "@/modules/newOrg/client/providers/ClientAuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// In app routes
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route element={<ProtectedRoute />}>
    <Route path="/" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
  </Route>
</Routes>
```

### การตรวจสอบสิทธิ์ใน Component

```tsx
import { useUser } from "@/modules/auth/hooks/useUser";

const AdminOnlyFeature = () => {
  const { user, permissions } = useUser();
  
  if (!permissions.includes("admin-access")) {
    return <AccessDenied />;
  }
  
  return <AdminFeature />;
};
```
