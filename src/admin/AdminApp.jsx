import { Route, Routes } from "react-router-dom";
import AdminAuth, { useAdminAuth } from "./components/AdminAuth";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import SettingsEditor from "./pages/SettingsEditor";
import CollectionEditor from "./pages/CollectionEditor";
import SubmissionsEditor from "./pages/SubmissionsEditor";

function AdminApp() {
  const { authed, ready } = useAdminAuth();

  if (!ready) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          color: "#E7C98A",
          background: "#0b0f1a",
          fontSize: "14px",
        }}
      >
        Loading…
      </div>
    );
  }

  if (!authed) {
    return <AdminAuth />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<SettingsEditor />} />
        <Route path="submissions" element={<SubmissionsEditor />} />
        <Route path="collections/:key" element={<CollectionEditor />} />
      </Route>
    </Routes>
  );
}

export default AdminApp;
