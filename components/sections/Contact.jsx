"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", interest: "", message: "" });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="py-24 md:py-36 border-t border-[var(--border-light)]"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel className="mb-8">Book a viewing</SectionLabel>
            </motion.div>
            <motion.h2
              className="font-display text-[clamp(2rem,3.5vw,3.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-[var(--fg)] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Begin your
              <br />
              search here
            </motion.h2>
            <motion.p
              className="text-[var(--muted)] text-sm leading-relaxed max-w-[360px]"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Tell us what you are looking for and we will respond within
              one business day with a curated selection matched to your
              brief.
            </motion.p>
          </div>

          {/* Right: form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-[var(--border)] p-10 text-center"
                >
                  <span className="label text-[var(--accent)] block mb-4">Received</span>
                  <h3 className="font-display text-3xl font-light text-[var(--fg)] mb-4">
                    Thank you, {form.name.split(" ")[0] || "there"}.
                  </h3>
                  <p className="text-[var(--muted)] text-sm">
                    We will be in touch within one business day with properties
                    matched to your brief.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Field
                      label="Full name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="Email address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Field
                    label="Which property interests you?"
                    name="interest"
                    type="text"
                    value={form.interest}
                    onChange={handleChange}
                    placeholder="e.g. Horizon Residence, or describe what you seek"
                  />
                  <Field
                    label="Additional context"
                    name="message"
                    type="textarea"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Timeline, budget range, any other considerations"
                  />
                  <button
                    type="submit"
                    className="label border border-[var(--border)] px-8 py-4 text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
                  >
                    Submit enquiry
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type, value, onChange, required, placeholder }) {
  const inputClass =
    "w-full bg-transparent border-b border-[var(--border)] py-3 text-[var(--fg)] text-sm placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--accent)] transition-colors duration-300";

  return (
    <div>
      <label className="label text-[var(--muted)] block mb-3" htmlFor={name}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClass}
        />
      )}
    </div>
  );
}
