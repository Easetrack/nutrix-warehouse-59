# WMS WebApp - Architecture & Development Guide

This repository contains a Warehouse Management System (WMS) WebApp built with React, TypeScript, and Tailwind CSS. This document explains the architecture and provides guidance on extending the application.

## 1. Project Architecture

The application follows a feature-based organization with a clear separation of concerns:

```
src/
├── app/              # Application layouts and routing
├── assets/           # Static assets (images, icons, etc.)
├── components/       # Shared UI components
│   ├── ui/           # UI component library (shadcn/ui)
│   └── ...           # Other reusable components
├── contexts/         # React context providers
├── hooks/            # Shared custom React hooks
├── lib/              # Utility libraries and configurations
├── pages/            # Page components organized by feature
│   ├── stockUpdate/  # Stock management feature
│   │   ├── components/       # Feature-specific components
│   │   ├── hooks/            # Feature-specific hooks
│   │   └── ...               # Feature subpages
│   └── ...           # Other feature pages
├── services/         # API services and data fetching
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

### Key Architectural Concepts

#### 1. Hooks Organization
The application uses a pattern of small, focused hooks for each concern:

- **State Management Hooks**: Manage specific slices of state (e.g., `useStockUpdateFilters`, `useStockUpdateSort`)
- **Data Fetching Hooks**: Handle API calls and data transformation (e.g., `useStockUpdateFetch`)
- **Auth Hooks**: Handle authentication and user context (e.g., `useStockUpdateAuth`)
- **Composite Hooks**: Compose smaller hooks to create complete feature logic (e.g., `useStockUpdate`)

#### 2. Components Structure
Components are organized into:

- **Layout Components**: Structure the page (e.g., headers, sidebars)
- **Feature Components**: Specific to a feature (e.g., stock tables, filter bars)
- **UI Components**: Reusable UI elements from shadcn/ui

#### 3. Services Layer
API communication is abstracted through service modules that:
- Handle data fetching and error management
- Process request parameters
- Transform API responses

## 2. Extending the Application

### Adding a New Page/Menu

To add a new page to the application:

1. **Create Page Component:**
   Create a new page component in the `src/pages` directory:

   ```tsx
   // src/pages/NewFeature.tsx
   import React from "react";
   
   const NewFeature = () => {
     return (
       <div className="container mx-auto">
         <h1>New Feature Page</h1>
         {/* Your page content */}
       </div>
     );
   };
   
   export default NewFeature;
   ```

2. **Add Route to App.tsx:**
   Register the new page in the routing system:

   ```tsx
   // In src/App.tsx
   import NewFeature from "./pages/NewFeature";
   
   // Inside the Routes component:
   <Route path="/new-feature" element={
     <ProtectedRoute>
       <NewFeature />
     </ProtectedRoute>
   } />
   ```

3. **Add Navigation Link:**
   Update the sidebar navigation to include your new page:

   ```tsx
   // In src/components/SidebarNav.tsx
   // Find the mainMenuItems array and add your new page:
   
   const mainMenuItems = [
     { path: '/dashboard', name: t('nav.dashboard'), icon: <LayoutDashboard size={20} /> },
    // { path: '/stock', name: t('nav.stock'), icon: <Package size={20} /> },
    // {
    //   path: '/stock',
    //   name: t('nav.stock'),
    //   subItems: [
    //     { path: '/stock/summary', name: t('Summary') },
    //     { path: '/stock/details', name: t('Details') },
    //   ]
    // },
    {
      id: 'stock',
      name: t('nav.stock'),
      icon: <Package size={20} />,
      hasSubmenu: true
    },
    // { path: '/receiving', name: t('nav.receiving'), icon: <DownloadCloud size={20} /> },
    // { path: '/request-picking', name: t('nav.requestForPicking'), icon: <FileHeart size={20} /> },
    // { path: '/packing-ptw', name: t('nav.packingPTW'), icon: <Box size={20} /> },
     { 
       path: '/new-feature', 
       name: t('nav.newFeature'), 
       icon: <NewIcon size={20} /> 
     },
   ];
   ```

4. **Add Translation (if using i18n):**
   If using the language context, add translations:

   ```tsx
   // In relevant language files
   {
     "nav": {
       "newFeature": "New Feature"
     }
   }
   ```

### Creating a New API Endpoint

To add a new API endpoint:

1. **Define Type Definitions:**
   Create or update type definitions for the API request and response:

   ```tsx
   // src/types/newFeature/api.ts
   export interface NewFeatureQueryParams {
     page?: number;
     perPage?: number;
     searchTerm?: string;
     sortBy?: string;
     sortDirection?: 'asc' | 'desc';
     // Add other parameters as needed
   }

   export interface NewFeatureResponse {
     items: NewFeatureItem[];
     totalPages: number;
     totalCount: number;
     perPage: number;
     page: number;
   }

   export interface NewFeatureItem {
     id: string;
     name: string;
     // Define your item properties
   }
   ```

2. **Create Service Function:**
   Add a new service function to fetch data:

   ```tsx
   // src/services/newFeature.ts
   import apiClient from './api-client';
   import { NewFeatureQueryParams, NewFeatureResponse } from '@/types/newFeature/api';

   /**
    * Fetches new feature data with the given query parameters
    */
   export const fetchNewFeatureData = async (params: NewFeatureQueryParams): Promise<NewFeatureResponse> => {
     try {
       // Build query params - only include non-empty values
       const queryParams = new URLSearchParams();
       
       Object.entries(params).forEach(([key, value]) => {
         if (value !== undefined && value !== null && value !== '') {
           queryParams.append(key, String(value));
         }
       });

       // Make API request
       const response = await apiClient.get(`/NewFeature?${queryParams.toString()}`);
       return response.data;
     } catch (error) {
       console.error('Error fetching new feature data:', error);
       
       // Return empty response structure on error
       return {
         items: [],
         totalPages: 1,
         totalCount: 0,
         perPage: 10,
         page: params.page || 1
       };
     }
   };
   ```

3. **Create Query Builder Hook:**
   Create a hook to build query parameters:

   ```tsx
   // src/pages/newFeature/hooks/useQueryBuilder.tsx
   import { useMemo } from 'react';
   import { NewFeatureQueryParams } from '@/types/newFeature/api';

   export const useQueryBuilder = () => {
     const buildQueryParams = (params: {
       currentPage: number;
       perPage: number;
       searchTerm?: string;
       sortColumn?: string | null;
       sortDirection?: string;
       // Add other filter parameters
     }): NewFeatureQueryParams => {
       const queryParams: NewFeatureQueryParams = {
         page: params.currentPage,
         perPage: params.perPage,
       };

       // Add search term if provided
       if (params.searchTerm) {
         queryParams.searchTerm = params.searchTerm;
       }

       // Add sorting if provided
       if (params.sortColumn) {
         queryParams.sortBy = params.sortColumn;
         queryParams.sortDirection = params.sortDirection as 'asc' | 'desc';
       }

       // Add other parameters as needed

       return queryParams;
     };

     return { buildQueryParams };
   };
   ```

4. **Create Data Fetching Hook:**
   Create a hook to manage data fetching:

   ```tsx
   // src/pages/newFeature/hooks/useNewFeatureFetch.tsx
   import { useState } from "react";
   import { useToast } from "@/hooks/use-toast";
   import { fetchNewFeatureData } from "@/services/newFeature";
   import { NewFeatureItem } from "@/types/newFeature/api";
   import { useQueryBuilder } from "./useQueryBuilder";

   export const useNewFeatureFetch = ({
     filters,
     sort,
     pagination,
     locationId
   }: {
     filters: any;
     sort: { sortColumn: string | null; sortDirection: "asc" | "desc" };
     pagination: { currentPage: number; perPage: number };
     locationId: string;
   }) => {
     const { toast } = useToast();
     const [items, setItems] = useState<NewFeatureItem[]>([]);
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [totalPages, setTotalPages] = useState(1);
     const [totalCount, setTotalCount] = useState(0);
     const { buildQueryParams } = useQueryBuilder();

     const fetchData = async () => {
       setIsLoading(true);
       setError(null);

       try {
         const queryParams = buildQueryParams({
           currentPage: pagination.currentPage,
           perPage: pagination.perPage,
           searchTerm: filters.searchTerm,
           sortColumn: sort.sortColumn,
           sortDirection: sort.sortDirection,
           // Add other parameters
         });

         const data = await fetchNewFeatureData(queryParams);
         setItems(data.items);
         setTotalPages(data.totalPages);
         setTotalCount(data.totalCount);
         return data;
       } catch (err) {
         const errorMessage = "Failed to fetch data";
         setError(errorMessage);
         toast({
           title: "Error",
           description: errorMessage,
           variant: "destructive",
         });
         return null;
       } finally {
         setIsLoading(false);
       }
     };

     return {
       items,
       isLoading,
       error,
       fetchData,
       totalPages,
       totalCount
     };
   };
   ```

5. **Implement Feature-Specific Hooks:**
   Create additional hooks for filters, sorting, etc. as needed, following the same pattern as existing features.

6. **Create Main Feature Hook:**
   Create a composite hook that integrates all the other hooks:

   ```tsx
   // src/pages/newFeature/hooks/useNewFeature.tsx
   import { useNewFeatureAuth } from "./useNewFeatureAuth";
   import { useNewFeatureFilters } from "./useNewFeatureFilters";
   import { useNewFeaturePagination } from "./useNewFeaturePagination";
   import { useNewFeatureFetch } from "./useNewFeatureFetch";
   import { useNewFeatureSelection } from "./useNewFeatureSelection";
   import { useNewFeatureSort } from "./useNewFeatureSort";
   import { useEffect } from "react";

   export const useNewFeature = () => {
     const { locationId } = useNewFeatureAuth();
     const filters = useNewFeatureFilters();
     const pagination = useNewFeaturePagination();
     const sort = useNewFeatureSort();
     const selection = useNewFeatureSelection();

     // Fetch logic
     const fetcher = useNewFeatureFetch({
       filters,
       sort,
       pagination,
       locationId
     });

     // Initial data fetch
     useEffect(() => {
       if (locationId) fetcher.fetchData();
     }, [locationId, pagination.currentPage, pagination.perPage]);

     // Handlers
     const handleSearch = () => {
       pagination.setCurrentPage(1);
       fetcher.fetchData();
     };

     // ... add other handlers

     return {
       // Combine and return all the state and handlers
       ...filters,
       ...pagination,
       sortColumn: sort.sortColumn,
       sortDirection: sort.sortDirection,
       handleSort: sort.handleSort,
       items: fetcher.items,
       isLoading: fetcher.isLoading,
       error: fetcher.error,
       // ... other properties and methods
     };
   };
   ```

7. **Create UI Components:**
   Create the necessary UI components for your feature, using the hook for data and interaction.

## 3. Best Practices

1. **Keep Hooks Small and Focused**
   - Each hook should have a single responsibility
   - Compose smaller hooks to create feature functionality

2. **Type Everything**
   - Use TypeScript types for all components, hooks, and functions
   - Define interfaces for API requests and responses

3. **Error Handling**
   - Handle errors consistently at the service layer
   - Provide user feedback through toast notifications

4. **Responsive Design**
   - Always implement responsive designs using Tailwind CSS
   - Test on multiple screen sizes

5. **Component Organization**
   - Create separate directories for feature components
   - Keep components small and focused on a single responsibility

## 4. API Integration Guidelines

When integrating with the backend API:

1. **Authentication**
   - All requests are automatically authenticated using the apiClient
   - The interceptor adds the authentication token and warehouse ID

2. **Error Handling**
   - Service functions should catch errors and return fallback values
   - Use the toast system to inform users of failures

3. **Pagination**
   - All list endpoints support pagination with page and perPage parameters
   - Update the UI to reflect total pages and counts

4. **Sorting and Filtering**
   - Use consistent parameter naming for sorting and filtering
   - Handle empty states and loading states in the UI
