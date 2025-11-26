import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const CATEGORIES = [
    'Ahorro General',
    'Viajes',
    'Vivienda',
    'Vehículo',
    'Educación',
    'Eventos',
    'Otros'
];

export default function GoalForm({ goal, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        cantidad_objetivo: '',
        cantidad_actual: '0',
        fecha_limite: '',
        categoria: 'Ahorro General',
        completado: 0
    });

    useEffect(() => {
        if (goal) {
            setFormData({
                ...goal,
                fecha_limite: goal.fecha_limite || '',
                cantidad_actual: goal.cantidad_actual || 0
            });
        }
    }, [goal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-panel max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-slate-200">
                        {goal ? 'Editar Objetivo' : 'Nuevo Objetivo'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Nombre del objetivo *
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            placeholder="Ej: Vacaciones 2025"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Describe tu objetivo..."
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                        />
                    </div>

                    {/* Categoría */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Categoría
                        </label>
                        <select
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Cantidad Objetivo */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Cantidad objetivo * (€)
                        </label>
                        <input
                            type="number"
                            name="cantidad_objetivo"
                            value={formData.cantidad_objetivo}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            placeholder="1000"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>

                    {/* Cantidad Actual */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Cantidad actual (€)
                        </label>
                        <input
                            type="number"
                            name="cantidad_actual"
                            value={formData.cantidad_actual}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            placeholder="0"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>

                    {/* Fecha Límite */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Fecha límite
                        </label>
                        <input
                            type="date"
                            name="fecha_limite"
                            value={formData.fecha_limite}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>

                    {/* Completado */}
                    {goal && (
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="completado"
                                id="completado"
                                checked={formData.completado === 1}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-white/10 bg-white/5 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
                            />
                            <label htmlFor="completado" className="text-sm text-slate-300">
                                Marcar como completado
                            </label>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-slate-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 btn-primary"
                        >
                            {goal ? 'Actualizar' : 'Crear'} Objetivo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
