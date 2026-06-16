import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hasham-shahid-048518269/", icon: "in" },
  { label: "GitHub", href: "https://github.com/hashamshahid123", icon: "⌥" },
  { label: "Email", href: "mailto:hashamshahid071@gmail.com", icon: "✉" },
];

function FloatingInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  textarea,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value.length > 0;

  const sharedStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(13,16,32,0.8)",
    border: `1px solid ${focused ? "rgba(124,108,252,0.5)" : "rgba(124,108,252,0.15)"}`,
    borderRadius: "12px",
    color: "#f0f0ff",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    boxShadow: focused ? "0 0 20px rgba(124,108,252,0.15)" : "none",
    padding: textarea ? "24px 16px 12px" : "22px 16px 10px",
    resize: "none" as const,
  };

  return (
    <div style={{ position: "relative" }}>
      <motion.label
        animate={{ y: raised ? -10 : 0, scale: raised ? 0.75 : 1, color: raised ? "#7c6cfc" : "#6070a0" }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          left: 16,
          top: textarea ? 16 : 16,
          transformOrigin: "left",
          pointerEvents: "none",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.95rem",
          zIndex: 1,
        }}
      >
        {label}
      </motion.label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          style={sharedStyle}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      )}
    </div>
  );
}

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  setStatus("sending");

  try {
    await emailjs.send(
      "service_uyuyomn",
      "template_klnhbk9",
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      "_Pryy7excIR-6qDiU"
    );

    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  } catch (error) {
    console.error(error);
    setStatus("idle");
    alert("Failed to send message. Try again.");
  }
};

  return (
    <section id="contact" className="relative py-32 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div style={{ color: "#7c6cfc", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em", marginBottom: "12px" }}>
          05 / CONTACT
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#f0f0ff", lineHeight: 1.1 }}>
          Let's build something
        </h2>
        <p style={{ color: "#6070a0", fontSize: "1.05rem", fontFamily: "'Inter', sans-serif", marginTop: "12px" }}>
          Open to Frontend Developer and Shopify opportunities, freelance projects, and collaboration on modern web applications.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div
            className="p-6 rounded-2xl"
            style={{ background: "rgba(13,16,32,0.7)", border: "1px solid rgba(124,108,252,0.15)" }}
          >
            <div style={{ color: "#a0a8d0", fontSize: "0.85rem", fontFamily: "'JetBrains Mono', monospace", marginBottom: "6px" }}>
              Response time
            </div>
            <div style={{ color: "#00d4ff", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.2rem" }}>
              &lt; 24 hours
            </div>
          </div>

          <div
            className="p-6 rounded-2xl"
            style={{ background: "rgba(13,16,32,0.7)", border: "1px solid rgba(124,108,252,0.15)" }}
          >
            <div style={{ color: "#a0a8d0", fontSize: "0.85rem", fontFamily: "'JetBrains Mono', monospace", marginBottom: "6px" }}>
              Currently based in
            </div>
            <div style={{ color: "#f0f0ff", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.2rem" }}>
              Lahore, Pakistan
            </div>
            <div style={{ color: "#6070a0", fontSize: "0.8rem", fontFamily: "'Inter', sans-serif", marginTop: "4px" }}>
              Open to remote worldwide
            </div>
          </div>

          <div className="flex gap-3">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ y: -4, boxShadow: "0 0 20px rgba(124,108,252,0.3)" }}
                transition={{ duration: 0.2 }}
                className="flex-1 py-3 rounded-xl flex items-center justify-center text-sm font-mono"
                style={{
                  background: "rgba(13,16,32,0.7)",
                  border: "1px solid rgba(124,108,252,0.2)",
                  color: "#7c6cfc",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full flex flex-col items-center justify-center text-center gap-6 py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1, type: "spring", bounce: 0.5 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                  style={{ background: "linear-gradient(135deg, #7c6cfc, #00d4ff)", boxShadow: "0 0 60px rgba(124,108,252,0.5)" }}
                >
                  ✓
                </motion.div>
                <div>
                  <div style={{ color: "#f0f0ff", fontSize: "1.3rem", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Message sent!
                  </div>
                  <div style={{ color: "#6070a0", fontFamily: "'Inter', sans-serif", marginTop: "8px" }}>
                    I'll get back to you within 24 hours.
                  </div>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  style={{ color: "#7c6cfc", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}
                >
                  Send another →
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <FloatingInput label="Your name" name="name" value={form.name} onChange={handleChange} />
                <FloatingInput label="Email address" type="email" name="email" value={form.email} onChange={handleChange} />
                <FloatingInput label="Tell me about your project..." name="message" value={form.message} onChange={handleChange} textarea />

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(124,108,252,0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #7c6cfc, #00d4ff)",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    padding: "16px",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    boxShadow: "0 0 30px rgba(124,108,252,0.3)",
                    transition: "box-shadow 0.3s",
                    opacity: status === "sending" ? 0.7 : 1,
                  }}
                >
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
