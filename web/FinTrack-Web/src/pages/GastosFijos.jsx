import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Pause, Play, RefreshCw } from "lucide-react";

export default function GastosFijos() {
    const [gastos, setGastos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(null);

    // Cargar gastos fijos
    const cargarGastos = () => {
        setLoading(true);
        fetch("http://localhost:3000/gastosFijos")
            .then((res) => res.json())
            .then((data) => {
                setGastos(data);
                setLoading(false);
            })
            .catch((err) => console.error("Error al cargar gastos fijos:", err));
    };

    useEffect(() => {
        cargarGastos();
    }, []);

    const toggleActivo = (gasto) => {
        fetch(`http://localhost:3000/gastosFijos/${gasto.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ activo: gasto.activo ? 0 : 1 }),
        })
            .then(() => cargarGastos())
            .catch((err) => console.error("Error al actualizar estado:", err));
    };

    const eliminarGasto = (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este gasto fijo?")) return;
        fetch(`http://localhost:3000/gastosFijos/${id}`, { method: "DELETE" })
            .then(() => cargarGastos())
            .catch((err) => console.error("Error al eliminar gasto fijo:", err));
    };

    const guardarEdicion = (id, nuevosDatos) => {
        fetch(`http://localhost:3000/gastosFijos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevosDatos),
        })
            .then(() => {
                setEditando(null);
                cargarGastos();
            })
            .catch((err) => console.error("Error al editar gasto fijo:", err));
    };

    const sincronizar = () => {
        fetch("http://localhost:3000/gastosFijos/sincronizar")
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                cargarGastos();
            })
            .catch((err) => console.error("Error al sincronizar:", err));
    };

    if (loading) {
        return <p className="text-neutral-400">Cargando gastos fijos...</p>;
    }

    return (
        <div className="flex flex-col gap-8 border border-neutral-600 rounded-2xl p-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-amber-400">
                    Gastos Fijos Mensuales
                </h2>
                <button
                    onClick={sincronizar}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition-all"
                >
                    <RefreshCw className="w-4 h-4" />
                    Sincronizar
                </button>
            </div>

            {gastos.length === 0 ? (
                <p className="text-neutral-400 text-center">
                    No tienes gastos fijos registrados aún.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-neutral-300 border-collapse">
                        <thead>
                            <tr className="text-neutral-400 border-b border-neutral-700">
                                <th className="text-left py-3">Nombre</th>
                                <th className="text-right py-3">Monto</th>
                                <th className="text-left py-3">Frecuencia</th>
                                <th className="text-left py-3">Estado</th>
                                <th className="text-left py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gastos.map((gasto) => (
                                <tr
                                    key={gasto.id}
                                    className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors"
                                >
                                    {/* Nombre */}
                                    <td className="py-3">
                                        {editando === gasto.id ? (
                                            <input
                                                type="text"
                                                value={gasto.nombre_editado ?? gasto.nombre}
                                                onChange={(e) =>
                                                    setGastos((prev) =>
                                                        prev.map((g) =>
                                                            g.id === gasto.id
                                                                ? { ...g, nombre_editado: e.target.value }
                                                                : g
                                                        )
                                                    )
                                                }
                                                className="bg-neutral-800 border border-neutral-600 rounded-lg px-2 py-1 text-neutral-200 w-full"
                                            />
                                        ) : (
                                            gasto.nombre
                                        )}
                                    </td>

                                    {/* Monto */}
                                    <td className="py-3 text-right">
                                        {editando === gasto.id ? (
                                            <input
                                                type="number"
                                                value={gasto.cantidad_editado ?? gasto.cantidad}
                                                onChange={(e) =>
                                                    setGastos((prev) =>
                                                        prev.map((g) =>
                                                            g.id === gasto.id
                                                                ? { ...g, cantidad_editado: e.target.value }
                                                                : g
                                                        )
                                                    )
                                                }
                                                className="bg-neutral-800 border border-neutral-600 rounded-lg px-2 py-1 text-neutral-200 w-24 text-right"
                                            />
                                        ) : (
                                            `$${Number(gasto.cantidad).toFixed(2)}`
                                        )}
                                    </td>

                                    {/* Frecuencia */}
                                    <td className="py-3">
                                        {editando === gasto.id ? (
                                            <select
                                                value={gasto.frecuencia_editado ?? gasto.frecuencia}
                                                onChange={(e) =>
                                                    setGastos((prev) =>
                                                        prev.map((g) =>
                                                            g.id === gasto.id
                                                                ? { ...g, frecuencia_editado: e.target.value }
                                                                : g
                                                        )
                                                    )
                                                }
                                                className="bg-neutral-800 border border-neutral-600 rounded-lg px-2 py-1 text-neutral-200"
                                            >
                                                <option value="mensual">Mensual</option>
                                                <option value="trimestral">Trimestral</option>
                                                <option value="anual">Anual</option>
                                            </select>
                                        ) : (
                                            gasto.frecuencia
                                        )}
                                    </td>

                                    {/* Estado */}
                                    <td className="py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${gasto.activo
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-red-500/10 text-red-400"
                                                }`}
                                        >
                                            {gasto.activo ? "Activo" : "Pausado"}
                                        </span>
                                    </td>

                                    {/* Acciones */}
                                    <td className="py-3 flex gap-2">
                                        {editando === gasto.id ? (
                                            <button
                                                onClick={() =>
                                                    guardarEdicion(gasto.id, {
                                                        nombre:
                                                            gasto.nombre_editado ?? gasto.nombre,
                                                        cantidad:
                                                            gasto.cantidad_editado ?? gasto.cantidad,
                                                        frecuencia:
                                                            gasto.frecuencia_editado ?? gasto.frecuencia,
                                                    })
                                                }
                                                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs"
                                            >
                                                Guardar
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setEditando(gasto.id)}
                                                className="p-2 rounded-lg hover:bg-neutral-700 text-neutral-400"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        )}

                                        <button
                                            onClick={() => toggleActivo(gasto)}
                                            className={`p-2 rounded-lg ${gasto.activo
                                                    ? "hover:bg-red-500/20 text-red-400"
                                                    : "hover:bg-green-500/20 text-green-400"
                                                }`}
                                        >
                                            {gasto.activo ? (
                                                <Pause className="w-4 h-4" />
                                            ) : (
                                                <Play className="w-4 h-4" />
                                            )}
                                        </button>

                                        <button
                                            onClick={() => eliminarGasto(gasto.id)}
                                            className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
