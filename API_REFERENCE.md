# FinTrack API Reference

## Base URL
```
http://localhost:3000
```

## Table of Contents
- [Transacciones (Transactions)](#transacciones)
- [Categorías (Categories)](#categorías)
- [Gastos Fijos (Fixed Expenses)](#gastos-fijos)
- [Tipos (Types)](#tipos)

---

## Transacciones

### GET `/transacciones`
Obtiene todas las transacciones ordenadas por fecha de creación (más recientes primero).

**Response:**
```json
[
  {
    "id": 1,
    "tipo_id": 1,
    "cantidad": 1500.00,
    "categoria_id": 1,
    "fecha": "2025-01-15",
    "descripcion": "Salario mensual",
    "es_inversion": 0,
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T10:00:00.000Z"
  }
]
```

---

### GET `/transacciones/inversiones`
Obtiene todas las inversiones (tipo_id = 3).

**Response:**
```json
[
  {
    "id": 5,
    "tipo_id": 3,
    "cantidad": 500.00,
    "categoria_id": 4,
    "fecha": "2025-01-20",
    "descripcion": "Compra BTC",
    "es_inversion": 1,
    "tipo_inversion": "Criptomonedas",
    "plataforma": "Binance",
    "activo": "BTC",
    "unidades": 0.01,
    "valor_unitario": 50000,
    "moneda": "USD",
    "createdAt": "2025-01-20T14:30:00.000Z",
    "updatedAt": "2025-01-20T14:30:00.000Z"
  }
]
```

---

### GET `/transacciones/balance`
Calcula el balance total (ingresos - gastos - inversiones).

**Response:**
```json
{
  "total": 2500.50
}
```

**Calculation Logic:**
```sql
SUM(
  CASE 
    WHEN tipo_id = 1 THEN cantidad 
    WHEN tipo_id IN (2, 3) THEN -cantidad 
    ELSE 0 
  END
)
```

---

### GET `/transacciones/transacciones_actuales`
Obtiene las transacciones del mes actual.

**Response:**
```json
[
  {
    "id": 1,
    "tipo_id": 1,
    "cantidad": 1500.00,
    "categoria_id": 1,
    "fecha": "2025-01-15",
    "descripcion": "Salario",
    "createdAt": "2025-01-15T10:00:00.000Z"
  }
]
```

**Query Logic:**
- Filtra por año y mes actuales
- Usa `strftime('%Y', fecha)` y `strftime('%m', fecha)`

---

### GET `/transacciones/ingreso_actual`
Suma de ingresos del día actual.

**Response:**
```json
{
  "total": 1500.00
}
```

---

### GET `/transacciones/gasto_actual`
Suma de gastos e inversiones del mes actual.

**Response:**
```json
{
  "total": 850.00
}
```

---

### GET `/transacciones/inversion_actual`
Suma de inversiones del día actual.

**Response:**
```json
{
  "total": 500.00
}
```

---

### POST `/transacciones`
Crea una nueva transacción.

**Request Body:**
```json
{
  "tipo_id": 2,
  "cantidad": 50.00,
  "categoria_id": 3,
  "fecha": "2025-01-25",
  "descripcion": "Compra supermercado"
}
```

**Validation:**
- `tipo_id` (required): ID del tipo de transacción
- `cantidad` (required, numeric): Monto de la transacción
- `categoria_id` (required): ID de la categoría
- `fecha` (required): Fecha en formato YYYY-MM-DD
- `descripcion` (optional): Descripción de la transacción

**Response:**
```json
{
  "message": "✅ Transacción creada correctamente",
  "id": 15
}
```

**Status Codes:**
- `201`: Creado exitosamente
- `400`: Datos inválidos
- `500`: Error del servidor

---

### POST `/transacciones/inversion`
Registra una nueva inversión con detalles adicionales.

**Request Body:**
```json
{
  "tipo_id": 3,
  "cantidad": 1000.00,
  "categoria_id": 4,
  "fecha": "2025-01-25",
  "descripcion": "Compra ETF S&P 500",
  "tipo_inversion": "ETF",
  "plataforma": "Degiro",
  "activo": "SP500",
  "unidades": 10,
  "valor_unitario": 100.00,
  "moneda": "EUR"
}
```

**Additional Fields:**
- `tipo_inversion`: Tipo de inversión (Criptomonedas, ETF, Bonos, Acciones, etc.)
- `plataforma`: Plataforma de inversión (Binance, Degiro, etc.)
- `activo`: Nombre del activo (BTC, AAPL, SP500, etc.)
- `unidades`: Número de tokens/acciones
- `valor_unitario`: Precio por unidad
- `moneda`: Moneda (USD, EUR, etc.)

**Response:**
```json
{
  "message": "✅ Inversión registrada correctamente",
  "id": 20
}
```

---

### PUT `/transacciones`
Actualiza una transacción existente.

**Request Body:**
```json
{
  "id": 15,
  "tipo_id": 2,
  "cantidad": 55.00,
  "categoria_id": 3,
  "fecha": "2025-01-25",
  "descripcion": "Compra supermercado (actualizado)"
}
```

**Response:**
```json
{
  "message": "✅ Transacción actualizada correctamente",
  "id": 15
}
```

---

### DELETE `/transacciones`
Elimina una transacción.

**Request Body:**
```json
{
  "id": 15
}
```

**Response:**
```json
{
  "message": "🗑️ Transacción eliminada",
  "id": 15
}
```

---

### GET `/transacciones/:id`
Obtiene una transacción específica por ID.

**Parameters:**
- `id`: ID de la transacción

**Response:**
```json
{
  "id": 1,
  "tipo_id": 1,
  "cantidad": 1500.00,
  "categoria_id": 1,
  "fecha": "2025-01-15",
  "descripcion": "Salario mensual",
  "createdAt": "2025-01-15T10:00:00.000Z",
  "updatedAt": "2025-01-15T10:00:00.000Z"
}
```

**Status Codes:**
- `200`: Encontrado
- `404`: No encontrado
- `500`: Error del servidor

---

## Categorías

### GET `/categorias`
Obtiene todas las categorías.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Salario",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Comida",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

### POST `/categorias`
Crea una nueva categoría.

**Request Body:**
```json
{
  "name": "Transporte"
}
```

**Response:**
```json
{
  "id": "uuid-generated-id"
}
```

---

### GET `/categorias/:id`
Obtiene una categoría específica.

**Parameters:**
- `id`: ID de la categoría

**Response:**
```json
{
  "id": 1,
  "name": "Salario",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

---

### PUT `/categorias`
Actualiza una categoría.

**Request Body:**
```json
{
  "id": 1,
  "name": "Salario Mensual"
}
```

**Response:**
```json
{
  "id": 1
}
```

---

### DELETE `/categorias`
Elimina una categoría.

**Request Body:**
```json
{
  "id": 1
}
```

**Response:**
```json
{
  "id": 1
}
```

---

## Gastos Fijos

### POST `/gastosFijos`
Crea un nuevo gasto fijo recurrente.

**Request Body:**
```json
{
  "nombre": "Netflix",
  "cantidad": 15.99,
  "categoria_id": 5,
  "tipo_id": 2,
  "fecha_inicio": "2025-01-01",
  "descripcion": "Suscripción mensual",
  "frecuencia": "mensual"
}
```

**Required Fields:**
- `nombre`: Nombre del gasto fijo
- `cantidad`: Monto
- `categoria_id`: ID de categoría
- `tipo_id`: ID de tipo
- `fecha_inicio`: Fecha de inicio

**Optional Fields:**
- `descripcion`: Descripción
- `frecuencia`: Frecuencia (default: "mensual")

**Response:**
```json
{
  "message": "✅ Gasto fijo creado correctamente",
  "id": 1
}
```

---

### GET `/gastosFijos`
Obtiene todos los gastos fijos.

**Response:**
```json
[
  {
    "id": 1,
    "nombre": "Netflix",
    "cantidad": 15.99,
    "categoria_id": 5,
    "tipo_id": 2,
    "fecha_inicio": "2025-01-01",
    "descripcion": "Suscripción mensual",
    "frecuencia": "mensual",
    "activo": 1,
    "ultimo_aplicado": "2025-01-15",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

### PUT `/gastosFijos/:id`
Actualiza un gasto fijo.

**Parameters:**
- `id`: ID del gasto fijo

**Request Body:**
```json
{
  "nombre": "Netflix Premium",
  "cantidad": 17.99,
  "categoria_id": 5,
  "tipo_id": 2,
  "descripcion": "Suscripción premium",
  "frecuencia": "mensual",
  "activo": 1
}
```

**Note:** Todos los campos son opcionales. Solo se actualizan los campos proporcionados (usando `COALESCE`).

**Response:**
```json
{
  "message": "✅ Gasto fijo actualizado correctamente"
}
```

---

### DELETE `/gastosFijos/:id`
Elimina un gasto fijo.

**Parameters:**
- `id`: ID del gasto fijo

**Response:**
```json
{
  "message": "🗑️ Gasto fijo eliminado correctamente"
}
```

---

### GET `/gastosFijos/sincronizar`
Sincroniza gastos fijos creando transacciones automáticas para el mes actual.

**Logic:**
1. Obtiene todos los gastos fijos activos
2. Verifica si ya se aplicaron este mes
3. Crea transacciones para los que no se han aplicado
4. Actualiza el campo `ultimo_aplicado`

**Response:**
```json
{
  "message": "✅ 3 gastos fijos aplicados."
}
```

**Use Case:**
- Se llama automáticamente al cargar la aplicación
- Genera transacciones mensuales recurrentes
- Evita duplicados verificando `ultimo_aplicado`

---

## Tipos

### GET `/tipos`
Obtiene todos los tipos de transacciones.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Ingreso",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Gasto",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  {
    "id": 3,
    "name": "Inversión",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

## Error Handling

### Error Response Format
```json
{
  "error": "Descripción del error"
}
```

### Common Status Codes
- `200`: OK
- `201`: Created
- `400`: Bad Request (datos inválidos)
- `404`: Not Found
- `500`: Internal Server Error

---

## Database Schema

### transacciones
```sql
CREATE TABLE transacciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo_id INTEGER NOT NULL,
  cantidad REAL NOT NULL,
  categoria_id INTEGER NOT NULL,
  fecha TEXT NOT NULL,
  descripcion TEXT,
  es_inversion INTEGER DEFAULT 0,
  tipo_inversion TEXT,
  plataforma TEXT,
  activo TEXT,
  unidades REAL,
  valor_unitario REAL,
  moneda TEXT DEFAULT 'USD',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
```

### categorias
```sql
CREATE TABLE categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
```

### gastos_fijos
```sql
CREATE TABLE gastos_fijos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  cantidad REAL NOT NULL,
  categoria_id INTEGER NOT NULL,
  tipo_id INTEGER NOT NULL,
  fecha_inicio TEXT NOT NULL,
  descripcion TEXT,
  frecuencia TEXT DEFAULT 'mensual',
  activo INTEGER DEFAULT 1,
  ultimo_aplicado TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
```

### tipos
```sql
CREATE TABLE tipos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
```

---

## Usage Examples

### Creating a Transaction
```javascript
const response = await fetch('http://localhost:3000/transacciones', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    tipo_id: 2,
    cantidad: 50.00,
    categoria_id: 3,
    fecha: '2025-01-25',
    descripcion: 'Compra supermercado'
  })
});

const data = await response.json();
console.log(data); // { message: "✅ Transacción creada correctamente", id: 15 }
```

### Getting Current Month Transactions
```javascript
const response = await fetch('http://localhost:3000/transacciones/transacciones_actuales');
const transactions = await response.json();
console.log(transactions);
```

### Syncing Fixed Expenses
```javascript
const response = await fetch('http://localhost:3000/gastosFijos/sincronizar');
const result = await response.json();
console.log(result); // { message: "✅ 3 gastos fijos aplicados." }
```

---

This API follows RESTful principles and uses JSON for all request/response bodies.
