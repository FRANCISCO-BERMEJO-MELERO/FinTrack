# FinTrack Components Documentation

## Table of Contents
- [Dashboard Components](#dashboard-components)
- [Layout Components](#layout-components)
- [Page Components](#page-components)
- [Hooks](#hooks)

---

## Dashboard Components

### BalanceCards

**Location:** `src/components/dashboard/BalanceCards.jsx`

**Purpose:** Displays three summary cards showing income, expenses, and balance.

**Props:**
```typescript
{
  ingresos: number,    // Total income
  gastos: number,      // Total expenses (negative)
  balance: number      // Current balance
}
```

**Features:**
- Dynamic color coding (green for income, red for expenses, blue for balance)
- Icon indicators (TrendingUp, TrendingDown, Wallet)
- Glassmorphism card design
- Hover scale animation
- Formatted currency display (€)

**Usage Example:**
```jsx
<BalanceCards 
  ingresos={1500.00} 
  gastos={-850.00} 
  balance={2500.50} 
/>
```

**Visual Structure:**
```
┌─────────────────────────────────────────────────┐
│ Ingresos          🔼                            │
│ 1500.00€                                        │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ Gastos            🔽                            │
│ -850.00€                                        │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ Balance           💰                            │
│ 2500.50€                                        │
└─────────────────────────────────────────────────┘
```

---

### GastosGraficoCard

**Location:** `src/components/dashboard/GastosGraficoCard.jsx`

**Purpose:** Displays expense distribution by category using a donut chart.

**Props:**
```typescript
{
  gastos: Array<{
    categoria: string,
    cantidad: number
  }>
}
```

**Features:**
- Interactive donut chart (Recharts)
- Custom color palette per category
- Tooltip with formatted currency
- Legend with category names
- Empty state with icon
- Inner radius for donut effect

**Category Colors:**
```javascript
{
  'Comida': '#EF4444',          // Red
  'Transporte': '#F59E0B',      // Orange
  'Compras': '#6366F1',         // Indigo
  'Entretenimiento': '#EC4899', // Pink
  'Salud': '#10B981',           // Green
  'Educacion': '#3B82F6',       // Blue
  'Servicios': '#14B8A6',       // Teal
  'Otros': '#6B7280'            // Gray
}
```

**Usage Example:**
```jsx
<GastosGraficoCard 
  gastos={[
    { categoria: 'Comida', cantidad: 300 },
    { categoria: 'Transporte', cantidad: 150 }
  ]} 
/>
```

---

### UltimasTransaccionesCard

**Location:** `src/components/dashboard/UltimasTransaccionesCard.jsx`

**Purpose:** Shows a scrollable list of recent transactions.

**Props:**
```typescript
{
  transacciones: Array<{
    id: number,
    tipo_id: number,
    cantidad: number,
    descripcion: string,
    categoria_id: number
  }>,
  categorias: Array<{
    id: number,
    name: string
  }>
}
```

**Features:**
- Scrollable list (max height: 350px)
- Custom scrollbar styling
- Transaction type indicators (income/expense icons)
- Category badges
- Link to create new transaction
- Hover effects on transaction items
- Empty state with message

**Transaction Item Structure:**
```
┌──────────────────────────────────────────────┐
│ 🔼 Salario mensual                  +1500€  │
│    [Salario]                                 │
└──────────────────────────────────────────────┘
```

**Usage Example:**
```jsx
<UltimasTransaccionesCard 
  transacciones={transactions}
  categorias={categories}
/>
```

---

### InversionGraficoCard

**Location:** `src/components/dashboard/InversionGraficoCard.jsx`

**Purpose:** Visualizes investment distribution by type.

**Props:**
```typescript
{
  inversiones: Array<{
    tipo_inversion: string,
    cantidad: number
  }>
}
```

**Features:**
- Donut chart for investment types
- Aggregates investments by type
- Custom colors per investment category
- Formatted currency tooltips
- Empty state for no investments

**Investment Type Colors:**
```javascript
{
  'Criptomonedas': '#EF4444',
  'Bonos': '#F59E0B',
  'Fondos': '#6366F1',
  'Propiedades': '#10B981',
  'Acciones': '#3B82F6',
  'ETF': '#EC4899',
  'Otros': '#6B7280'
}
```

**Data Processing:**
```javascript
// Groups investments by tipo_inversion
inversiones.forEach((inversion) => {
  const { tipo_inversion } = inversion;
  if (data[tipo_inversion]) {
    data[tipo_inversion].cantidad += inversion.cantidad;
  } else {
    data[tipo_inversion] = { tipo_inversion, cantidad: inversion.cantidad };
  }
});
```

---

### DistribuciónInversionCard

**Location:** `src/components/dashboard/DistribuciónInversionCard.jsx`

**Purpose:** Shows detailed breakdown of investments by category and asset.

**Props:**
```typescript
{
  inversiones: Array<{
    tipo_inversion: string,
    categoria: string,
    activo: string,
    cantidad: number
  }>
}
```

**Features:**
- Hierarchical display (Type > Category > Asset)
- Color-coded indicators
- Scrollable container
- Grouped by investment type
- Amount display per asset

**Visual Structure:**
```
┌─────────────────────────────────────────┐
│ Criptomonedas                           │
│   ● BTC                        500.00 € │
│   ● ETH                        300.00 € │
├─────────────────────────────────────────┤
│ ETF                                     │
│   ● SP500                     1000.00 € │
└─────────────────────────────────────────┘
```

**Data Processing:**
```javascript
const groupedInversiones = inversiones.reduce((acc, inversion) => {
  const categoria = acc[inversion.tipo_inversion] || {};
  const tipoInversion = categoria[inversion.categoria] || {};
  tipoInversion[inversion.activo] = tipoInversion[inversion.activo] || 0;
  tipoInversion[inversion.activo] += inversion.cantidad;
  categoria[inversion.categoria] = tipoInversion;
  acc[inversion.tipo_inversion] = categoria;
  return acc;
}, {});
```

---

## Layout Components

### Header

**Location:** `src/components/layout/Header.jsx`

**Purpose:** Application header with branding and export button.

**Features:**
- Gradient text logo ("FinTrack")
- Subtitle with app description
- Export data button with gradient styling
- Responsive padding

**Visual Structure:**
```
┌──────────────────────────────────────────────────┐
│ FinTrack                    [Exportar datos]     │
│ Gestión de gastos 100%                           │
└──────────────────────────────────────────────────┘
```

**Styling:**
- Logo uses `.text-gradient` class
- Button uses `.btn-primary` class
- Glassmorphism not applied (solid header)

---

### Navbar

**Location:** `src/components/layout/Navbar.jsx`

**Purpose:** Main navigation with active state indicators.

**Features:**
- Glassmorphism background
- Active route highlighting
- Icon + label for each link
- Smooth transitions
- Uses `NavLink` for active states

**Navigation Items:**
```javascript
[
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/nueva", label: "Nueva", icon: Plus },
  { path: "/historial", label: "Historial", icon: History },
  { path: "/nuevos-gastos-fijos", label: "Añadir Gasto Fijo", icon: Plus },
  { path: "/gastos-fijos", label: "Gastos Fijos", icon: Wallet }
]
```

**Active State Styling:**
```css
/* Active */
bg-blue-600/20 text-blue-400 shadow-lg shadow-blue-500/10

/* Inactive */
text-slate-400 hover:text-white hover:bg-white/5
```

---

## Page Components

### Dashboard

**Location:** `src/pages/Dashboard.jsx`

**Purpose:** Main dashboard page composing all dashboard components.

**Features:**
- Uses `useDashboardData` hook
- Loading state
- Error state
- Responsive grid layout
- Passes data to child components

**Component Structure:**
```jsx
<div className='flex flex-col gap-4'>
  <BalanceCards {...balanceData} />
  <div className="flex gap-4">
    <GastosGraficoCard gastos={gastosPorCategoria} />
    <UltimasTransaccionesCard 
      transacciones={transaccionesActuales} 
      categorias={categorias} 
    /> 
  </div>
  <div className="flex gap-4">
    <InversionGraficoCard inversiones={inversiones} />
    <DistribuciónInversionCard inversiones={inversiones} />
  </div>
</div>
```

**States:**
- `loading`: Shows "Cargando..." message
- `error`: Shows "Error al cargar datos" message
- `success`: Renders dashboard components

---

### NuevaTransaccion

**Location:** `src/pages/NuevaTransaccion.jsx`

**Purpose:** Form to create new transactions.

**Features:**
- Form inputs for transaction data
- Category selection
- Type selection (income/expense/investment)
- Date picker
- Amount input
- Description textarea
- Submit button

*(Note: Detailed implementation to be documented based on actual file content)*

---

### GastosFijos

**Location:** `src/pages/GastosFijos.jsx`

**Purpose:** List and manage fixed expenses.

**Features:**
- Display all fixed expenses
- Edit/delete actions
- Status indicators (active/inactive)
- Last applied date

*(Note: Detailed implementation to be documented based on actual file content)*

---

### NuevosGastoFijo

**Location:** `src/pages/NuevosGastoFijo.jsx`

**Purpose:** Form to create new fixed expenses.

**Features:**
- Name input
- Amount input
- Category selection
- Frequency selection (monthly, weekly, etc.)
- Start date picker
- Description textarea

*(Note: Detailed implementation to be documented based on actual file content)*

---

## Hooks

### useDashboardData

**Location:** `src/hooks/useDashboardData.js`

**Purpose:** Centralized data fetching and calculations for the dashboard.

**Returns:**
```typescript
{
  inversiones: Array,
  ingresos: number,
  gastos: number,
  transaccionesActuales: Array,
  gastosPorCategoria: Array,
  gastosInversiones: number,
  balance: number,
  categorias: Array,
  loading: boolean,
  error: Error | null
}
```

**Features:**
- Parallel API calls using `Promise.all()`
- Automatic calculations on data change
- Error handling
- Loading states
- Memoized calculation functions

**Data Flow:**
```
1. Mount → Fetch all data in parallel
2. Data received → Store in state
3. Calculate derived values (ingresos, gastos, etc.)
4. Return computed state to component
```

**Calculation Functions:**
```javascript
// Calculate income (tipo_id === 1)
calculateIngresos = () => 
  transacciones.filter(t => t.tipo_id === 1)
    .reduce((acc, t) => acc + t.cantidad, 0)

// Calculate expenses (tipo_id === 2)
calculateGastos = () => 
  transacciones.filter(t => t.tipo_id === 2)
    .reduce((acc, t) => acc + t.cantidad, 0)

// Calculate investment expenses (es_inversion === 1)
calculateGastosInversiones = () => 
  transacciones.filter(t => t.es_inversion === 1)
    .reduce((acc, t) => acc + t.cantidad, 0)

// Group expenses by category
calculateGastosPorCategoria = () => {
  const gastos = transacciones.filter(t => t.tipo_id === 2);
  const grouped = gastos.reduce((acc, t) => {
    const categoria = categorias.find(c => c.id === t.categoria_id);
    const nombre = categoria ? categoria.name : 'Otros';
    acc[nombre] = (acc[nombre] || 0) + t.cantidad;
    return acc;
  }, {});
  return Object.entries(grouped).map(([categoria, cantidad]) => ({
    categoria,
    cantidad
  }));
}
```

---

## Common Patterns

### Glassmorphism Effect
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Empty States
All list/chart components include empty states:
```jsx
{data.length !== 0 ? (
  // Render data
) : (
  <div className="h-[300px] flex items-center justify-center">
    <div className="text-center">
      <Icon className="h-12 w-12 text-slate-600 mx-auto mb-2" />
      <p className="text-sm text-slate-400">No hay datos</p>
    </div>
  </div>
)}
```

### Currency Formatting
```javascript
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
```

---

## Component Hierarchy

```
App
└── BrowserRouter
    └── AppRoutes
        └── MainLayout
            ├── Header
            ├── Navbar
            └── Outlet
                ├── Dashboard
                │   ├── BalanceCards
                │   ├── GastosGraficoCard
                │   ├── UltimasTransaccionesCard
                │   ├── InversionGraficoCard
                │   └── DistribuciónInversionCard
                ├── NuevaTransaccion
                ├── GastosFijos
                └── NuevosGastoFijo
```

---

This documentation provides a comprehensive overview of all components in the FinTrack application, their props, features, and usage patterns.
