import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm.jsx";
import { fetchExpense, updateExpense, getErrorMessage } from "../api";

export default function EditPage({ onSuccess }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState(null);
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchExpense(id)
      .then((data) => {
        if (mounted)
          setInitial({
            amount: Number(data.amount).toFixed(2),
            description: data.description,
            category: data.category,
          });
      })
      .catch(() => setServerError("Failed to load expense."))
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleUpdate(payload) {
    setSubmitting(true);
    setServerError("");
    try {
      await updateExpense(id, payload);
      onSuccess?.("Expense updated.");
      navigate("/", { state: { success: "Expense updated." } });
    } catch (e) {
      setServerError(getErrorMessage(e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="d-grid gap-3">
      <div>
        <h1>Edit Expense</h1>
        <p className="text-muted">Update your expense details.</p>
      </div>

      <div className="card">
        <div className="card-body">
          {loading ? (
            <p className="text-muted">Loading...</p>
          ) : initial ? (
            <ExpenseForm
              initialValues={initial}
              onSubmit={handleUpdate}
              submitting={submitting}
              submitText="Update"
            />
          ) : (
            <p className="text-danger">Expense not found.</p>
          )}
          {serverError && (
            <div className="alert alert-danger mt-3 py-2">{serverError}</div>
          )}
        </div>
      </div>
    </div>
  );
}
