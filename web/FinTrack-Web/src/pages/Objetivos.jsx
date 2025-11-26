import React, { useState, useEffect } from 'react'
import { Target, Plus, TrendingUp, Award } from 'lucide-react'
import { getGoals, createGoal, updateGoal, deleteGoal } from '../services/api'
import GoalCard from '../components/goals/GoalCard'
import GoalForm from '../components/goals/GoalForm'

export default function Objetivos() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            setLoading(true);
            const data = await getGoals();
            setGoals(data);
        } catch (error) {
            console.error('Error al cargar objetivos:', error);
            alert('Error al cargar objetivos');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateGoal = () => {
        setEditingGoal(null);
        setShowForm(true);
    };

    const handleEditGoal = (goal) => {
        setEditingGoal(goal);
        setShowForm(true);
    };

    const handleSubmit = async (goalData) => {
        try {
            if (editingGoal) {
                await updateGoal({ ...goalData, id: editingGoal.id });
            } else {
                await createGoal(goalData);
            }
            setShowForm(false);
            setEditingGoal(null);
            fetchGoals();
        } catch (error) {
            console.error('Error al guardar objetivo:', error);
            alert('Error al guardar objetivo');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este objetivo?')) {
            return;
        }

        try {
            await deleteGoal(id);
            fetchGoals();
        } catch (error) {
            console.error('Error al eliminar objetivo:', error);
            alert('Error al eliminar objetivo');
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingGoal(null);
    };

    // Statistics
    const totalGoals = goals.length;
    const completedGoals = goals.filter(g => g.completado === 1).length;
    const totalTargetAmount = goals.reduce((sum, g) => sum + g.cantidad_objetivo, 0);
    const totalCurrentAmount = goals.reduce((sum, g) => sum + g.cantidad_actual, 0);
    const overallProgress = totalTargetAmount > 0
        ? (totalCurrentAmount / totalTargetAmount) * 100
        : 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-slate-400">Cargando objetivos...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Target className="h-6 w-6 text-blue-400" />
                        <h1 className="text-2xl font-bold text-gradient">Objetivos Financieros</h1>
                    </div>
                    <button
                        onClick={handleCreateGoal}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Nuevo Objetivo
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="h-4 w-4 text-blue-400" />
                            <p className="text-sm text-slate-400">Total Objetivos</p>
                        </div>
                        <p className="text-2xl font-bold text-slate-200">{totalGoals}</p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <Award className="h-4 w-4 text-green-400" />
                            <p className="text-sm text-slate-400">Completados</p>
                        </div>
                        <p className="text-2xl font-bold text-green-400">{completedGoals}</p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-purple-400" />
                            <p className="text-sm text-slate-400">Progreso General</p>
                        </div>
                        <p className="text-2xl font-bold text-purple-400">{overallProgress.toFixed(1)}%</p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="h-4 w-4 text-orange-400" />
                            <p className="text-sm text-slate-400">Total Objetivo</p>
                        </div>
                        <p className="text-2xl font-bold text-orange-400">{totalTargetAmount.toFixed(0)}€</p>
                    </div>
                </div>
            </div>

            {/* Goals Grid */}
            {goals.length === 0 ? (
                <div className="glass-panel flex flex-col items-center justify-center py-16">
                    <Target className="h-16 w-16 text-slate-600 mb-4" />
                    <p className="text-slate-400 text-center mb-4">
                        No tienes objetivos financieros aún
                    </p>
                    <button
                        onClick={handleCreateGoal}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Crear tu primer objetivo
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {goals.map(goal => (
                        <GoalCard
                            key={goal.id}
                            goal={goal}
                            onEdit={handleEditGoal}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <GoalForm
                    goal={editingGoal}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}
