# FinTrack - Guía de Usuario

## Introducción

FinTrack es una aplicación de gestión financiera personal que te ayuda a:
- 📊 Visualizar tus ingresos y gastos
- 💰 Controlar tu balance financiero
- 📈 Gestionar tus inversiones
- 🔄 Automatizar gastos recurrentes

---

## Tabla de Contenidos
1. [Primeros Pasos](#primeros-pasos)
2. [Dashboard](#dashboard)
3. [Crear Transacciones](#crear-transacciones)
4. [Gestionar Gastos Fijos](#gestionar-gastos-fijos)
5. [Ver Historial](#ver-historial)
6. [Consejos y Trucos](#consejos-y-trucos)

---

## Primeros Pasos

### Acceder a la Aplicación

1. Abre tu navegador web
2. Navega a `http://localhost:5173`
3. La aplicación se cargará automáticamente

### Navegación Principal

La barra de navegación en la parte superior te permite acceder a:

```
┌─────────────────────────────────────────────────────────┐
│ [Dashboard] [Nueva] [Historial] [+ Gasto Fijo] [Gastos]│
└─────────────────────────────────────────────────────────┘
```

- **Dashboard**: Vista principal con resumen financiero
- **Nueva**: Crear nueva transacción
- **Historial**: Ver todas las transacciones
- **+ Añadir Gasto Fijo**: Crear gasto recurrente
- **Gastos Fijos**: Ver y gestionar gastos recurrentes

---

## Dashboard

### Vista General

El Dashboard es tu centro de control financiero. Muestra:

#### 1. Tarjetas de Resumen

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Ingresos     │  │ Gastos       │  │ Balance      │
│ 1,500.00€    │  │ -850.00€     │  │ 2,500.50€    │
└──────────────┘  └──────────────┘  └──────────────┘
```

- **Ingresos** (verde): Total de dinero que has recibido este mes
- **Gastos** (rojo): Total de dinero que has gastado este mes
- **Balance** (azul): Tu saldo actual (ingresos - gastos)

#### 2. Gráfico de Gastos por Categoría

Un gráfico circular que muestra cómo distribuyes tus gastos:

- **Comida**: Gastos en alimentación
- **Transporte**: Gasolina, transporte público, etc.
- **Compras**: Ropa, electrónica, etc.
- **Entretenimiento**: Ocio, suscripciones, etc.
- **Salud**: Médicos, farmacia, etc.
- **Educación**: Cursos, libros, etc.
- **Servicios**: Luz, agua, internet, etc.
- **Otros**: Gastos no categorizados

**Interacción:**
- Pasa el ratón sobre cada sección para ver el monto exacto
- Los colores te ayudan a identificar rápidamente las categorías

#### 3. Últimas Transacciones

Lista de tus transacciones más recientes:

```
┌────────────────────────────────────────────┐
│ 🔼 Salario mensual           +1,500.00€   │
│    [Salario]                               │
├────────────────────────────────────────────┤
│ 🔽 Compra supermercado          -50.00€   │
│    [Comida]                                │
└────────────────────────────────────────────┘
```

- **🔼** = Ingreso (verde)
- **🔽** = Gasto (rojo)
- Cada transacción muestra descripción, categoría y monto
- Haz clic en "Añadir" para crear una nueva transacción

#### 4. Gráficos de Inversiones

**Gráfico de Inversiones:**
- Muestra la distribución de tus inversiones por tipo
- Tipos: Criptomonedas, ETF, Bonos, Acciones, etc.

**Distribución Detallada:**
- Lista completa de tus inversiones
- Agrupadas por tipo y activo
- Muestra el monto invertido en cada activo

---

## Crear Transacciones

### Transacción Normal

1. **Navega a "Nueva"** en la barra de navegación

2. **Completa el formulario:**
   - **Tipo**: Selecciona "Ingreso" o "Gasto"
   - **Cantidad**: Introduce el monto (ej: 50.00)
   - **Categoría**: Selecciona la categoría apropiada
   - **Fecha**: Selecciona la fecha de la transacción
   - **Descripción**: Añade detalles (opcional)

3. **Haz clic en "Guardar"**

### Ejemplo: Registrar un Gasto

```
Tipo: Gasto
Cantidad: 50.00
Categoría: Comida
Fecha: 2025-01-25
Descripción: Compra semanal en el supermercado
```

### Ejemplo: Registrar un Ingreso

```
Tipo: Ingreso
Cantidad: 1500.00
Categoría: Salario
Fecha: 2025-01-01
Descripción: Salario mensual enero
```

### Inversión

Para registrar una inversión:

1. **Selecciona tipo "Inversión"**

2. **Completa los campos adicionales:**
   - **Tipo de Inversión**: Criptomonedas, ETF, Bonos, Acciones, etc.
   - **Plataforma**: Binance, Degiro, etc.
   - **Activo**: BTC, AAPL, SP500, etc.
   - **Unidades**: Número de tokens/acciones
   - **Valor Unitario**: Precio por unidad
   - **Moneda**: USD, EUR, etc.

3. **Guarda la inversión**

### Ejemplo: Registrar Compra de Criptomonedas

```
Tipo: Inversión
Cantidad: 500.00
Categoría: Inversiones
Fecha: 2025-01-20
Descripción: Compra de Bitcoin

Detalles de Inversión:
- Tipo: Criptomonedas
- Plataforma: Binance
- Activo: BTC
- Unidades: 0.01
- Valor Unitario: 50,000
- Moneda: USD
```

---

## Gestionar Gastos Fijos

Los gastos fijos son gastos recurrentes que se repiten cada mes automáticamente.

### Crear un Gasto Fijo

1. **Navega a "+ Añadir Gasto Fijo"**

2. **Completa el formulario:**
   - **Nombre**: Nombre del gasto (ej: "Netflix")
   - **Cantidad**: Monto mensual
   - **Categoría**: Categoría apropiada
   - **Tipo**: Normalmente "Gasto"
   - **Fecha de Inicio**: Cuándo empieza este gasto
   - **Frecuencia**: Mensual (por defecto)
   - **Descripción**: Detalles adicionales

3. **Guarda el gasto fijo**

### Ejemplo: Suscripción a Netflix

```
Nombre: Netflix
Cantidad: 15.99
Categoría: Entretenimiento
Tipo: Gasto
Fecha de Inicio: 2025-01-01
Frecuencia: Mensual
Descripción: Suscripción premium
```

### Cómo Funcionan los Gastos Fijos

**Sincronización Automática:**
- Cada vez que abres la aplicación, se ejecuta una sincronización
- El sistema verifica si hay gastos fijos pendientes del mes actual
- Si no se han aplicado este mes, crea automáticamente las transacciones
- Esto evita tener que registrar manualmente tus gastos recurrentes

**Ejemplo:**
```
Tienes configurado: Netflix (15.99€/mes)
1 de Enero → Se crea automáticamente la transacción
1 de Febrero → Se crea automáticamente la transacción
...y así cada mes
```

### Ver y Editar Gastos Fijos

1. **Navega a "Gastos Fijos"**

2. **Verás una lista de todos tus gastos fijos:**
   - Nombre y monto
   - Categoría
   - Estado (activo/inactivo)
   - Última vez que se aplicó

3. **Acciones disponibles:**
   - **Editar**: Modificar monto, categoría, etc.
   - **Desactivar**: Pausar temporalmente
   - **Eliminar**: Borrar permanentemente

---

## Ver Historial

### Acceder al Historial

1. **Navega a "Historial"** en la barra de navegación

2. **Verás todas tus transacciones:**
   - Ordenadas por fecha (más recientes primero)
   - Filtros por tipo, categoría, fecha
   - Búsqueda por descripción

### Funciones del Historial

- **Buscar**: Encuentra transacciones específicas
- **Filtrar**: Por tipo (ingreso/gasto/inversión)
- **Ordenar**: Por fecha, monto, categoría
- **Editar**: Modificar transacciones existentes
- **Eliminar**: Borrar transacciones

---

## Consejos y Trucos

### Organización de Categorías

**Crea categorías específicas:**
- ✅ "Comida - Restaurantes"
- ✅ "Comida - Supermercado"
- ❌ Solo "Comida" (demasiado genérico)

### Descripciones Útiles

**Sé específico en las descripciones:**
- ✅ "Cena con amigos en La Tasca"
- ❌ "Comida"

Esto te ayudará a recordar y analizar tus gastos más tarde.

### Registro Regular

**Registra tus transacciones diariamente:**
- No esperes al final del mes
- Usa la app en el momento de hacer el gasto
- Aprovecha los gastos fijos para automatizar

### Análisis Mensual

**Revisa tu dashboard cada semana:**
- Identifica categorías con gastos elevados
- Ajusta tu presupuesto según patrones
- Compara mes a mes para ver progreso

### Inversiones

**Mantén un registro detallado:**
- Anota el precio de compra (valor_unitario)
- Registra la plataforma utilizada
- Actualiza cuando vendas o compres más

### Gastos Fijos

**Configura todos tus gastos recurrentes:**
- Suscripciones (Netflix, Spotify, etc.)
- Servicios (Internet, móvil, etc.)
- Seguros
- Alquiler/hipoteca

Esto te dará una visión clara de tus compromisos mensuales.

---

## Atajos de Teclado

(Funcionalidad futura)

---

## Preguntas Frecuentes

### ¿Cómo edito una transacción?
Actualmente, ve al historial, encuentra la transacción y usa el botón de editar.

### ¿Puedo exportar mis datos?
Usa el botón "Exportar datos" en el header (funcionalidad a implementar).

### ¿Los gastos fijos se crean automáticamente?
Sí, cada vez que abres la aplicación, se sincronizan automáticamente.

### ¿Puedo tener múltiples monedas?
Sí, en las inversiones puedes especificar la moneda (USD, EUR, etc.).

### ¿Cómo elimino una categoría?
Ve a la gestión de categorías y elimínala (asegúrate de no tener transacciones asociadas).

---

## Soporte

Si encuentras algún problema o tienes sugerencias:
1. Revisa esta guía
2. Consulta la documentación técnica
3. Contacta al desarrollador

---

**¡Disfruta gestionando tus finanzas con FinTrack!** 💰📊
