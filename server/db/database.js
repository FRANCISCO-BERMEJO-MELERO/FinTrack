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
`);

db.exec(`
    INSERT INTO categorias (name) VALUES ('Comida');
    INSERT INTO categorias (name) VALUES ('Transporte');
    INSERT INTO categorias (name) VALUES ('Compras');
    INSERT INTO categorias (name) VALUES ('Entretenimiento');
    INSERT INTO categorias (name) VALUES ('Salud');
    INSERT INTO categorias (name) VALUES ('Educacion');
    INSERT INTO categorias (name) VALUES ('Servicios');
    INSERT INTO categorias (name) VALUES ('Otros');
    INSERT INTO categorias (name) VALUES ('Inversiones');
    INSERT INTO tipos (name) VALUES ('Ingreso');
    INSERT INTO tipos (name) VALUES ('Gasto');
    INSERT INTO tipos (name) VALUES ('Inversion');
`);

export default db;