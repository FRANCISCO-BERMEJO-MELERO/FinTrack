# FinTrack Local — Diseño de interfaz (adaptado)

> Aplicación web 100% offline para registrar, visualizar y gestionar ingresos y gastos.

---

## 🎯 Objetivo

Permitir a los usuarios registrar, visualizar y gestionar sus ingresos y gastos de forma **rápida, clara y privada**. Sin login ni conexión a internet; todos los datos quedan en local.

---

## 🧩 Estructura principal (3 vistas)

### 1) Dashboard (Inicio)

* **Header**: título "FinTrack Local", indicador de estado offline (badge), botón de exportar y menú hamburguesa / ajustes.
* **Hero cards** (fila o grid responsive):

  * Ingresos (valor total)
  * Gastos (valor total)
  * Balance (ingresos − gastos) — color según positivo/negativo
* **Gráfico circular**: distribución de *gastos* por categoría (click en una porción filtra el historial).
* **Últimas 5 transacciones**: lista con icono de tipo, fecha, descripción corta y monto (positivo en verde, negativo en rojo).
* **Indicador rápido**: pequeño semáforo o chip que muestre "Balance: Positivo / Negativo".

Comportamiento: abrir la app muestra datos del `db` local; al guardar/editar/eliminar, el dashboard se actualiza instantáneamente.

### 2) Formulario de transacciones (modal o panel lateral)

**Campos**:

* Tipo: `income` | `expense` (toggle/segmented control)
* Monto: input numérico (placeholder: 0.00) — validación monto > 0
* Categoría: dropdown (lista editable en ajustes)
* Fecha: date picker (por defecto hoy)
* Descripción: input de texto (opcional)
* Cuenta (opcional): dropdown si soportas múltiples cuentas

**Botones**:

* Guardar (primario)
* Cancelar (secundario)

**Validaciones**:

* Monto obligatorio y > 0
* Fecha válida (YYYY-MM-DD)
* Mostrar errores inline y desactivar botón "Guardar" si hay errores

**UX**:

* Al guardar: animación de confirmación + toast "Transacción guardada" y la transacción aparece inmediatamente en la lista.
* Modal accesible: foco inicial en el primer campo, ESC para cerrar, `aria-modal="true"`.

### 3) Historial completo

* **Tabla** con columnas: Fecha | Tipo | Categoría | Descripción | Monto
* **Filtros en la parte superior**:

  * Tipo: All / Ingresos / Gastos
  * Categoría: dropdown
  * Rango de fechas: desde — hasta
  * Botón "Aplicar" y "Limpiar"
* **Acciones**:

  * "+ Nueva transacción" (abre modal/panel)
  * Botón eliminar (fila) → confirmación (snackbar con "Deshacer" opcional)
* **Orden**: por fecha descendente (predeterminado)
* **Paginación / carga incremental** si muchas filas (infinite scroll o paginación simple)

Comportamiento: filtros combinables; eliminar actualiza tanto historial como dashboard.

---

## 🎨 Estilo visual

**Estética**: minimalista, moderno y limpio. Mucho espacio en blanco, tipografía clara, iconografía outline.

**Paleta**:

* Fondo: `#F9FAFB`
* Texto principal: `#111827`
* Ingresos (verde): `#16A34A`
* Gastos (rojo): `#DC2626`
* Balance positivo (azul): `#2563EB`

**Tipografía**: Inter (preferible) o Roboto.

**Modo oscuro**: habilitar según `prefers-color-scheme`; invertir paleta respetando contraste (por ejemplo fondo `#0f172a`, texto `#e6eef8`).

**Iconografía**: conjunto outline (p. ej. Heroicons). Usar iconos pequeños y consistentes.

**Tokens de diseño** (ejemplo):

```json
{
  "space": {"xs":4,"sm":8,"md":16,"lg":24},
  "radius": {"sm":6,"md":12},
  "fontSizes": {"sm":12,"base":14,"lg":18,"xl":22}
}
```

---

## ⚙️ Componentes (lista y props clave)

* `AppShell` — header, nav, main, footer
* `SummaryCards` — recibe totals `{income, expense, balance}`
* `CategoryDonutChart` — prop `data` [{category, value}]
* `RecentTransactionsList` — prop `transactions` (limit 5)
* `TransactionForm` — props `initialValues, onSave, onCancel`
* `TransactionsTable` — props `transactions, onDelete, onEdit, onFilter`
* `Toast` / `Snackbar` — mostrar mensajes transitorios

**Estructura de carpetas sugerida**:

```
/src
  /components
    AppShell.jsx
    SummaryCards.jsx
    CategoryDonutChart.jsx
    TransactionForm.jsx
    TransactionsTable.jsx
    RecentTransactionsList.jsx
    Toast.jsx
  /pages
    Dashboard.jsx
    History.jsx
  /utils
    db.js      // wrappers sqlite
    formatters.js
    validators.js
```

---

## 🔁 Interacciones y micro-animaciones

* **Añadir transacción**: modal slide-in desde la derecha o fade-in; nueva fila aparece con `fade-in + slide-up`.
* **Eliminar**: fade-out + shrink; mostrar snackbar con "Transacción eliminada — Deshacer"
* **Hover en filas**: elevar sutilmente (shadow) y mostrar acciones rápidas (editar, borrar)
* **Gráfico**: al pasar por encima mostrar tooltip con % y total
* **Transiciones**: `150–220ms`, `cubic-bezier(0.2, 0.8, 0.2, 1)` para suavidad

---

## 🔒 Privacidad y almacenamiento

* **Sin login**: datos solo locales
* **Persistencia**: SQLite (`data/fintrack.db`) accedido por API local (Express + better-sqlite3)
* **Backup/Export**: botón `Exportar` → CSV / JSON. También opción para "Importar" (validar esquema antes de sobrescribir)
* **Cifrado opcional**: si añades, hacerlo en cliente antes de guardar; pedir contraseña local

---

## ♿ Accesibilidad (a11y)

* Contraste de color mínimo AA
* Labels asociados a inputs (`<label for=>`)
* Focus visible y orden lógico de tabulación
* Roles ARIA en tablas, modales y botones
* Texto alternativo en iconos y botones
* El modo oscuro debe mantener contraste y legibilidad

---

## 🧩 Casos de uso y flujos clave

1. **Registrar ingreso**: `+ Nueva transacción` → completar campos → `Guardar` → toast + actualización inmediata
2. **Eliminar gasto**: Clic en icono de borrar → confirmación → eliminar → snackbar con "Deshacer"
3. **Filtrar historial**: seleccionar Tipo = Gastos + Rango fechas → aplicar → tabla filtrada
4. **Exportar**: Clic `Exportar` → elegir formato (CSV/JSON) → descarga local

---

## 🧪 Ejemplo visual (estructura HTML simplificada)

```html
<header class="app-header">
  <h1>FinTrack Local</h1>
  <div class="header-actions">
    <button aria-label="Exportar">Exportar</button>
  </div>
</header>
<main class="container grid">
  <section class="summary-cards">...cards...</section>
  <section class="chart">...donut chart...</section>
  <section class="recent">...últimas transacciones...</section>
</main>
<footer>FinTrack Local — 100% Offline</footer>
```

---

## ✅ Recomendaciones técnicas rápidas

* UI: React + Vite + TailwindCSS (rápido para prototipar y aplicar tokens)
* Charts: Chart.js o Recharts
* API local: Express + better-sqlite3 (como previamente acordado)
* Testing: Vitest para componentes, pruebas unitarias simples
* Build: empaquetar con Electron si quieres app de escritorio más adelante

---

## 📌 Extras opcionales (ideas futuras)

* Modo "ocultar montos" para privacidad rápida
* Presupuestos por categoría con alertas
* Etiquetas (tags) y búsqueda por texto completo
* Sincronización P2P en LAN (opcional) para multi-dispositivo local

---

## Footer

`FinTrack Local — 100% Offline`

---

Si quieres, puedo:

* Generar los componentes React (con Tailwind) listos para integrar.
* Crear un prototipo en Figma/JSON para handoff de diseño.
* Exportar un styleguide (tokens, ejemplos de color y tipografía).

Dime qué prefieres que haga a continuación y lo adapto directamente.
