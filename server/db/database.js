import Database from "better-sqlite3";

const db = new Database("data/fintrack.db", { verbose: console.log });

// Crear tablas si no existen
db.exec(`
    CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tipos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS transacciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo_id INTEGER NOT NULL,
        cantidad INTEGER NOT NULL,
        categoria_id INTEGER NOT NULL,
        fecha TEXT NOT NULL,
        descripcion TEXT,
        -- 🔽 Nuevos campos para inversiones
        es_inversion INTEGER DEFAULT 0,       -- 0 = no, 1 = sí
        tipo_inversion TEXT,                  -- 'cripto', 'etf', 'bonos', 'acciones', ...
        plataforma TEXT,                      -- Binance, Degiro, eToro...
        activo TEXT,                          -- BTC, AAPL, SP500, etc.
        unidades REAL,                        -- número de acciones o tokens
        valor_unitario REAL,                  -- precio por unidad en la fecha de compra
        moneda TEXT DEFAULT 'USD',
        createdAt TEXT DEFAULT (datetime('now')),
        updatedAt TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (tipo_id) REFERENCES tipos(id),
        FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    );


    CREATE TABLE IF NOT EXISTS gastos_fijos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        cantidad REAL NOT NULL,
        categoria_id INTEGER NOT NULL,
        tipo_id INTEGER NOT NULL,              -- 2 = gasto normalmente
        fecha_inicio TEXT NOT NULL,
        descripcion TEXT,
        frecuencia TEXT DEFAULT 'mensual',     -- mensual, trimestral, anual
        activo INTEGER DEFAULT 1,              -- 1 = activo, 0 = pausado
        ultimo_aplicado TEXT,                  -- fecha última generación
        createdAt TEXT DEFAULT (datetime('now')),
        updatedAt TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (categoria_id) REFERENCES categorias(id),
        FOREIGN KEY (tipo_id) REFERENCES tipos(id)
    );

    CREATE TABLE IF NOT EXISTS objetivos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        cantidad_objetivo REAL NOT NULL,
        cantidad_actual REAL DEFAULT 0,
        fecha_limite TEXT,
        categoria TEXT,
        completado INTEGER DEFAULT 0,
        createdAt TEXT DEFAULT (datetime('now')),
        updatedAt TEXT DEFAULT (datetime('now'))
    );

`);

const seedData = () => {
    const rowCountCategorias = db.prepare("SELECT COUNT(*) as count FROM categorias").get();
    if (rowCountCategorias.count === 0) {
        console.log("Seeding categories...");
        const insertCategoria = db.prepare("INSERT INTO categorias (name) VALUES (?)");
        const categories = [
            "Comida", "Transporte", "Compras", "Entretenimiento",
            "Salud", "Educacion", "Servicios", "Otros", "Inversiones"
        ];
        categories.forEach(name => insertCategoria.run(name));
    }

    const rowCountTipos = db.prepare("SELECT COUNT(*) as count FROM tipos").get();
    if (rowCountTipos.count === 0) {
        console.log("Seeding types...");
        const insertTipo = db.prepare("INSERT INTO tipos (name) VALUES (?)");
        const types = ["Ingreso", "Gasto", "Inversion"];
        types.forEach(name => insertTipo.run(name));
    }
};

seedData();

export default db;