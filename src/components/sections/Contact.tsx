"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Coffee,
} from "lucide-react";
import { socialLinks } from "@/data/social";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  TelegramIcon,
} from "@/components/ui/icons";
import MagneticButton from "@/components/animations/MagneticButton";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please write a message";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "29dd5a28-fad2-42af-bfdd-63fefdf01c06",
          name: formData.name,
          email: formData.email,
          subject: `[Portfolio] ${formData.subject}`,
          message: formData.message,
          from_name: `${formData.name} via Aadith Portfolio`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to transmit message.");
      }
    } catch (err: any) {
      console.error("Contact submission error:", err);
      setSubmitError(
        "Unable to send message via automated server. Please send directly to aadithaadith14@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <GithubIcon className="w-4 h-4" />;
      case "Linkedin":
        return <LinkedinIcon className="w-4 h-4" />;
      case "Send":
        return <TelegramIcon className="w-4 h-4" />;
      case "Instagram":
        return <InstagramIcon className="w-4 h-4" />;
      case "Mail":
        return <Mail className="w-4 h-4" />;
      case "Coffee":
        return <Coffee className="w-4 h-4 text-[#B15F2C]" />;
      default:
        return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F1F0EE] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading & Social details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B15F2C]">
                  07 / COLLABORATION
                </span>
              </div>
              <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-[1.05] mb-6">
                Have an idea? <br />
                <span className="font-normal text-[#B15F2C]">
                  Let&apos;s build it.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#666666] font-light leading-relaxed mb-10 max-w-md">
                I am actively seeking challenging freelance contracts, ambitious startup MVP collaborations, and forward-thinking engineering roles. Reach out directly or send a message below.
              </p>

              {/* Direct email card */}
              <div className="bg-white p-6 rounded-2xl border border-[#E6E5E2] mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#8D8D8D] block mb-1">
                  DIRECT EMAIL INBOX
                </span>
                <a
                  href="mailto:aadithaadith14@gmail.com"
                  className="font-heading font-medium text-lg sm:text-xl text-[#111111] hover:text-[#B15F2C] transition-colors inline-flex items-center gap-2 break-all"
                >
                  <span>aadithaadith14@gmail.com</span>
                  <ArrowUpRight className="w-5 h-5 text-[#B15F2C] shrink-0" />
                </a>
              </div>

              {/* Buy Me a Coffee / UPI Direct support callout */}
              <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E6E5E2] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E6E5E2] flex items-center justify-center text-lg shadow-2xs shrink-0">
                    ☕
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#111111]">
                      Buy Me a Coffee / UPI Donation
                    </h4>
                    <p className="text-xs text-[#666666]">
                      Instant zero-fee UPI transfer or Buy Me a Coffee
                    </p>
                  </div>
                </div>
                <a
                  href="/donate"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] hover:bg-[#B15F2C] text-white text-xs font-mono uppercase tracking-wider transition-colors shrink-0"
                >
                  <span>Support ☕</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Social channels pill list */}
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8D8D8D] block mb-4">
                Social & Developer Profiles
              </span>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E5E2] hover:border-[#B15F2C] text-xs font-mono text-[#333333] hover:text-[#B15F2C] transition-all shadow-2xs"
                  >
                    {getSocialIcon(s.icon)}
                    <span>{s.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E6E5E2] shadow-sm">
              <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-[#111111] mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-[#777777] mb-8 font-light">
                Fill in the details below and I will get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center gap-3"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  <h4 className="font-serif text-2xl text-[#111111]">
                    Message Sent!
                  </h4>
                  <p className="text-sm text-[#555555] max-w-sm">
                    Thank you for reaching out! Your message was delivered directly to Aadith&apos;s email (<span className="font-mono text-xs text-[#111111]">aadithaadith14@gmail.com</span>). I will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-xs font-mono uppercase tracking-wider text-[#B15F2C] underline hover:text-[#111111] cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#444444]">
                        Your Name <span className="text-[#B15F2C]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-[#F1F0EE] border text-sm text-[#111111] placeholder-[#999999] focus:outline-none focus:bg-white transition-colors ${
                          errors.name
                            ? "border-red-400 focus:border-red-500"
                            : "border-[#E6E5E2] focus:border-[#B15F2C]"
                        }`}
                      />
                      {errors.name && (
                        <span className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#444444]">
                        Email Address <span className="text-[#B15F2C]">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-[#F1F0EE] border text-sm text-[#111111] placeholder-[#999999] focus:outline-none focus:bg-white transition-colors ${
                          errors.email
                            ? "border-red-400 focus:border-red-500"
                            : "border-[#E6E5E2] focus:border-[#B15F2C]"
                        }`}
                      />
                      {errors.email && (
                        <span className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#444444]">
                      Subject <span className="text-[#B15F2C]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flutter Application Development / Web MVP"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl bg-[#F1F0EE] border text-sm text-[#111111] placeholder-[#999999] focus:outline-none focus:bg-white transition-colors ${
                        errors.subject
                          ? "border-red-400 focus:border-red-500"
                          : "border-[#E6E5E2] focus:border-[#B15F2C]"
                      }`}
                    />
                    {errors.subject && (
                      <span className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#444444]">
                      Message <span className="text-[#B15F2C]">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project, timeline, and goals..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl bg-[#F1F0EE] border text-sm text-[#111111] placeholder-[#999999] focus:outline-none focus:bg-white transition-colors resize-none ${
                        errors.message
                          ? "border-red-400 focus:border-red-500"
                          : "border-[#E6E5E2] focus:border-[#B15F2C]"
                      }`}
                    />
                    {errors.message && (
                      <span className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submission Error Banner */}
                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p>{submitError}</p>
                        <a
                          href={`mailto:aadithaadith14@gmail.com?subject=${encodeURIComponent(
                            formData.subject || "Portfolio Inquiry"
                          )}&body=${encodeURIComponent(
                            `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
                          )}`}
                          className="mt-1.5 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-[#B15F2C] underline hover:text-[#111111]"
                        >
                          <span>Open in your Email App instead →</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <MagneticButton strength={0.2}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-3 bg-[#111111] hover:bg-[#B15F2C] text-white px-8 py-4 rounded-full font-medium text-sm tracking-wide transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-md hover:shadow-lg"
                      >
                        <span>
                          {isSubmitting ? "Transmitting..." : "Send Message"}
                        </span>
                        <Send className="w-4 h-4" />
                      </button>
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
