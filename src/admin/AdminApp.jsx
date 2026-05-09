import { Route, Routes } from "react-router-dom";
import AdminAuth, { useAdminAuth } from "./components/AdminAuth";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import SettingsEditor from "./pages/SettingsEditor";
import CollectionEditor from "./pages/CollectionEditor";
import SubmissionsEditor from "./pages/SubmissionsEditor";
import PreviewEditor from "./pages/PreviewEditor";
import MigrateAssets from "./pages/MigrateAssets";

function AdminApp() {
  const { authed, ready } = useAdminAuth();

  if (!ready) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          color: "#D9B987",
          background: "#0b0f1a",
          fontSize: "14px",
        }}
      >
        Loading…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="surface-dark" style={{ minHeight: "100vh" }}>
        <AdminAuth />
      </div>
    );
  }

  return (
    <div className="surface-dark" style={{ minHeight: "100vh" }}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<SettingsEditor />} />
          <Route path="preview" element={<PreviewEditor />} />
          <Route path="submissions" element={<SubmissionsEditor />} />
          <Route path="migrate" element={<MigrateAssets />} />
          <Route path="collections/:key" element={<CollectionEditor />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AdminApp;
