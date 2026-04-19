import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ContactModal from "./components/common/ContactModal";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp";
import FloatingAppointment from "./components/common/FloatingAppointment";
import ScrollProgress from "./components/common/ScrollProgress";
import AdminPanel from "./components/admin/AdminPanel";
import { SiteContentProvider } from "./context/SiteContent";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";

function App() {
  return (
    <SiteContentProvider>
      <BrowserRouter>
        <div
          style={{
            minHeight: "100vh",
            background: "#111827",
            color: "#fff",
          }}
        >
          <ScrollProgress />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
          <Footer />
          <ContactModal />
          <FloatingWhatsApp />
          <FloatingAppointment />
          <AdminPanel />
        </div>
      </BrowserRouter>
    </SiteContentProvider>
  );
}

export default App;
