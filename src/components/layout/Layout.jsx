import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ContactModal from "../common/ContactModal";
import FloatingWhatsApp from "../common/FloatingWhatsApp";
import { initAnalytics, trackPageView } from "../../utils/analytics";

function Layout() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "#fff",
      }}
    >
      <Navbar />
      <Outlet />
      <Footer />
      <ContactModal />
      <FloatingWhatsApp />
    </div>
  );
}

export default Layout;
