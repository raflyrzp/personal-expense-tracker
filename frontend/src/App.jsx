import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import IndexPage from "./pages/Index.jsx";
import CreatePage from "./pages/Create.jsx";
import EditPage from "./pages/Edit.jsx";

export default function App() {
  const location = useLocation();
  const [flash, setFlash] = useState("");

  useEffect(() => {
    if (location.state?.success) {
      setFlash(location.state.success);
      window.history.replaceState({}, "");
    }
  }, [location]);

  return (
    <div className="min-vh-100">
      <nav className="navbar bg-white border-bottom">
        <div className="container">
          <Link to="/" className="navbar-brand fw-semibold">
            Expense Tracker
          </Link>
          <div className="d-flex gap-2">
            <Link to="/" className="btn btn-outline-secondary">
              Index
            </Link>
            <Link to="/create" className="btn btn-primary">
              Create
            </Link>
          </div>
        </div>
      </nav>

      <main className="container my-4">
        {flash && <div className="alert alert-success py-2">{flash}</div>}
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/create"
            element={
              <CreatePage onSuccess={() => setFlash("Expense added.")} />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <EditPage
                onSuccess={(msg) => setFlash(msg || "Expense updated.")}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}
