import { Route, Routes } from "react-router-dom";
import AdminAuth, { useAdminAuth } from "./components/AdminAuth";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import SettingsEditor from "./pages/SettingsEditor";
import CollectionEditor from "./pages/CollectionEditor";
import SubmissionsEditor from "./pages/SubmissionsEditor";
import PreviewEditor from "./pages/PreviewEditor";
import MigrateAssets from "./pages/MigrateAssets";
import AssetLibrary from "./pages/AssetLibrary";
import HeroEditor from "./pages/cms/HeroEditor";
import FounderEditor from "./pages/cms/FounderEditor";
import FooterEditor from "./pages/cms/FooterEditor";
import ClientLogosEditor from "./pages/cms/ClientLogosEditor";
import PortfolioItemsEditor from "./pages/cms/PortfolioItemsEditor";
import TeamMembersEditor from "./pages/cms/TeamMembersEditor";
import ReelsEditor from "./pages/cms/ReelsEditor";
import PressEditor from "./pages/cms/PressEditor";
import AppsEditor from "./pages/cms/AppsEditor";

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
          <Route path="cms/assets" element={<AssetLibrary />} />
          <Route path="cms/hero" element={<HeroEditor />} />
          <Route path="cms/founder" element={<FounderEditor />} />
          <Route path="cms/footer" element={<FooterEditor />} />
          <Route path="cms/client-logos" element={<ClientLogosEditor />} />
          <Route path="cms/portfolio-items" element={<PortfolioItemsEditor />} />
          <Route path="cms/team-members" element={<TeamMembersEditor />} />
          <Route path="cms/reels" element={<ReelsEditor />} />
          <Route path="cms/press" element={<PressEditor />} />
          <Route path="cms/apps" element={<AppsEditor />} />
          <Route path="collections/:key" element={<CollectionEditor />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AdminApp;
