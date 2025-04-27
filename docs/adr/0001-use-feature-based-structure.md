
# 1. Use Feature-Based Project Structure

Date: 2025-04-27

## Status

Accepted

## Context

We need to decide on a project structure that scales well as the application grows and makes it easy for developers to locate and maintain code.

## Decision

We will use a feature-based project structure where code is organized by business domain/feature rather than technical type.

Structure:
```
src/
├── features/
│   ├── auth/
│   ├── dashboard/  
│   └── warehouse/
├── common/
│   ├── hooks/
│   ├── utils/
│   └── types/
└── components/
    └── ui/
```

## Consequences

### Positive
- Better code organization and discoverability
- Easier to maintain and scale
- Clear boundaries between features
- Reduced coupling between modules

### Negative
- May require some initial setup time
- Developers need to understand and follow the structure

## Implementation Notes

We have begun implementation of this structure with the `features/` directory while gradually migrating from our previous structure. The modules directory maintains a similar approach with more specific domain boundaries.

## References

- [MIGRATION_PLAN.md](../../MIGRATION_PLAN.md) - Details the step-by-step process for migrating to this structure
