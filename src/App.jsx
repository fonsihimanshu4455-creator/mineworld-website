import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import IndustryPage from "./pages/IndustryPage";
import ServiceDetail from "./pages/ServiceDetail";
import PortfolioDetail from "./pages/PortfolioDetail";
import TeamRoleDetail from "./pages/TeamRoleDetail";
import InsightDetail from "./pages/InsightDetail";
import Insights from "./pages/Insights";
import Packages from "./pages/Packages";
import Reviews from "./pages/Reviews";

const AdminApp = lazy(() => import("./admin/AdminApp"));

function AdminFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0b0f1a",
        color: "#E7C98A",
        fontSize: "14px",
        letterSpacing: "1.4px",
      }}
    >
      Loading admin…
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<AdminFallback />}>
            <AdminApp />
          </Suspense>
        }
      />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
        <Route path="/team/:slug" element={<TeamRoleDetail />} />
        <Route path="/industries/:slug" element={<IndustryPage />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<InsightDetail />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/reviews" element={<Reviews />} />
      </Route>
    </Routes>
  );
}

export default App;
