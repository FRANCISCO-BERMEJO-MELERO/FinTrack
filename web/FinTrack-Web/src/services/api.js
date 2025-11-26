const API_URL = "http://localhost:3000";

export const getCategories = async () => {
    const response = await fetch(`${API_URL}/categorias`);
    if (!response.ok) throw new Error("Error fetching categories");
    return response.json();
};

export const getBalance = async () => {
    const response = await fetch(`${API_URL}/transacciones/balance`);
    if (!response.ok) throw new Error("Error fetching balance");
    return response.json();
};

export const getTransactions = async () => {
    const response = await fetch(`${API_URL}/transacciones/transacciones_actuales`);
    if (!response.ok) throw new Error("Error fetching transactions");
    return response.json();
};

export const getInvestments = async () => {
    const response = await fetch(`${API_URL}/transacciones/inversiones`);
    if (!response.ok) throw new Error("Error fetching investments");
    return response.json();
};

export const syncFixedExpenses = async () => {
    const response = await fetch(`${API_URL}/gastosFijos/sincronizar`);
    // This endpoint might not return JSON or might just trigger a sync
    return response;
};

export const exportAllData = async () => {
    const response = await fetch(`${API_URL}/export`);
    if (!response.ok) throw new Error("Error exporting data");
    return response.json();
};

// Objetivos API
export const getGoals = async () => {
    const response = await fetch(`${API_URL}/objetivos`);
    if (!response.ok) throw new Error("Error fetching goals");
    return response.json();
};

export const createGoal = async (goalData) => {
    const response = await fetch(`${API_URL}/objetivos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goalData)
    });
    if (!response.ok) throw new Error("Error creating goal");
    return response.json();
};

export const updateGoal = async (goalData) => {
    const response = await fetch(`${API_URL}/objetivos`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goalData)
    });
    if (!response.ok) throw new Error("Error updating goal");
    return response.json();
};

export const deleteGoal = async (id) => {
    const response = await fetch(`${API_URL}/objetivos`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    });
    if (!response.ok) throw new Error("Error deleting goal");
    return response.json();
};
