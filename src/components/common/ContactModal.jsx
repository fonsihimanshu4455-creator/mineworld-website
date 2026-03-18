import { useEffect, useState } from "react";
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
];

function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    business: "",
    message: "",
  });

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      business: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!formData.name || !formData.phone || !formData.service) {
      setStatus("Please fill name, mobile number, and service.");
      return;
    }

    if (
      !siteConfig.form.endpoint ||
      siteConfig.form.endpoint.includes("YOUR_FORM_ID")
    ) {
      setStatus("Form endpoint abhi set nahi hua hai.");
      return;
    }

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
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          business: formData.business,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("Form submitted successfully.");
        resetForm();

        setTimeout(() => {
          setIsOpen(false);
          setStatus("");
        }, 1200);
      } else {
        setStatus("Submission failed. Please try again.");
      }
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={() => setIsOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(7, 12, 22, 0.72)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "720px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "28px",
          padding: "28px",
          background:
            "linear-gradient(180deg, rgba(23, 34, 54, 0.98), rgba(16, 24, 40, 0.98))",
          border: `1px solid ${theme.colors.lineStrong}`,
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
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
          }}
        >
          ×
        </button>

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
            margin: "0 0 12px",
            fontSize: "clamp(30px, 4vw, 46px)",
            lineHeight: 1.05,
            color: theme.colors.text,
            fontWeight: 800,
          }}
        >
          Tell us what you need.
        </h2>

        <p
          style={{
            margin: "0 0 24px",
            color: theme.colors.textSoft,
            fontSize: "15px",
            lineHeight: 1.8,
            maxWidth: "620px",
          }}
        >
          Fill this form and the inquiry will come to your email. Use this for
          video editing, podcast shoots, social media management, graphic
          design, or digital growth support.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            <Field
              label="Full Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />

            <Field
              label="Mobile Number *"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />

            <Field
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              type="email"
            />

            <SelectField
              label="Service Needed *"
              name="service"
              value={formData.service}
              onChange={handleChange}
              options={serviceOptions}
            />
          </div>

          <div style={{ marginTop: "16px" }}>
            <Field
              label="Business / Brand Name"
              name="business"
              value={formData.business}
              onChange={handleChange}
              placeholder="Your brand or business"
            />
          </div>

          <div style={{ marginTop: "16px" }}>
            <TextAreaField
              label="Project Details"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what kind of work you need..."
            />
          </div>

          {status ? (
            <div
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
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "22px",
            }}
          >
            <button
              type="submit"
              disabled={isSending}
              style={primaryButtonStyle}
            >
              {isSending ? "Sending..." : "Submit Inquiry"}
            </button>

            <button
              type="button"
              onClick={() => {
                closeContactModal();
              }}
              style={secondaryButtonStyle}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
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

function SelectField({ label, name, value, onChange, options }) {
  return (
    <label style={{ display: "block" }}>
      <div style={labelStyle}>{label}</div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
      >
        <option value="">Select service</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({ label, name, value, onChange, placeholder }) {
  return (
    <label style={{ display: "block" }}>
      <div style={labelStyle}>{label}</div>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={6}
        style={{
          ...inputStyle,
          resize: "vertical",
          minHeight: "140px",
        }}
      />
    </label>
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