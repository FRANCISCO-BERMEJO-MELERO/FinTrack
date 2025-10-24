import React, { useState, useEffect } from "react";
import { CalendarSync, Save, X } from "lucide-react";


export default function NuevoGastoFijo() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/categorias")
            .then((res) => res.json())
            .then((data) => setCategorias(data))
            .catch((err) => console.error("Error al cargar categorías:", err));
    }, []);

    // Campos del formulario
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [frecuencia, setFrecuencia] = useState("mensual");
    const [activo, setActivo] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            nombre,
            cantidad: parseFloat(cantidad),
            categoria_id: Number(categoria),
            tipo_id: 2, // gasto
            fecha_inicio: fechaInicio || new Date().toISOString().split("T")[0],
            descripcion,
            frecuencia,
            activo: activo ? 1 : 0,
        };

        fetch("http://localhost:3000/gastosFijos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("✅ Gasto fijo registrado:", data);
                alert("Gasto fijo guardado correctamente ✅");
                setNombre("");
                setCantidad("");
                setCategoria("");
                setFechaInicio("");
                setDescripcion("");
                setFrecuencia("mensual");
                setActivo(true);
            })
            .catch((err) => console.error("❌ Error al guardar gasto fijo:", err));
    };

    return (
        <div className="flex flex-col gap-8 border border-neutral-500 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-neutral-300 flex items-center gap-2">
                <CalendarSync className="w-6 h-6 text-amber-400" />
                Nuevo gasto fijo
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Nombre */}
                <CampoTexto
                    id="nombre"
                    label="Nombre del gasto"
                    placeholder="Ej: Alquiler, Netflix..."
                    value={nombre}
                    onChange={setNombre}
                    required
                />

                {/* Cantidad */}
                <CampoTexto
                    id="cantidad"
                    label="Monto"
                    type="number"
                    placeholder="0.00"
                    value={cantidad}
                    onChange={setCantidad}
                    required
                />

                {/* Categoría */}
                <div className="space-y-2">
                    <label htmlFor="categoria" className="text-sm text-neutral-400">
                        Categoría <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 focus:border-neutral-400 cursor-pointer"
                    >
                        <option value="">Selecciona una categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Fecha de inicio */}
                <CampoTexto
                    id="fechaInicio"
                    label="Fecha de inicio"
                    type="date"
                    value={fechaInicio}
                    onChange={setFechaInicio}
                    required
                />

                {/* Frecuencia */}
                <div className="space-y-2">
                    <label htmlFor="frecuencia" className="text-sm text-neutral-400">
                        Frecuencia
                    </label>
                    <select
                        id="frecuencia"
                        value={frecuencia}
                        onChange={(e) => setFrecuencia(e.target.value)}
                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 focus:border-neutral-400 cursor-pointer"
                    >
                        <option value="mensual">Mensual</option>
                        <option value="trimestral">Trimestral</option>
                        <option value="anual">Anual</option>
                    </select>
                </div>

                {/* Descripción */}
                <CampoTexto
                    id="descripcion"
                    label="Descripción (opcional)"
                    type="textarea"
                    placeholder="Ej: se descuenta el 1 de cada mes..."
                    value={descripcion}
                    onChange={setDescripcion}
                />

                {/* Activo */}
                <div className="flex items-center gap-2">
                    <input
                        id="activo"
                        type="checkbox"
                        checked={activo}
                        onChange={() => setActivo(!activo)}
                    />
                    <label htmlFor="activo" className="text-neutral-400">
                        Activo (se descontará automáticamente cada mes)
                    </label>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 bg-amber-500 hover:bg-amber-600 text-white"
                    >
                        <Save className="h-4 w-4" />
                        Guardar gasto fijo
                    </button>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-500 rounded-xl text-neutral-400 hover:bg-neutral-700/50 transition-all"
                    >
                        <X className="h-4 w-4" />
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

/* 🔹 Subcomponente reutilizable para campos */
function CampoTexto({ id, label, type = "text", placeholder, value, onChange, required }) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-sm text-neutral-400">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {type === "textarea" ? (
                <textarea
                    id={id}
                    rows={3}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-400 resize-none"
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-400"
                />
            )}
        </div>
    );
}
