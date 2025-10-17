import { useState } from "react";
import { CATEGORIES } from "../api";

export default function ExpenseForm({
  initialValues,
  onSubmit,
  submitting,
  submitText = "Save",
}) {
  const [form, setForm] = useState({
    amount: initialValues?.amount ?? "",
    description: initialValues?.description ?? "",
    category: initialValues?.category ?? "Food",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const amount = Number(form.amount);
    if (isNaN(amount) || amount <= 0)
      return "Amount must be a positive number.";
    if (!form.description.trim()) return "Description is required.";
    if (!CATEGORIES.includes(form.category)) return "Invalid category.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    await onSubmit({
      amount: Number(Number(form.amount).toFixed(2)),
      description: form.description.trim(),
      category: form.category,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Amount ($)</label>
        <input
          type="number"
          name="amount"
          step="0.01"
          min="0"
          value={form.amount}
          onChange={handleChange}
          placeholder="e.g., 25.50"
          required
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="e.g., Lunch at cafe"
          required
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="form-select"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={submitting} className="btn btn-primary">
        {submitText}
      </button>

      {error && <div className="alert alert-danger mt-3 py-2">{error}</div>}
    </form>
  );
}
