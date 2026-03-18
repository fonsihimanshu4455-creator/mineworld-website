import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../styles/theme";
import { closeContactModal } from "../../utils/contactActions";
import { siteConfig } from "../../data/siteConfig";
import { countryCodes } from "../../data/countryCodes";

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
  hidden: { opacity: 0, y: 30, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.97,
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
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [focusedField, setFocusedField] = useState("");
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

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  const countryMenuRef = useRef(null);

  const endpointReady = useMemo(() => {
    return (
      !!siteConfig?.form?.endpoint &&
      !siteConfig.form.endpoint.includes("YOUR_FORM_ID")
    );
  }, []);

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
    setFocusedField("");
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
          phone: `${selectedCountry.flag} ${formData.countryCode} ${formData.phone}`,
          email: formData.email,
          service: finalService,
          business: formData.business,
          country: selectedCountry.name,
        }),
      });

      if (response.ok) {
        setStatus("Form submitted successfully.");
        resetForm();

        setTimeout(() => {
          setIsOpen(false);
          setStatus("");
        }, 1600);
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
            background: "rgba(6, 10, 18, 0.72)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
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
              maxWidth: "940px",
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
            <AmbientBackground isMobile={isMobile} />

            <motion.button
              whileHover={{ scale: 1.06, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
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
                zIndex: 8,
                boxShadow: "0 0 18px rgba(255,255,255,0.06)",
              }}
            >
              ×
            </motion.button>

            <motion.div
              variants={itemVariants}
              style={{
                position: "relative",
                padding: isMobile ? "26px 22px 14px" : "34px 30px",
                borderRight: isMobile ? "none" : `1px solid ${theme.colors.line}`,
                borderBottom: isMobile ? `1px solid ${theme.colors.line}` : "none",
                overflow: "hidden",
                minHeight: isMobile ? "250px" : "100%",
                zIndex: 2,
              }}
            >
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
                  <motion.div
                    animate={{
                      opacity: [0.8, 1, 0.8],
                      letterSpacing: ["2px", "2.5px", "2px"],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      color: theme.colors.goldSoft,
                      fontSize: "12px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      marginBottom: "14px",
                    }}
                  >
                    Start a Project
                  </motion.div>

                  <motion.h2
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
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
                  </motion.h2>

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

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 6.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    marginTop: isMobile ? "24px" : "36px",
                    position: "relative",
                    height: isMobile ? "125px" : "240px",
                    borderRadius: isMobile ? "18px" : "24px",
                    border: `1px solid ${theme.colors.line}`,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                    overflow: "hidden",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
                  }}
                >
                  <motion.div
                    animate={{
                      x: [0, 18, 0],
                      y: [0, -12, 0],
                      rotate: [0, 2, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 6,
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
                        "linear-gradient(180deg, rgba(214,176,96,0.95), rgba(214,176,96,0.74))",
                      boxShadow:
                        "0 16px 40px rgba(214,176,96,0.32), 0 0 28px rgba(214,176,96,0.18)",
                    }}
                  />

                  <motion.div
                    animate={{
                      x: [0, -14, 0],
                      y: [0, 10, 0],
                      scale: [1, 1.04, 1],
                    }}
                    transition={{
                      duration: 7,
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
                      boxShadow:
                        "0 16px 34px rgba(87,120,210,0.28), 0 0 28px rgba(87,120,210,0.12)",
                    }}
                  />

                  <motion.div
                    animate={{
                      opacity: [0.35, 1, 0.35],
                      x: [0, 12, 0],
                    }}
                    transition={{
                      duration: 3.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
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
                    animate={{
                      opacity: [1, 0.25, 1],
                      x: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
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

                  <motion.div
                    animate={{
                      x: ["-10%", "110%"],
                    }}
                    transition={{
                      duration: 4.6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      width: "32%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                      filter: "blur(10px)",
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
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                padding: isMobile ? "22px 18px 22px" : "34px 30px",
                overflowY: "auto",
                position: "relative",
                zIndex: 2,
              }}
            >
              <motion.div variants={itemVariants}>
                <motion.div
                  animate={{
                    opacity: [0.75, 1, 0.75],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  Contact Form
                </motion.div>

                <motion.h3
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    margin: "0 0 10px",
                    fontSize: isMobile ? "28px" : "34px",
                    lineHeight: 1.06,
                    fontWeight: 800,
                    color: theme.colors.text,
                  }}
                >
                  Tell us what you need.
                </motion.h3>

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
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                    />
                  </AnimatedField>

                  <AnimatedField>
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
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
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
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
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

                <AnimatePresence>
                  {formData.service === "Other" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -6, height: 0 }}
                      transition={{ duration: 0.24 }}
                      style={{ marginTop: "14px", overflow: "hidden" }}
                    >
                      <AnimatedField>
                        <Field
                          label="Other Service *"
                          name="otherService"
                          value={formData.otherService}
                          onChange={handleChange}
                          placeholder="Write your required service"
                          focusedField={focusedField}
                          setFocusedField={setFocusedField}
                        />
                      </AnimatedField>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ marginTop: "14px" }}>
                  <AnimatedField>
                    <Field
                      label="Business / Brand Name"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Your brand or business"
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
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
                    animate={{
                      boxShadow: [
                        "0 14px 28px rgba(214,176,96,0.18)",
                        "0 18px 38px rgba(214,176,96,0.34)",
                        "0 14px 28px rgba(214,176,96,0.18)",
                      ],
                      scale: [1, 1.015, 1],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      y: -3,
                      scale: 1.03,
                      boxShadow: "0 18px 46px rgba(214,176,96,0.42)",
                    }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    disabled={isSending}
                    style={primaryButtonStyle}
                  >
                    {isSending ? "Sending..." : "Submit Inquiry"}
                  </motion.button>

                  <motion.button
                    whileHover={{
                      y: -2,
                      scale: 1.02,
                      boxShadow: "0 10px 24px rgba(255,255,255,0.08)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => closeContactModal()}
                    style={secondaryButtonStyle}
                  >
                    Close
                  </motion.button>
                </motion.div>

                <motion.div
                  animate={{ opacity: [0.45, 0.75, 0.45] }}
                  transition={{ duration: 2.6, repeat: Infinity }}
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

function AmbientBackground({ isMobile }) {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -24, 0],
          scale: [1, 1.08, 1],
          opacity: [0.16, 0.24, 0.16],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "-80px",
          left: "-80px",
          width: isMobile ? "180px" : "260px",
          height: isMobile ? "180px" : "260px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.18)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{
          x: [0, -28, 0],
          y: [0, 24, 0],
          scale: [1, 1.06, 1],
          opacity: [0.16, 0.22, 0.16],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          right: "-60px",
          bottom: "-80px",
          width: isMobile ? "200px" : "280px",
          height: isMobile ? "200px" : "280px",
          borderRadius: "50%",
          background: "rgba(87,120,210,0.18)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{ x: ["-15%", "120%"] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          top: "18%",
          width: "26%",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)",
          filter: "blur(2px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{ x: ["120%", "-15%"] }}
        transition={{
          duration: 7.5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          top: "68%",
          width: "22%",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, rgba(214,176,96,0.16), transparent)",
          filter: "blur(2px)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

function AnimatedField({ children }) {
  return (
    <motion.div
      variants={itemVariants}
      animate={{ y: [0, -1.5, 0] }}
      transition={{
        duration: 4.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
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
  focusedField,
  setFocusedField,
}) {
  const active = focusedField === name;
  const filled = String(value || "").trim().length > 0;

  return (
    <label style={{ display: "block" }}>
      <motion.div
        animate={{
          color: active ? theme.colors.goldSoft : "#EAE6DD",
          opacity: filled ? 1 : 0.92,
        }}
        transition={{ duration: 0.2 }}
        style={labelStyle}
      >
        {label}
      </motion.div>

      <motion.input
        whileFocus={{ y: -2, scale: 1.01 }}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField("")}
        placeholder={placeholder}
        style={{
          ...inputStyle,
          border: active
            ? "1px solid rgba(214,176,96,0.75)"
            : filled
            ? "1px solid rgba(255,255,255,0.16)"
            : "1px solid rgba(255,255,255,0.10)",
          boxShadow: active
            ? "0 0 0 1px rgba(214,176,96,0.18), 0 0 22px rgba(214,176,96,0.18)"
            : filled
            ? "0 0 0 1px rgba(255,255,255,0.03)"
            : "none",
        }}
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
  focusedField,
  setFocusedField,
}) {
  const active = focusedField === "phone";
  const filled = String(phone || "").trim().length > 0;

  return (
    <div>
      <motion.div
        animate={{
          color: active ? theme.colors.goldSoft : "#EAE6DD",
        }}
        transition={{ duration: 0.2 }}
        style={labelStyle}
      >
        {label}
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "190px 1fr",
          gap: "10px",
          alignItems: "start",
        }}
      >
        <div style={{ position: "relative" }} ref={countryMenuRef}>
          <motion.button
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
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

            <motion.span
              animate={{ rotate: countryMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.18 }}
              style={{
                fontSize: "12px",
                opacity: 0.8,
              }}
            >
              ▼
            </motion.span>
          </motion.button>

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
                  width: isNaN(window?.innerWidth) || window.innerWidth > 768 ? "320px" : "280px",
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
                  <motion.input
                    autoFocus
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search country or code"
                    style={{
                      ...inputStyle,
                      padding: "12px 14px",
                      boxShadow: "0 0 18px rgba(255,255,255,0.03)",
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
                        <motion.button
                          whileHover={{ x: 4, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
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
                            boxShadow: activeCountry
                              ? "inset 0 0 16px rgba(214,176,96,0.08)"
                              : "none",
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
                        </motion.button>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.input
          whileFocus={{ y: -2, scale: 1.01 }}
          type="tel"
          name="phone"
          value={phone}
          onChange={onPhoneChange}
          onFocus={() => setFocusedField("phone")}
          onBlur={() => setFocusedField("")}
          placeholder="Enter mobile number"
          style={{
            ...inputStyle,
            border: active
              ? "1px solid rgba(214,176,96,0.75)"
              : filled
              ? "1px solid rgba(255,255,255,0.16)"
              : "1px solid rgba(255,255,255,0.10)",
            boxShadow: active
              ? "0 0 0 1px rgba(214,176,96,0.18), 0 0 22px rgba(214,176,96,0.18)"
              : filled
              ? "0 0 0 1px rgba(255,255,255,0.03)"
              : "none",
          }}
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
            <motion.button
              key={service}
              type="button"
              onClick={() => onSelect(service)}
              whileHover={{
                y: -3,
                scale: 1.03,
                boxShadow: active
                  ? "0 10px 26px rgba(214,176,96,0.20)"
                  : "0 8px 20px rgba(255,255,255,0.05)",
              }}
              whileTap={{ scale: 0.97 }}
              animate={
                active
                  ? {
                      boxShadow: [
                        "0 0 0 rgba(214,176,96,0.00)",
                        "0 0 22px rgba(214,176,96,0.20)",
                        "0 0 0 rgba(214,176,96,0.00)",
                      ],
                      scale: [1, 1.015, 1],
                    }
                  : {}
              }
              transition={
                active
                  ? {
                      duration: 1.9,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : { duration: 0.18 }
              }
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
                boxShadow: active
                  ? "inset 0 0 14px rgba(214,176,96,0.08)"
                  : "none",
              }}
            >
              {service}
            </motion.button>
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