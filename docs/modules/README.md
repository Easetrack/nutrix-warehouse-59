
# Modules Documentation

This directory contains documentation for each module in the WMS application.

## Overview of Modules

Each module represents a specific domain or feature area in the application:

- [Location Module](./location.md) - Warehouse location management
- [Inventory Module](./inventory.md) - Inventory tracking and management
- [Auth Module](./auth.md) - Authentication and authorization

## Module Structure

Each module follows a consistent structure:

```
modules/
└── feature-name/
    ├── api/        - API calls specific to this module
    ├── components/ - UI components for this feature
    ├── hooks/      - Custom React hooks
    ├── types/      - TypeScript types and interfaces
    └── utils/      - Utility functions
```

This organization helps keep related code together while maintaining clear boundaries between different business domains.
