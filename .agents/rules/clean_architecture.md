# Clean Architecture Rule

Follow these principles when generating or modifying code for this project to maintain a scalable, maintainable, and clean architecture.

## Layers

### 1. Data Layer (`src/api/`)
- Contains all raw API clients, fetch logic, interceptors, and data mappers.
- Do not mix React logic (like state or effects) here.

### 2. Domain Layer (`src/app/hooks/`)
- Contains custom React hooks (e.g., `useJobs`, `useUser`).
- This layer acts as a bridge between the Presentation Layer and Data Layer.
- Handles data fetching state (loading, error, success) and formatting data for components.

### 3. Presentation Layer
- **Components (`src/app/components/`)**: Dumb, reusable UI components (`JobCard`, `Button`, `Navbar`). These should rarely hold complex business logic.
- **Pages (`src/app/pages/`)**: Smart components (Views) that assemble standard components and inject data via Domain Layer hooks. They handle routing contexts.

## Rules
- **Avoid Prop Drilling**: If you find yourself passing props down many layers, consider contextual state or restructuring.
- **Single Responsibility Principle**: A file should do one thing. If a component fetches data, maps it, and renders complex nested UI, break it down (e.g., extract the fetch to a hook, the list item to a child component).
- **Keep components pure**: Aim for functional components that rely entirely on props where possible.
