import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm.jsx";
import { createExpense, getErrorMessage } from "../api";

export default function CreatePage({ onSuccess }) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  async function handleCreate(payload) {
    setSubmitting(true);
    setServerError("");
    try {
      await createExpense(payload);
      onSuccess?.();
      navigate("/", { state: { success: "Expense added." } });
    } catch (e) {
      setServerError(getErrorMessage(e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="d-grid gap-3">
      <div>
        <h1>Create Expense</h1>
        <p className="text-muted">Add a new expense to your list.</p>
      </div>

      <div className="card">
        <div className="card-body">
          <ExpenseForm
            onSubmit={handleCreate}
            submitting={submitting}
            submitText="Add"
          />
          {serverError && (
            <div className="alert alert-danger mt-3 py-2">{serverError}</div>
          )}
        </div>
      </div>
    </div>
  );
}
