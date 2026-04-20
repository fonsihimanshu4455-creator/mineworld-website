import { Route, Routes } from "react-router-dom";
import AdminAuth, { useAdminAuth } from "./components/AdminAuth";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import SettingsEditor from "./pages/SettingsEditor";
import CollectionEditor from "./pages/CollectionEditor";

function AdminApp() {
  const { authed } = useAdminAuth();

  if (!authed) {
    return <AdminAuth />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<SettingsEditor />} />
        <Route path="collections/:key" element={<CollectionEditor />} />
      </Route>
    </Routes>
  );
}

export default AdminApp;
