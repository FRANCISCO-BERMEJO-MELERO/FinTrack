import React from 'react'
import { Target, Calendar, TrendingUp, Edit2, Trash2, Check } from 'lucide-react'

const CATEGORY_COLORS = {
    'Ahorro General': '#6366F1',
    'Viajes': '#3B82F6',
    'Vivienda': '#10B981',
    'Vehículo': '#F59E0B',
    'Educación': '#8B5CF6',
    'Eventos': '#EC4899',
    'Otros': '#6B7280'
};

export default function GoalCard({ goal, onEdit, onDelete }) {
    const progress = goal.cantidad_objetivo > 0
        ? Math.min((goal.cantidad_actual / goal.cantidad_objetivo) * 100, 100)
        : 0;

    const remaining = Math.max(goal.cantidad_objetivo - goal.cantidad_actual, 0);

    const getProgressColor = () => {
        if (progress >= 100) return 'bg-green-500';
        if (progress >= 75) return 'bg-green-400';
        if (progress >= 25) return 'bg-yellow-400';
        return 'bg-red-400';
    };

    const getDaysRemaining = () => {
        if (!goal.fecha_limite) return null;
        const today = new Date();
        const deadline = new Date(goal.fecha_limite);
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysRemaining = getDaysRemaining();

    return (
        <div className="glass-panel p-6 hover:bg-white/10 transition-all duration-300 border border-white/10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                    <div
                        className="p-3 rounded-xl"
                        style={{
                            backgroundColor: `${CATEGORY_COLORS[goal.categoria] || '#6B7280'}20`,
                        }}
                    >
                        <Target
                            className="h-5 w-5"
                            style={{ color: CATEGORY_COLORS[goal.categoria] || '#6B7280' }}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-200 truncate">{goal.nombre}</h3>
                            {goal.completado === 1 && (
                                <span className="flex items-center gap-1 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-md border border-green-500/30">
                                    <Check className="h-3 w-3" />
                                    Completado
                                </span>
                            )}
                        </div>
                        {goal.descripcion && (
                            <p className="text-sm text-slate-400 line-clamp-2">{goal.descripcion}</p>
                        )}
                        <span
                            className="inline-block mt-2 text-xs px-2 py-1 rounded-md border"
                            style={{
                                backgroundColor: `${CATEGORY_COLORS[goal.categoria] || '#6B7280'}20`,
                                borderColor: `${CATEGORY_COLORS[goal.categoria] || '#6B7280'}40`,
                                color: CATEGORY_COLORS[goal.categoria] || '#6B7280'
                            }}
                        >
                            {goal.categoria}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-2">
                    <button
                        onClick={() => onEdit(goal)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-blue-400"
                        title="Editar objetivo"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(goal.id)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-red-400"
                        title="Eliminar objetivo"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Progreso</span>
                    <span className="text-sm font-semibold text-slate-200">{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                    <div
                        className={`h-full ${getProgressColor()} transition-all duration-500 rounded-full`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Amounts */}
            <div className="flex items-center justify-between mb-3">
                <div>
                    <p className="text-xs text-slate-500">Actual</p>
                    <p className="text-lg font-semibold text-slate-200">{goal.cantidad_actual}€</p>
                </div>
                <TrendingUp className="h-5 w-5 text-slate-600" />
                <div className="text-right">
                    <p className="text-xs text-slate-500">Objetivo</p>
                    <p className="text-lg font-semibold text-slate-200">{goal.cantidad_objetivo}€</p>
                </div>
            </div>

            {/* Remaining amount */}
            {remaining > 0 && (
                <div className="text-center py-2 px-3 bg-white/5 rounded-lg border border-white/5">
                    <p className="text-xs text-slate-500">Faltan</p>
                    <p className="text-sm font-semibold text-slate-300">{remaining.toFixed(2)}€</p>
                </div>
            )}

            {/* Deadline */}
            {goal.fecha_limite && (
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="h-4 w-4" />
                    <span>
                        {daysRemaining !== null && daysRemaining >= 0 ? (
                            <span className={daysRemaining < 30 ? 'text-orange-400' : ''}>
                                {daysRemaining} días restantes
                            </span>
                        ) : (
                            <span className="text-red-400">Fecha límite pasada</span>
                        )}
                    </span>
                </div>
            )}
        </div>
    );
}
