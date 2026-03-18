import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../styles/theme";
import { closeContactModal } from "../../utils/contactActions";
import { siteConfig } from "../../data/siteConfig";

const serviceOptions = [
  "Video Editing",
  "Podcast Shoots",
  "Graphic Design",
  "Social Media Management",
  "Meta Ads / Lead Generation",
  "Full Brand Support",
  "Other",
];

const countryOptions = [
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+971", label: "UAE", flag: "🇦🇪" },
  { code: "+1", label: "USA", flag: "🇺🇸" },
  { code: "+44", label: "UK", flag: "🇬🇧" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+966", label: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+974", label: "Qatar", flag: "🇶🇦" },
  { code: "+968", label: "Oman", flag: "🇴🇲" },
  { code: "+965", label: "Kuwait", flag: "🇰🇼" },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
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
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    service: "",
    otherService: "",
    business: "",
  });

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  const endpointReady = useMemo(() => {
    return (
      !!siteConfig?.form?.endpoint &&
      !siteConfig.form.endpoint.includes("YOUR_FORM_ID")
    );
  }, []);

  useEffect(() => {
    const open = () => {
      setIsOpen(true);
      setStatus("");
    };

    const close = () => {
      setIsOpen(false);
      setStatus("");
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
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

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

  const resetForm = () => {
    setFormData({
      name: "",
      countryCode: "+91",
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
      setStatus("Please fill name, mobile number, and service.");
      return;
    }

    if (formData.service === "Other" && !formData.otherService.trim()) {
      setStatus("Please enter your other service.");
      return;
    }

    if (!endpointReady) {
      setStatus("Form endpoint abhi set nahi hua hai.");
      return;
    }

    const finalService =
      formData.service === "Other"
        ? `Other - ${formData.otherService}`
        : formData.service;

    try {
      setIsSending(true);

      const response = await fetch(siteConfig.form.endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: `${formData.countryCode} ${formData.phone}`,
          email: formData.email,
          service: finalService,
          business: formData.business,
        }),
      });

      if (response.ok) {
        setStatus("Form submitted successfully.");
        resetForm();

        setTimeout(() => {
          setIsOpen(false);
          setStatus("");
        }, 1400);
      } else {
        setStatus("Submission failed. Please try again.");
      }
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
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
                borderRight: isMobile ? "none" : `1px solid ${theme.colors.line}`,
                borderBottom: isMobile ? `1px solid ${theme.colors.line}` : "none",
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

                  <motion.div
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 2.8, repeat: Infinity }}
                    style={{
                      position: "absolute",
                      left: isMobile ? "106px" : "152px",
                      top: isMobile ? "26px" : "46px",
                      width: isMobile ? "110px" : "170px",
                      height: isMobile ? "14px" : "18px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.08)",
                    }}
                  />

                  <motion.div
                    animate={{ opacity: [1, 0.35, 1] }}
                    transition={{ duration: 3.2, repeat: Infinity }}
                    style={{
                      position: "absolute",
                      left: isMobile ? "106px" : "152px",
                      top: isMobile ? "52px" : "76px",
                      width: isMobile ? "86px" : "130px",
                      height: isMobile ? "10px" : "14px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.06)",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.02), transparent 30%, transparent 70%, rgba(0,0,0,0.14))",
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
              <motion.div variants={itemVariants}>
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
              </motion.div>

              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "14px",
                  }}
                >
                  <AnimatedField>
                    <Field
                      label="Full Name *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  </AnimatedField>

                  <AnimatedField>
                    <PhoneField
                      label="Mobile Number *"
                      countryCode={formData.countryCode}
                      phone={formData.phone}
                      onChange={handleChange}
                    />
                  </AnimatedField>

                  <AnimatedField>
                    <Field
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      type="email"
                    />
                  </AnimatedField>

                  <AnimatedField>
                    <ServiceSelector
                      label="Service Needed *"
                      selected={formData.service}
                      onSelect={handleServiceSelect}
                    />
                  </AnimatedField>
                </div>

                {formData.service === "Other" && (
                  <div style={{ marginTop: "14px" }}>
                    <AnimatedField>
                      <Field
                        label="Other Service *"
                        name="otherService"
                        value={formData.otherService}
                        onChange={handleChange}
                        placeholder="Write your required service"
                      />
                    </AnimatedField>
                  </div>
                )}

                <div style={{ marginTop: "14px" }}>
                  <AnimatedField>
                    <Field
                      label="Business / Brand Name"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Your brand or business"
                    />
                  </AnimatedField>
                </div>

                <AnimatePresence mode="wait">
                  {status ? (
                    <motion.div
                      key={status}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      style={{
                        marginTop: "16px",
                        color:
                          status === "Form submitted successfully."
                            ? "#7CFF9E"
                            : theme.colors.goldSoft,
                        fontSize: "14px",
                        lineHeight: 1.6,
                      }}
                    >
                      {status}
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <motion.div
                  variants={itemVariants}
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
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  style={{
                    marginTop: "18px",
                    color: "rgba(255,255,255,0.52)",
                    fontSize: "12px",
                    lineHeight: 1.7,
                  }}
                >
                  Required fields: name, mobile number, and service.
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AnimatedField({ children }) {
  return (
    <motion.div
      variants={itemVariants}
      whileFocus={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
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

function PhoneField({ label, countryCode, phone, onChange }) {
  return (
    <label style={{ display: "block" }}>
      <div style={labelStyle}>{label}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "132px 1fr",
          gap: "10px",
        }}
      >
        <select
          name="countryCode"
          value={countryCode}
          onChange={onChange}
          style={inputStyle}
        >
          {countryOptions.map((item) => (
            <option key={item.code} value={item.code}>
              {item.flag} {item.code}
            </option>
          ))}
        </select>

        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={onChange}
          placeholder="Enter mobile number"
          style={inputStyle}
        />
      </div>
    </label>
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