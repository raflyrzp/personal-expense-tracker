import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteExpense, fetchExpenses } from "../api";

const CATEGORIES = ["Food", "Transport", "Shopping", "Other"];

export default function IndexPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function load(category = "All") {
    setLoading(true);
    setError("");
    try {
      const data = await fetchExpenses(category);
      setExpenses(data);
    } catch (e) {
      setError(e?.message || "Failed to load expenses.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(filter);
  }, [filter]);

  const total = useMemo(() => {
    return expenses.reduce((sum, e) => sum + Number(e.amount), 0).toFixed(2);
  }, [expenses]);

  async function handleDelete(id) {
    setError("");
    setSuccess("");
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      setSuccess("Expense deleted.");
    } catch (e) {
      setError(e.error || "Failed to delete expense.");
    }
  }

  return (
    <div className="d-grid gap-3">
      <div>
        <h1>All Expenses</h1>
        <div className="mt-3">
          <Link to="/create" className="btn btn-primary">
            + Add Expense
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Filter by category</label>
            <div className="d-flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="form-select"
                style={{ maxWidth: 220 }}
              >
                <option value="All">All</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setFilter("All")}
                className="btn btn-outline-secondary"
              >
                Reset
              </button>
              <div className="ms-auto">
                <div className="text-muted small">Total</div>
                <div className="fs-4 fw-semibold">${total}</div>
              </div>
            </div>
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          {loading ? (
            <p className="text-muted">Loading...</p>
          ) : expenses.length === 0 ? (
            <p className="text-muted">No expenses found.</p>
          ) : (
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Timestamp</th>
                  <th style={{ width: 160 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id}>
                    <td className="fw-semibold">
                      ${Number(e.amount).toFixed(2)}
                    </td>
                    <td>{e.description}</td>
                    <td>
                      <span className="badge bg-primary">{e.category}</span>
                    </td>
                    <td className="text-muted">
                      {new Date(e.created_at).toLocaleString()}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/edit/${e.id}`}
                          className="btn btn-success btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(e.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
