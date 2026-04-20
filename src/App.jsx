import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import IndustryPage from "./pages/IndustryPage";
import InsightDetail from "./pages/InsightDetail";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/services/:slug" element={<IndustryPage />} />
        <Route path="/insights/:slug" element={<InsightDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
