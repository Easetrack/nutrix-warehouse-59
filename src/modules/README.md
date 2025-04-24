
# Modules Directory

This directory contains feature-based modules for the WMS application.

## Module Structure

Each module follows this pattern:
```
modules/
└── feature-name/
    ├── api/        - API calls specific to this module
    ├── components/ - UI components for this feature
    ├── hooks/      - Custom React hooks
    ├── types/      - TypeScript types and interfaces
    └── utils/      - Utility functions
```

## Current Modules

- `location` - Warehouse location management
- `picking` - Picking request management
- `inventory` - Inventory management
- `auth` - Authentication and user management
