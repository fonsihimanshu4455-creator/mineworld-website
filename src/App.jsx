import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import IndustryPage from "./pages/IndustryPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/services/:slug" element={<IndustryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
