import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { theme } from "../../styles/theme";
import { closeContactModal } from "../../utils/contactActions";
import { trackEvent } from "../../utils/analytics";
import useIsMobile from "../../utils/useIsMobile";
import { countryCodes } from "../../data/countryCodes";
import { siteConfig } from "../../data/siteConfig";
import SuccessScreen from "./SuccessScreen";

const serviceOptions = [
  "Video Editing",
  "Podcast Shoots",
  "Graphic Design",
  "Social Media Management",
  "Meta Ads / Lead Generation",
  "Full Brand Support",
  "Other",
];

const defaultCountry =
  countryCodes.find((item) => item.iso === "IN") || countryCodes[0];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.28, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const modalVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.98,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
};

function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    countryCode: defaultCountry.dialCode,
    countryIso: defaultCountry.iso,
    phone: "",
    email: "",
    service: "",
    otherService: "",
    business: "",
  });

  const countryMenuRef = useRef(null);

  const isMobile = useIsMobile(768);

  const selectedCountry = useMemo(() => {
    return (
      countryCodes.find(
        (item) =>
          item.iso === formData.countryIso &&
          item.dialCode === formData.countryCode
      ) || defaultCountry
    );
  }, [formData.countryIso, formData.countryCode]);

  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();

    if (!query) return countryCodes;

    return countryCodes.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.iso.toLowerCase().includes(query) ||
        item.dialCode.toLowerCase().includes(query)
    );
  }, [countrySearch]);

  useEffect(() => {
    const open = () => {
      setIsOpen(true);
      setStatus("");
    };

    const close = () => {
      setIsOpen(false);
      setStatus("");
      setCountryMenuOpen(false);
      setCountrySearch("");
    };

    window.addEventListener("open-contact-modal", open);
    window.addEventListener("close-contact-modal", close);

    return () => {
      window.removeEventListener("open-contact-modal", open);
      window.removeEventListener("close-contact-modal", close);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (countryMenuOpen) {
          setCountryMenuOpen(false);
          return;
        }
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, countryMenuOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        countryMenuRef.current &&
        !countryMenuRef.current.contains(e.target)
      ) {
        setCountryMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: onlyDigits,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceSelect = (service) => {
    setFormData((prev) => ({
      ...prev,
      service,
      otherService: service === "Other" ? prev.otherService : "",
    }));
  };

  const handleCountrySelect = (country) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: country.dialCode,
      countryIso: country.iso,
    }));
    setCountryMenuOpen(false);
    setCountrySearch("");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      countryCode: defaultCountry.dialCode,
      countryIso: defaultCountry.iso,
      phone: "",
      email: "",
      service: "",
      otherService: "",
      business: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!formData.name || !formData.phone || !formData.service) {
      setStatus("Please fill required fields.");
      return;
    }

    if (formData.service === "Other" && !formData.otherService.trim()) {
      setStatus("Please enter your other service.");
      return;
    }

    const finalService =
      formData.service === "Other"
        ? `Other - ${formData.otherService}`
        : formData.service;

    const payload = {
      name: formData.name,
      phone: `${selectedCountry.flag} ${formData.countryCode} ${formData.phone}`,
      email: formData.email || "Not provided",
      service: finalService,
      business: formData.business || "Not provided",
      country: selectedCountry.name,
      source: "Mineworld Website",
    };

    try {
      setIsSending(true);

      await emailjs.send(
        "service_1zpxdxe",
        "template_6zw86b6",
        payload,
        "gA9nXoTRWrmiNsnON"
      );

      if (siteConfig?.integrations?.sheetWebhook) {
        await fetch(siteConfig.integrations.sheetWebhook, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
        });
      }

      trackEvent("form_submit", {
        service: finalService,
        country: selectedCountry.name,
      });

      resetForm();
      setIsOpen(false);
      setShowSuccess(true);
    } catch (error) {
      console.log("Submit error:", error);
      setStatus("Something went wrong. Try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <SuccessScreen
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              background: "rgba(6, 10, 18, 0.78)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? "14px" : "20px",
            }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "920px",
                maxHeight: "92vh",
                overflow: "hidden",
                borderRadius: isMobile ? "24px" : "30px",
                background:
                  "linear-gradient(135deg, rgba(18,28,44,0.98) 0%, rgba(13,21,36,0.98) 100%)",
                border: `1px solid ${theme.colors.lineStrong}`,
                boxShadow:
                  "0 28px 90px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.05)",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "0.9fr 1.1fr",
                position: "relative",
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close form"
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: `1px solid ${theme.colors.line}`,
                  background: "rgba(255,255,255,0.04)",
                  color: theme.colors.text,
                  fontSize: "20px",
                  cursor: "pointer",
                  zIndex: 5,
                }}
              >
                ×
              </button>

              <motion.div
                variants={itemVariants}
                style={{
                  position: "relative",
                  padding: isMobile ? "26px 22px 14px" : "34px 30px",
                  borderRight: isMobile
                    ? "none"
                    : `1px solid ${theme.colors.line}`,
                  borderBottom: isMobile
                    ? `1px solid ${theme.colors.line}`
                    : "none",
                  overflow: "hidden",
                  minHeight: isMobile ? "240px" : "100%",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-80px",
                    left: "-60px",
                    width: "220px",
                    height: "220px",
                    borderRadius: "50%",
                    background: "rgba(214,176,96,0.16)",
                    filter: "blur(70px)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "-70px",
                    right: "-50px",
                    width: "240px",
                    height: "240px",
                    borderRadius: "50%",
                    background: "rgba(87,120,210,0.16)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: theme.colors.goldSoft,
                        fontSize: "12px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        marginBottom: "14px",
                      }}
                    >
                      Start a Project
                    </div>

                    <h2
                      style={{
                        margin: "0 0 14px",
                        color: theme.colors.text,
                        fontSize: isMobile ? "34px" : "46px",
                        lineHeight: 1.02,
                        fontWeight: 800,
                        maxWidth: "420px",
                      }}
                    >
                      Let’s build something sharper.
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        color: theme.colors.textSoft,
                        fontSize: isMobile ? "14px" : "15px",
                        lineHeight: 1.85,
                        maxWidth: "430px",
                      }}
                    >
                      Share your requirement for editing, shoots, design, social
                      media, or digital growth. This form is built for serious
                      inquiries, not random browsing.
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: isMobile ? "24px" : "36px",
                      position: "relative",
                      height: isMobile ? "120px" : "240px",
                      borderRadius: isMobile ? "18px" : "24px",
                      border: `1px solid ${theme.colors.line}`,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      animate={{
                        x: [0, 16, 0],
                        y: [0, -10, 0],
                        rotate: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 5.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                      style={{
                        position: "absolute",
                        left: isMobile ? "18px" : "30px",
                        top: isMobile ? "22px" : "38px",
                        width: isMobile ? "72px" : "96px",
                        height: isMobile ? "72px" : "96px",
                        borderRadius: "20px",
                        background:
                          "linear-gradient(180deg, rgba(214,176,96,0.95), rgba(214,176,96,0.75))",
                        boxShadow: "0 16px 40px rgba(214,176,96,0.28)",
                      }}
                    />

                    <motion.div
                      animate={{
                        x: [0, -12, 0],
                        y: [0, 10, 0],
                      }}
                      transition={{
                        duration: 6.2,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                      style={{
                        position: "absolute",
                        right: isMobile ? "18px" : "30px",
                        bottom: isMobile ? "18px" : "26px",
                        width: isMobile ? "96px" : "160px",
                        height: isMobile ? "54px" : "72px",
                        borderRadius: "999px",
                        background:
                          "linear-gradient(180deg, rgba(87,120,210,0.9), rgba(87,120,210,0.68))",
                        boxShadow: "0 16px 34px rgba(87,120,210,0.22)",
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                style={{
                  padding: isMobile ? "22px 18px 22px" : "34px 30px",
                  overflowY: "auto",
                }}
              >
                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  Contact Form
                </div>

                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: isMobile ? "28px" : "34px",
                    lineHeight: 1.06,
                    fontWeight: 800,
                    color: theme.colors.text,
                  }}
                >
                  Tell us what you need.
                </h3>

                <p
                  style={{
                    margin: "0 0 22px",
                    color: theme.colors.textSoft,
                    fontSize: "14px",
                    lineHeight: 1.8,
                    maxWidth: "520px",
                  }}
                >
                  Fill the essentials. We will get the inquiry on email, and
                  from there the project discussion can move forward.
                </p>

                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: "14px",
                    }}
                  >
                    <Field
                      label="Full Name *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />

                    <PhoneField
                      label="Mobile Number *"
                      selectedCountry={selectedCountry}
                      phone={formData.phone}
                      onPhoneChange={handleChange}
                      countryMenuOpen={countryMenuOpen}
                      setCountryMenuOpen={setCountryMenuOpen}
                      countrySearch={countrySearch}
                      setCountrySearch={setCountrySearch}
                      filteredCountries={filteredCountries}
                      handleCountrySelect={handleCountrySelect}
                      countryMenuRef={countryMenuRef}
                      isMobile={isMobile}
                    />

                    <Field
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      type="email"
                    />

                    <ServiceSelector
                      label="Service Needed *"
                      selected={formData.service}
                      onSelect={handleServiceSelect}
                    />
                  </div>

                  <AnimatePresence>
                    {formData.service === "Other" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -6, height: 0 }}
                        transition={{ duration: 0.24 }}
                        style={{ marginTop: "14px", overflow: "hidden" }}
                      >
                        <Field
                          label="Other Service *"
                          name="otherService"
                          value={formData.otherService}
                          onChange={handleChange}
                          placeholder="Write your required service"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div style={{ marginTop: "14px" }}>
                    <Field
                      label="Business / Brand Name"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Your brand or business"
                    />
                  </div>

                  {status ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: "16px",
                        color: theme.colors.goldSoft,
                        fontSize: "14px",
                        lineHeight: 1.6,
                      }}
                    >
                      {status}
                    </motion.div>
                  ) : null}

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                      marginTop: "22px",
                    }}
                  >
                    <motion.button
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSending}
                      style={primaryButtonStyle}
                    >
                      {isSending ? "Sending..." : "Submit Inquiry"}
                    </motion.button>

                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => closeContactModal()}
                      style={secondaryButtonStyle}
                    >
                      Close
                    </motion.button>
                  </div>

                  <div
                    style={{
                      marginTop: "18px",
                      color: "rgba(255,255,255,0.52)",
                      fontSize: "12px",
                      lineHeight: 1.7,
                    }}
                  >
                    Required fields: name, mobile number, and service.
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <label style={{ display: "block" }}>
      <div style={labelStyle}>{label}</div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={inputStyle}
      />
    </label>
  );
}

function PhoneField({
  label,
  selectedCountry,
  phone,
  onPhoneChange,
  countryMenuOpen,
  setCountryMenuOpen,
  countrySearch,
  setCountrySearch,
  filteredCountries,
  handleCountrySelect,
  countryMenuRef,
  isMobile,
}) {
  return (
    <div>
      <div style={labelStyle}>{label}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "190px 1fr",
          gap: "10px",
          alignItems: "start",
        }}
      >
        <div style={{ position: "relative" }} ref={countryMenuRef}>
          <button
            type="button"
            onClick={() => setCountryMenuOpen((prev) => !prev)}
            style={{
              ...inputStyle,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              cursor: "pointer",
              paddingRight: "14px",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <span>{selectedCountry.flag}</span>
              <span style={{ fontWeight: 700 }}>{selectedCountry.iso}</span>
              <span>{selectedCountry.dialCode}</span>
            </span>

            <span style={{ fontSize: "12px", opacity: 0.8 }}>▼</span>
          </button>

          <AnimatePresence>
            {countryMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: 0,
                  width: isMobile ? "100%" : "320px",
                  minWidth: isMobile ? "100%" : "320px",
                  maxHeight: "280px",
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(16,24,40,0.98)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                  overflow: "hidden",
                  zIndex: 30,
                }}
              >
                <div style={{ padding: "12px" }}>
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search country or code"
                    style={{
                      ...inputStyle,
                      padding: "12px 14px",
                    }}
                  />
                </div>

                <div
                  style={{
                    maxHeight: "210px",
                    overflowY: "auto",
                    padding: "0 8px 8px",
                  }}
                >
                  {filteredCountries.length === 0 ? (
                    <div
                      style={{
                        padding: "12px",
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "14px",
                      }}
                    >
                      No country found.
                    </div>
                  ) : (
                    filteredCountries.map((country) => {
                      const activeCountry =
                        selectedCountry.iso === country.iso &&
                        selectedCountry.dialCode === country.dialCode;

                      return (
                        <button
                          key={`${country.iso}-${country.dialCode}`}
                          type="button"
                          onClick={() => handleCountrySelect(country)}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "10px",
                            padding: "12px 12px",
                            borderRadius: "12px",
                            background: activeCountry
                              ? "rgba(214,176,96,0.14)"
                              : "transparent",
                            border: activeCountry
                              ? "1px solid rgba(214,176,96,0.28)"
                              : "1px solid transparent",
                            color: "#FFFFFF",
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <span>{country.flag}</span>
                            <span
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {country.name}
                            </span>
                          </span>

                          <span
                            style={{
                              color: "rgba(255,255,255,0.72)",
                              flexShrink: 0,
                            }}
                          >
                            {country.dialCode}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={onPhoneChange}
          placeholder="Enter mobile number"
          style={inputStyle}
        />
      </div>
    </div>
  );
}

function ServiceSelector({ label, selected, onSelect }) {
  return (
    <div>
      <div style={labelStyle}>{label}</div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {serviceOptions.map((service) => {
          const active = selected === service;

          return (
            <button
              key={service}
              type="button"
              onClick={() => onSelect(service)}
              style={{
                padding: "11px 14px",
                borderRadius: "999px",
                border: active
                  ? "1px solid rgba(214,176,96,0.85)"
                  : "1px solid rgba(255,255,255,0.10)",
                background: active
                  ? "rgba(214,176,96,0.16)"
                  : "rgba(255,255,255,0.04)",
                color: active ? theme.colors.goldSoft : theme.colors.text,
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.22s ease",
              }}
            >
              {service}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const labelStyle = {
  marginBottom: "8px",
  color: "#EAE6DD",
  fontSize: "14px",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  color: "#FFFFFF",
  padding: "14px 16px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  transition: "all 0.22s ease",
};

const primaryButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "14px 22px",
  background: "#D6B060",
  color: "#1B1B1B",
  fontSize: "15px",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 16px 34px rgba(214,176,96,0.24)",
};

const secondaryButtonStyle = {
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "999px",
  padding: "14px 22px",
  background: "rgba(255,255,255,0.03)",
  color: "#FFFFFF",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
};

export default ContactModal;