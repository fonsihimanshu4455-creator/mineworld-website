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

function App() {
  return (
    <Routes>
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
      </Route>
    </Routes>
  );
}

export default App;
