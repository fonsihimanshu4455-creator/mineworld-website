import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AdminAuth, { useAdminAuth } from "./components/AdminAuth";
import AdminLayout from "./components/AdminLayout";
import SectionGridDashboard from "./pages/SectionGridDashboard";
import "../styles/admin-theme.css";

// Editor pages are lazy-loaded so the initial admin bundle stays small
// — admin lands on the section-grid dashboard (eager) and only pulls
// the heavy editors when admin navigates to one.
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SettingsEditor = lazy(() => import("./pages/SettingsEditor"));
const CollectionEditor = lazy(() => import("./pages/CollectionEditor"));
const SubmissionsEditor = lazy(() => import("./pages/SubmissionsEditor"));
const PreviewEditor = lazy(() => import("./pages/PreviewEditor"));
const MigrateAssets = lazy(() => import("./pages/MigrateAssets"));
const AssetLibrary = lazy(() => import("./pages/AssetLibrary"));
const HeroEditor = lazy(() => import("./pages/cms/HeroEditor"));
const FounderEditor = lazy(() => import("./pages/cms/FounderEditor"));
const FooterEditor = lazy(() => import("./pages/cms/FooterEditor"));
const ClientLogosEditor = lazy(() => import("./pages/cms/ClientLogosEditor"));
const PortfolioItemsEditor = lazy(() =>
  import("./pages/cms/PortfolioItemsEditor")
);
const TeamMembersEditor = lazy(() => import("./pages/cms/TeamMembersEditor"));
const ReelsEditor = lazy(() => import("./pages/cms/ReelsEditor"));
const PressEditor = lazy(() => import("./pages/cms/PressEditor"));
const AppsEditor = lazy(() => import("./pages/cms/AppsEditor"));
const ManifestoEditor = lazy(() => import("./pages/cms/ManifestoEditor"));
const CapabilitiesEditor = lazy(() =>
  import("./pages/cms/CapabilitiesEditor")
);
const ServicesEditor = lazy(() => import("./pages/cms/ServicesEditor"));
const ProcessEditor = lazy(() => import("./pages/cms/ProcessEditor"));
const EditingShowcaseEditor = lazy(() =>
  import("./pages/cms/EditingShowcaseEditor")
);
const CtaEditor = lazy(() => import("./pages/cms/CtaEditor"));
const NavbarEditor = lazy(() => import("./pages/cms/NavbarEditor"));
const ReviewsEditor = lazy(() => import("./pages/cms/ReviewsEditor"));

function PageFallback() {
  return (
    <div
      style={{
        padding: "60px 20px",
        textAlign: "center",
        color: "#D9B987",
        fontSize: 13,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        fontWeight: 700,
      }}
    >
      Loading editor…
    </div>
  );
}

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
          <Route index element={<SectionGridDashboard />} />
          <Route path="legacy-dashboard" element={<Suspense fallback={<PageFallback />}><Dashboard /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<PageFallback />}><SettingsEditor /></Suspense>} />
          <Route path="preview" element={<Suspense fallback={<PageFallback />}><PreviewEditor /></Suspense>} />
          <Route path="submissions" element={<Suspense fallback={<PageFallback />}><SubmissionsEditor /></Suspense>} />
          <Route path="migrate" element={<Suspense fallback={<PageFallback />}><MigrateAssets /></Suspense>} />
          <Route path="cms/assets" element={<Suspense fallback={<PageFallback />}><AssetLibrary /></Suspense>} />
          <Route path="cms/hero" element={<Suspense fallback={<PageFallback />}><HeroEditor /></Suspense>} />
          <Route path="cms/founder" element={<Suspense fallback={<PageFallback />}><FounderEditor /></Suspense>} />
          <Route path="cms/footer" element={<Suspense fallback={<PageFallback />}><FooterEditor /></Suspense>} />
          <Route path="cms/client-logos" element={<Suspense fallback={<PageFallback />}><ClientLogosEditor /></Suspense>} />
          <Route path="cms/portfolio-items" element={<Suspense fallback={<PageFallback />}><PortfolioItemsEditor /></Suspense>} />
          <Route path="cms/team-members" element={<Suspense fallback={<PageFallback />}><TeamMembersEditor /></Suspense>} />
          <Route path="cms/reels" element={<Suspense fallback={<PageFallback />}><ReelsEditor /></Suspense>} />
          <Route path="cms/press" element={<Suspense fallback={<PageFallback />}><PressEditor /></Suspense>} />
          <Route path="cms/apps" element={<Suspense fallback={<PageFallback />}><AppsEditor /></Suspense>} />
          <Route path="cms/manifesto" element={<Suspense fallback={<PageFallback />}><ManifestoEditor /></Suspense>} />
          <Route path="cms/capabilities" element={<Suspense fallback={<PageFallback />}><CapabilitiesEditor /></Suspense>} />
          <Route path="cms/services" element={<Suspense fallback={<PageFallback />}><ServicesEditor /></Suspense>} />
          <Route path="cms/process" element={<Suspense fallback={<PageFallback />}><ProcessEditor /></Suspense>} />
          <Route path="cms/editing-showcase" element={<Suspense fallback={<PageFallback />}><EditingShowcaseEditor /></Suspense>} />
          <Route path="cms/cta" element={<Suspense fallback={<PageFallback />}><CtaEditor /></Suspense>} />
          <Route path="cms/navbar" element={<Suspense fallback={<PageFallback />}><NavbarEditor /></Suspense>} />
          <Route path="cms/reviews" element={<Suspense fallback={<PageFallback />}><ReviewsEditor /></Suspense>} />
          <Route path="collections/:key" element={<Suspense fallback={<PageFallback />}><CollectionEditor /></Suspense>} />
        </Route>
      </Routes>
    </div>
  );
}

export default AdminApp;
