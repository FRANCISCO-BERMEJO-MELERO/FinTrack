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
