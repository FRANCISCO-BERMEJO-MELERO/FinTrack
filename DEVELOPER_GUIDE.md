# FinTrack Developer Guide

## Getting Started

### Development Environment Setup

#### Required Tools
- **Node.js**: v18+ ([Download](https://nodejs.org/))
- **npm**: v9+ (comes with Node.js)
- **Git**: Latest version
- **Code Editor**: VS Code recommended

#### Recommended VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

### Initial Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd FinTrack
   
   # Install frontend dependencies
   cd web/FinTrack-Web
   npm install
   
   # Install backend dependencies
   cd ../../server
   npm install
   ```

2. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm start
   
   # Terminal 2 - Frontend
   cd web/FinTrack-Web
   npm run dev
   ```

3. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Project Structure Deep Dive

### Frontend (`web/FinTrack-Web/`)

```
src/
├── components/           # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   │   ├── BalanceCards.jsx
│   │   ├── GastosGraficoCard.jsx
│   │   ├── UltimasTransaccionesCard.jsx
│   │   ├── InversionGraficoCard.jsx
│   │   └── DistribuciónInversionCard.jsx
│   └── layout/          # Layout components
│       ├── Header.jsx
│       └── Navbar.jsx
├── pages/               # Page-level components
│   ├── Dashboard.jsx
│   ├── NuevaTransaccion.jsx
│   ├── GastosFijos.jsx
│   └── NuevosGastoFijo.jsx
├── hooks/               # Custom React hooks
│   └── useDashboardData.js
├── services/            # API communication layer
│   └── api.js
├── routes/              # Routing configuration
│   └── AppRoutes.jsx
├── layouts/             # Layout wrappers
│   └── MainLayout.jsx
├── assets/              # Static assets
├── index.css            # Global styles
├── App.jsx              # Root component
└── main.jsx             # Application entry point
```

## Coding Standards

### React Components

#### Component Structure
```jsx
import React from 'react';
import { Icon } from 'lucide-react';

export default function ComponentName({ prop1, prop2 }) {
    // 1. State declarations
    const [state, setState] = useState(initialValue);
    
    // 2. Effects
    useEffect(() => {
        // Effect logic
    }, [dependencies]);
    
    // 3. Event handlers
    const handleClick = () => {
        // Handler logic
    };
    
    // 4. Render
    return (
        <div className="glass-panel p-4">
            {/* Component JSX */}
        </div>
    );
}
```

#### Naming Conventions
- **Components**: PascalCase (`BalanceCards.jsx`)
- **Functions**: camelCase (`calculateBalance`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`)
- **CSS Classes**: kebab-case or Tailwind utilities

### Custom Hooks

#### Hook Pattern
```javascript
export const useCustomHook = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await apiCall();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);
    
    return { data, loading, error };
};
```

### API Services

#### Service Pattern
```javascript
const API_URL = "http://localhost:3000";

export const getResource = async () => {
    const response = await fetch(`${API_URL}/endpoint`);
    if (!response.ok) throw new Error("Error message");
    return response.json();
};
```

### Styling Guidelines

#### Tailwind Usage
```jsx
// ✅ Good - Semantic, readable
<div className="glass-panel p-4 rounded-xl">

// ✅ Good - Responsive
<div className="flex flex-col md:flex-row gap-4">

// ❌ Avoid - Too many classes
<div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-4 hover:bg-white/10 transition-all duration-300">
// Instead, use utility class: glass-panel
```

#### Custom Utility Classes
Define reusable patterns in `index.css`:
```css
.glass-panel {
  @apply bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl;
}
```

## Common Development Tasks

### Adding a New Page

1. **Create Page Component**
   ```bash
   # Create file: src/pages/NewPage.jsx
   ```

2. **Define Component**
   ```jsx
   export default function NewPage() {
       return (
           <div className="flex flex-col gap-4">
               <h1 className="text-2xl font-bold">New Page</h1>
               {/* Page content */}
           </div>
       );
   }
   ```

3. **Add Route**
   ```jsx
   // In src/routes/AppRoutes.jsx
   import NewPage from "../pages/NewPage";
   
   <Route path="/new-page" element={<NewPage />} />
   ```

4. **Add Navigation Link**
   ```jsx
   // In src/components/layout/Navbar.jsx
   { path: "/new-page", label: "New Page", icon: IconName }
   ```

### Creating a New Component

1. **Create Component File**
   ```bash
   # src/components/category/ComponentName.jsx
   ```

2. **Implement Component**
   ```jsx
   import React from 'react';
   
   export default function ComponentName({ data }) {
       return (
           <div className="glass-panel p-4">
               {/* Component content */}
           </div>
       );
   }
   ```

3. **Import and Use**
   ```jsx
   import ComponentName from "../components/category/ComponentName";
   
   <ComponentName data={someData} />
   ```

### Adding a New API Endpoint

1. **Backend**: Create endpoint (server-side)

2. **Frontend Service**
   ```javascript
   // In src/services/api.js
   export const getNewData = async () => {
       const response = await fetch(`${API_URL}/new-endpoint`);
       if (!response.ok) throw new Error("Error fetching new data");
       return response.json();
   };
   ```

3. **Use in Component/Hook**
   ```javascript
   import { getNewData } from "../services/api";
   
   const data = await getNewData();
   ```

## Debugging Tips

### React DevTools
- Install React DevTools browser extension
- Inspect component hierarchy
- View props and state in real-time

### Console Debugging
```javascript
// Structured logging
console.log('Data:', { data, loading, error });

// Conditional logging
if (process.env.NODE_ENV === 'development') {
    console.log('Debug info');
}
```

### Network Debugging
- Open browser DevTools → Network tab
- Monitor API calls
- Check request/response data

## Testing

### Manual Testing Checklist
- [ ] All routes load correctly
- [ ] Data displays properly
- [ ] Forms validate input
- [ ] Error states show appropriate messages
- [ ] Loading states appear during data fetch
- [ ] Responsive design works on mobile

## Performance Best Practices

### Component Optimization
```javascript
// Use useCallback for functions passed as props
const handleClick = useCallback(() => {
    // Handler logic
}, [dependencies]);

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
    return computeExpensiveValue(data);
}, [data]);
```

### Avoid Common Pitfalls
- ❌ Don't create functions inside render
- ❌ Don't use index as key in lists
- ✅ Use proper dependency arrays in useEffect
- ✅ Cleanup effects when needed

## Git Workflow

### Branch Naming
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/component-name` - Code refactoring

### Commit Messages
```
feat: Add investment tracking feature
fix: Correct balance calculation
refactor: Extract API calls to service layer
docs: Update README with setup instructions
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 5173 (frontend)
npx kill-port 5173

# Kill process on port 3000 (backend)
npx kill-port 3000
```

#### Dependencies Out of Sync
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Build Errors
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## Resources

### Documentation
- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)
- [Recharts](https://recharts.org/)

### Learning Resources
- React patterns and best practices
- Modern JavaScript (ES6+)
- CSS Grid and Flexbox
- Async/Await and Promises

---

Happy coding! 🚀
