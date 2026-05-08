import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import ContactModal from "../common/ContactModal";
import ChatWidget from "../common/ChatWidget";
import CursorEvader from "../common/CursorEvader";
import AmbientOrnaments from "../common/AmbientOrnaments";
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
        color: "#fff",
        position: "relative",
      }}
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <AmbientOrnaments />
      <CursorEvader />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </div>
      <MobileBottomNav />
      <ContactModal />
      <ChatWidget />
    </div>
  );
}

export default Layout;
