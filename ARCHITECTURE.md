# FinTrack Architecture Documentation

## Overview

FinTrack follows a modern client-server architecture with a React-based frontend and Node.js backend, emphasizing separation of concerns and maintainability.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React)                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │   Pages    │  │ Components │  │   Layouts  │        │
│  └─────┬──────┘  └──────┬─────┘  └──────┬─────┘        │
│        │                │                │               │
│        └────────────────┼────────────────┘               │
│                         │                                │
│  ┌────────────┐  ┌─────▼──────┐  ┌────────────┐        │
│  │   Hooks    │──│   Routes   │──│  Services  │        │
│  └────────────┘  └────────────┘  └──────┬─────┘        │
│                                          │               │
└──────────────────────────────────────────┼──────────────┘
                                           │ HTTP/REST
                                           │
┌──────────────────────────────────────────▼──────────────┐
│                   Backend (Node.js)                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │   Routes   │──│Controllers │──│   Models   │        │
│  └────────────┘  └────────────┘  └──────┬─────┘        │
│                                          │               │
│                                   ┌──────▼─────┐        │
│                                   │  Database  │        │
│                                   └────────────┘        │
└─────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Layer Structure

#### 1. **Presentation Layer** (`src/pages/`, `src/components/`)
- **Pages**: Top-level route components
  - `Dashboard.jsx` - Main financial overview
  - `NuevaTransaccion.jsx` - Transaction creation
  - `GastosFijos.jsx` - Fixed expenses management
  - `NuevosGastoFijo.jsx` - Add fixed expenses

- **Components**: Reusable UI elements
  - `dashboard/` - Dashboard-specific components
    - `BalanceCards.jsx` - Income/Expense/Balance cards
    - `GastosGraficoCard.jsx` - Expense pie chart
    - `UltimasTransaccionesCard.jsx` - Recent transactions list
    - `InversionGraficoCard.jsx` - Investment chart
    - `DistribuciónInversionCard.jsx` - Investment distribution
  - `layout/` - Layout components
    - `Header.jsx` - Application header
    - `Navbar.jsx` - Navigation bar

#### 2. **Business Logic Layer** (`src/hooks/`)
- Custom hooks encapsulate business logic and state management
- **Example**: `useDashboardData.js`
  - Fetches all dashboard data
  - Performs calculations (income, expenses, balances)
  - Returns computed state to components

#### 3. **Data Access Layer** (`src/services/`)
- Centralized API communication
- **`api.js`**: All HTTP requests to backend
  - `getCategories()` - Fetch expense categories
  - `getBalance()` - Get current balance
  - `getTransactions()` - Fetch transactions
  - `getInvestments()` - Fetch investments
  - `syncFixedExpenses()` - Sync recurring expenses

#### 4. **Routing Layer** (`src/routes/`, `src/layouts/`)
- **`AppRoutes.jsx`**: Route definitions using React Router
- **`MainLayout.jsx`**: Common layout wrapper with Header and Navbar

### Design Patterns

#### 1. **Container/Presentational Pattern**
- **Container**: Pages and hooks manage state and logic
- **Presentational**: Components receive props and render UI

#### 2. **Custom Hooks Pattern**
- Extract reusable stateful logic
- Example: `useDashboardData` consolidates all dashboard data fetching

#### 3. **Service Layer Pattern**
- Centralize API calls in `services/api.js`
- Provides single source of truth for backend communication

#### 4. **Composition Pattern**
- Small, focused components composed into larger features
- Example: Dashboard composes multiple card components

## State Management

### Current Approach
- **Local State**: React `useState` for component-specific state
- **Custom Hooks**: Shared state logic across components
- **Props**: Data flow from parent to child components

### Data Flow
```
API → Services → Hooks → Pages → Components
```

## Styling Architecture

### Design System

#### Color Palette
```css
--color-background: #0f172a  /* Deep slate */
--color-surface: #1e293b     /* Lighter slate */
--color-primary: #3b82f6     /* Blue */
--color-secondary: #8b5cf6   /* Purple */
--color-accent: #10b981      /* Green */
```

#### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

#### Utility Classes
- `.glass-panel` - Glassmorphism effect
- `.text-gradient` - Gradient text
- `.btn-primary` - Primary button style

### Component Styling
- **Tailwind CSS**: Utility-first approach
- **Custom CSS**: Global styles in `index.css`
- **Inline Styles**: Dynamic colors (charts, indicators)

## Backend Architecture

### API Structure
```
/api
├── /categorias          # Expense categories
├── /transacciones       # Transactions
│   ├── /balance        # Current balance
│   ├── /transacciones_actuales  # Recent transactions
│   └── /inversiones    # Investments
└── /gastosFijos        # Fixed expenses
    └── /sincronizar    # Sync recurring expenses
```

## Performance Optimizations

### Frontend
1. **Code Splitting**: Route-based lazy loading (potential)
2. **Memoization**: `useCallback` for expensive calculations
3. **Efficient Rendering**: Proper key usage in lists
4. **Asset Optimization**: Vite's built-in optimizations

### Data Fetching
1. **Parallel Requests**: `Promise.all()` for simultaneous API calls
2. **Error Handling**: Graceful degradation on API failures
3. **Loading States**: User feedback during data fetching

## Security Considerations

### Frontend
- Input validation before API calls
- Sanitization of user-generated content
- HTTPS for production deployment

### Backend
- (To be documented based on implementation)

## Future Enhancements

### Potential Improvements
1. **State Management**: Consider Redux/Zustand for complex state
2. **Caching**: Implement React Query for data caching
3. **Offline Support**: Service workers for PWA capabilities
4. **Real-time Updates**: WebSocket integration
5. **Testing**: Unit and integration tests
6. **TypeScript**: Type safety across the application

## Development Workflow

### Component Development
1. Create component in appropriate directory
2. Define props interface
3. Implement UI with Tailwind classes
4. Add to parent component/route
5. Test in browser

### Adding New Features
1. Plan data requirements
2. Create/update API endpoints (backend)
3. Add service methods (frontend)
4. Create custom hook if needed
5. Build UI components
6. Integrate into routing

## Deployment

### Frontend Build
```bash
cd web/FinTrack-Web
npm run build
```
Output: `dist/` directory with optimized static files

### Backend Deployment
(To be documented based on deployment strategy)

---

This architecture provides a solid foundation for scalability and maintainability while keeping the codebase clean and organized.
