import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 8000,
});

export const CATEGORIES = ["Food", "Transport", "Shopping", "Other"];

export function getErrorMessage(error) {
  if (
    error.response?.data?.message &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }
  if (error.response?.data?.errors) {
    const errs = error.response.data.errors;
    const first = Object.values(errs)[0];
    if (Array.isArray(first) && first.length > 0) return first[0];
  }
  return "Something went wrong. Please try again.";
}

export async function fetchExpenses(category = "All") {
  const params = {};
  if (category !== "All") params.category = category;
  const res = await api.get("/expenses", { params });
  return res.data;
}
export async function fetchExpense(id) {
  const res = await api.get(`/expenses/${id}`);
  return res.data;
}
export async function createExpense(payload) {
  const res = await api.post("/expenses", payload);
  return res.data;
}
export async function updateExpense(id, payload) {
  const res = await api.put(`/expenses/${id}`, payload);
  return res.data;
}
export async function deleteExpense(id) {
  const res = await api.delete(`/expenses/${id}`);
  return res.data;
}
