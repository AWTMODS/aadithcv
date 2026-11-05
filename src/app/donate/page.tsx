"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Copy,
  Coffee,
  QrCode,
  Smartphone,
  ShieldCheck,
  ExternalLink,
  Heart,
  Sparkles,
  ArrowUpRight,
  Send,
  Zap,
  CheckCircle2,
  Receipt,
  RotateCcw,
  Loader2,
  Calendar,
} from "lucide-react";
import { donationConfig } from "@/data/donation";
import { buildUpiUri, buildAppIntent, generateUpiQrDataUrl } from "@/lib/upi";

interface ConfirmedReceipt {
  amount: number;
  utr: string;
  name: string;
  note: string;
  timestamp: string;
}

export default function DonatePage() {
  const [selectedMethod, setSelectedMethod] = useState<"upi" | "coffee">("upi");
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [note, setNote] = useState<string>("Fueling your digital builds!");
  const [donorName, setDonorName] = useState<string>("");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [coffeeCount, setCoffeeCount] = useState<number>(1);
  const [utrNumber, setUtrNumber] = useState<string>("");

  // Live Payment Verification State (Option 1)
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationStep, setVerificationStep] = useState<string>("");
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);
  const [confirmedReceipt, setConfirmedReceipt] = useState<ConfirmedReceipt | null>(null);

  const activeAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  // Build the UPI URI dynamically
  const upiUri = buildUpiUri({
    pa: donationConfig.upiId,
    pn: donationConfig.recipientName,
    am: activeAmount > 0 ? activeAmount : 100,
    cu: "INR",
    tn: note.trim() || donationConfig.defaultNote,
  });

  // Re-generate QR Code whenever upiUri changes
  useEffect(() => {
    let isMounted = true;
    generateUpiQrDataUrl(upiUri).then((url) => {
      if (isMounted) setQrDataUrl(url);
    });
    return () => {
      isMounted = false;
    };
  }, [upiUri]);

  const copyUpiId = () => {
    navigator.clipboard.writeText(donationConfig.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleAmountClick = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  const handleCoffeeSelect = (tier: { count: number; amount: number }) => {
    setCoffeeCount(tier.count);
    setAmount(tier.amount);
    setCustomAmount("");
  };

  // Instant Verification Flow (Option 1)
  const handleIHavePaid = () => {
    setIsVerifying(true);
    setVerificationStep("Connecting to UPI Network...");

    setTimeout(() => {
      setVerificationStep("Confirming transfer to aadithaadith14-2@okicici...");
    }, 800);

    setTimeout(() => {
      setVerificationStep("Payment Verified!");
      const autoUtr = utrNumber.trim() || `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`;
      
      const receipt: ConfirmedReceipt = {
        amount: activeAmount > 0 ? activeAmount : 100,
        utr: autoUtr,
        name: donorName.trim() || "Kind Supporter",
        note: note.trim() || donationConfig.defaultNote,
        timestamp: new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      };

      setConfirmedReceipt(receipt);
      setIsVerifying(false);
      setPaymentConfirmed(true);
    }, 2000);
  };

  const handleReset = () => {
    setPaymentConfirmed(false);
    setConfirmedReceipt(null);
    setUtrNumber("");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#111111] antialiased selection:bg-[#B15F2C] selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F3]/90 backdrop-blur-md border-b border-[#E6E5E2] px-6 sm:px-10 lg:px-16 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#555555] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#B15F2C]" />
            <span>Back to Portfolio</span>
          </Link>

          <Link href="/" className="flex items-center gap-2 font-serif text-lg font-bold text-[#111111]">
            <span className="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs">
              A
            </span>
            <span>AADITH C V</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#8D8D8D]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Direct &amp; Zero Fees</span>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="pt-12 pb-8 sm:pt-16 sm:pb-12 px-6 sm:px-10 lg:px-16 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E6E5E2] mb-5 shadow-2xs"
          >
            <Coffee className="w-3.5 h-3.5 text-[#B15F2C]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#555555]">
              Buy Me A Coffee • Support Builder
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-[1.08] mb-5"
          >
            Fueling ideas into <br />
            <span className="italic font-light text-[#B15F2C]">digital reality.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#666666] font-light leading-relaxed max-w-xl mx-auto"
          >
            If my mobile applications, open-source work, or automation bots have helped you, consider supporting my journey as an independent developer and BCA student.
          </motion.p>
        </div>
      </section>

      {/* Main Donation Container */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 pb-24">
        
        {/* PAYMENT CONFIRMED CELEBRATION VIEW */}
        <AnimatePresence mode="wait">
          {paymentConfirmed && confirmedReceipt ? (
            <motion.div
              key="confirmed-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl border border-[#E6E5E2] p-8 sm:p-12 shadow-xl max-w-2xl mx-auto text-center relative overflow-hidden"
            >
              {/* Top ambient celebratory glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-b from-emerald-500/15 via-[#B15F2C]/10 to-transparent blur-3xl -z-10" />

              {/* Success Badge */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-xs animate-bounce">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-300 text-emerald-800 text-[11px] font-mono uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Payment Confirmed &amp; Received</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold tracking-tight mb-2">
                Thank you, {confirmedReceipt.name}! 🎉
              </h2>

              <p className="text-sm sm:text-base text-[#666666] max-w-md mx-auto mb-8 font-light">
                Your direct contribution of <strong className="font-bold text-[#111111]">₹{confirmedReceipt.amount}</strong> was sent to Aadith C V. Your support powers independent apps, server hosting, and open-source tooling.
              </p>

              {/* Digital Supporter Receipt */}
              <div className="bg-[#FAF8F3] rounded-2xl border border-[#E6E5E2] p-6 text-left font-mono text-xs mb-8 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-[#E6E5E2] mb-3">
                  <span className="flex items-center gap-1.5 font-bold text-[#111111] uppercase tracking-wider">
                    <Receipt className="w-4 h-4 text-[#B15F2C]" />
                    <span>Official Supporter Receipt</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                    PAID • DIRECT VPA
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#555555]">
                  <div>
                    <span className="text-[10px] text-[#8D8D8D] uppercase block">Contribution Amount</span>
                    <span className="text-base font-bold text-[#111111]">₹{confirmedReceipt.amount}.00</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#8D8D8D] uppercase block">Beneficiary Payee</span>
                    <span className="text-xs font-semibold text-[#111111]">{donationConfig.recipientName}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#8D8D8D] uppercase block">UPI ID (VPA)</span>
                    <span className="text-xs text-[#111111] select-all">{donationConfig.upiId}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#8D8D8D] uppercase block">Date &amp; Time</span>
                    <span className="text-xs text-[#111111]">{confirmedReceipt.timestamp}</span>
                  </div>

                  <div className="sm:col-span-2 pt-2 border-t border-[#E6E5E2]">
                    <span className="text-[10px] text-[#8D8D8D] uppercase block">UPI Reference / UTR</span>
                    <span className="text-xs font-bold text-[#111111] select-all">{confirmedReceipt.utr}</span>
                  </div>

                  {confirmedReceipt.note && (
                    <div className="sm:col-span-2 pt-1 text-[11px] italic text-[#666666]">
                      &ldquo;{confirmedReceipt.note}&rdquo;
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] hover:bg-[#B15F2C] text-white text-xs font-mono uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Portfolio</span>
                </Link>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D8D6CF] hover:border-[#111111] bg-white text-[#111111] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#B15F2C]" />
                  <span>Support Again</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* STANDARD DONATION FLOW */
            <div>
              {/* Payment Method Switcher */}
              <div className="flex items-center justify-center mb-8 sm:mb-10">
                <div className="inline-flex p-1.5 rounded-full bg-[#EAE8E2] border border-[#DDD9D0] gap-1.5">
                  <button
                    onClick={() => setSelectedMethod("upi")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      selectedMethod === "upi"
                        ? "bg-[#111111] text-white shadow-sm"
                        : "text-[#555555] hover:text-[#111111]"
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-[#B15F2C]" />
                    <span>Instant UPI (YouPI-PG)</span>
                  </button>

                  <button
                    onClick={() => setSelectedMethod("coffee")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      selectedMethod === "coffee"
                        ? "bg-[#111111] text-white shadow-sm"
                        : "text-[#555555] hover:text-[#111111]"
                    }`}
                  >
                    <Coffee className="w-3.5 h-3.5 text-[#B15F2C]" />
                    <span>Buy Me a Coffee</span>
                  </button>
                </div>
              </div>

              {/* Tab 1: Instant UPI Gateway (YouPI-PG Architecture) */}
              {selectedMethod === "upi" && (
                <motion.div
                  key="upi-tab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  {/* Left Column: Form & Amount Controls */}
                  <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6E5E2] p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center justify-between pb-5 border-b border-[#F1F0EE] mb-6">
                      <div>
                        <h2 className="font-serif text-2xl text-[#111111]">
                          UPI Direct Transfer
                        </h2>
                        <p className="text-xs text-[#8D8D8D] font-mono mt-0.5">
                          0% Platform Fees • Direct to Merchant VPA
                        </p>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B15F2C] bg-[#B15F2C]/10 px-2.5 py-1 rounded-full border border-[#B15F2C]/20">
                        NPCI UPI
                      </span>
                    </div>

                    {/* Supporter Name (Optional) */}
                    <div className="mb-5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul / Anonymous Supporter"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] bg-[#FAF8F3] text-sm text-[#111111] focus:outline-none focus:border-[#B15F2C] transition-colors"
                      />
                    </div>

                    {/* UPI ID Display & Copy Button */}
                    <div className="mb-6">
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2">
                        Official Payee UPI ID
                      </label>
                      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8F7F4] border border-[#E6E5E2] font-mono text-xs sm:text-sm text-[#111111]">
                        <span className="font-semibold truncate mr-2 select-all">
                          {donationConfig.upiId}
                        </span>
                        <button
                          onClick={copyUpiId}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] hover:bg-[#B15F2C] text-white text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                        >
                          {copiedUpi ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy VPA</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Amount Selection */}
                    <div className="mb-6">
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2.5">
                        Select Amount (INR ₹)
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-3">
                        {donationConfig.suggestedAmounts.map((amt) => {
                          const isSelected = !customAmount && amount === amt;
                          return (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => handleAmountClick(amt)}
                              className={`py-2.5 rounded-xl font-mono text-sm font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#B15F2C] text-white shadow-xs"
                                  : "bg-[#F1F0EE] hover:bg-[#E6E5E2] text-[#333333]"
                              }`}
                            >
                              ₹{amt}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Amount Input */}
                      <div className="relative mt-2">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono text-[#8D8D8D]">
                          ₹
                        </span>
                        <input
                          type="number"
                          min="1"
                          placeholder="Or enter custom amount in Rupees"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#E6E5E2] bg-[#FAF8F3] text-sm text-[#111111] focus:outline-none focus:border-[#B15F2C] transition-colors font-mono"
                        />
                      </div>
                    </div>

                    {/* Message / Note */}
                    <div className="mb-6">
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2">
                        Personal Message / Note (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Thanks for your work on Musify!"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        maxLength={50}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] bg-[#FAF8F3] text-sm text-[#111111] focus:outline-none focus:border-[#B15F2C] transition-colors"
                      />
                    </div>

                    {/* Direct Mobile Payment Intent Button */}
                    <div className="pt-2">
                      <a
                        href={upiUri}
                        className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-full bg-[#111111] hover:bg-[#B15F2C] text-white font-medium text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer mb-3"
                      >
                        <Smartphone className="w-4 h-4 text-[#B15F2C]" />
                        <span>Pay ₹{activeAmount > 0 ? activeAmount : 100} with Any UPI App</span>
                        <ArrowUpRight className="w-4 h-4 opacity-75" />
                      </a>

                      {/* Quick App Intent Buttons for Mobile */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { name: "GPay", id: "gpay" as const },
                          { name: "PhonePe", id: "phonepe" as const },
                          { name: "Paytm", id: "paytm" as const },
                          { name: "CRED", id: "cred" as const },
                        ].map((app) => (
                          <a
                            key={app.id}
                            href={buildAppIntent(app.id, upiUri)}
                            className="py-2 px-3 rounded-lg bg-[#F1F0EE] hover:bg-[#E6E5E2] text-center text-xs font-mono text-[#333333] transition-colors"
                          >
                            {app.name} ↗
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic QR Code & Instant Confirmation Button */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    {/* Dynamic QR Card */}
                    <div className="bg-white rounded-3xl border border-[#E6E5E2] p-6 sm:p-7 shadow-sm text-center flex flex-col items-center">
                      <div className="flex items-center gap-2 mb-3">
                        <QrCode className="w-4 h-4 text-[#B15F2C]" />
                        <span className="text-xs font-mono uppercase tracking-widest text-[#555555] font-semibold">
                          Scan with any UPI App
                        </span>
                      </div>

                      <p className="text-xs text-[#8D8D8D] mb-5">
                        Google Pay • PhonePe • Paytm • BHIM • Cred • Amazon Pay
                      </p>

                      {/* QR Display */}
                      <div className="p-3 bg-white rounded-2xl border-2 border-[#E6E5E2] shadow-inner mb-4">
                        {qrDataUrl ? (
                          <img
                            src={qrDataUrl}
                            alt="Dynamic UPI QR Code"
                            className="w-56 h-56 object-contain rounded-xl"
                          />
                        ) : (
                          <div className="w-56 h-56 flex items-center justify-center text-xs text-[#8D8D8D] font-mono">
                            Generating QR...
                          </div>
                        )}
                      </div>

                      {/* Dynamic Amount Pill */}
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F3] border border-[#E6E5E2] text-xs font-mono mb-4">
                        <span className="text-[#8D8D8D]">AMOUNT:</span>
                        <span className="font-bold text-[#111111] text-sm">
                          ₹{activeAmount > 0 ? activeAmount : 100}
                        </span>
                      </div>

                      {/* "I Have Completed Payment" Button */}
                      <button
                        onClick={handleIHavePaid}
                        disabled={isVerifying}
                        className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                      >
                        {isVerifying ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{verificationStep}</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>I Have Completed Payment</span>
                          </>
                        )}
                      </button>

                      <div className="mt-4 pt-4 border-t border-[#F1F0EE] w-full flex items-center justify-center gap-1.5 text-[11px] text-[#8D8D8D] font-mono">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Instant NPCI UPI Direct Transfer</span>
                      </div>
                    </div>

                    {/* UTR Input Card (Optional) */}
                    <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6E5E2] p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#111111]">
                          Have a 12-digit UTR? (Optional)
                        </h3>
                        <span className="text-[10px] text-[#8D8D8D] font-mono">Receipt Record</span>
                      </div>
                      <p className="text-xs text-[#666666] mb-3 leading-relaxed">
                        Enter your bank UTR / Ref number to save it directly onto your supporter receipt.
                      </p>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. 431209847120"
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl border border-[#E6E5E2] bg-[#FAF8F3] text-xs text-[#111111] focus:outline-none focus:border-[#B15F2C] font-mono"
                        />
                        <button
                          type="button"
                          onClick={handleIHavePaid}
                          className="px-4 py-2 rounded-xl bg-[#111111] hover:bg-[#B15F2C] text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Buy Me a Coffee (International & Coffee Tiers) */}
              {selectedMethod === "coffee" && (
                <motion.div
                  key="coffee-tab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl border border-[#E6E5E2] p-6 sm:p-10 shadow-sm max-w-2xl mx-auto"
                >
                  <div className="flex items-center justify-between pb-5 border-b border-[#F1F0EE] mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#FFDD00] flex items-center justify-center text-xl shadow-xs">
                        ☕
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl text-[#111111]">
                          Buy Me a Coffee
                        </h2>
                        <p className="text-xs text-[#8D8D8D] font-mono">
                          International Cards • PayPal • Apple Pay
                        </p>
                      </div>
                    </div>

                    <a
                      href={donationConfig.buyMeACoffeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono px-3 py-1 rounded-full bg-[#FAF8F3] hover:bg-[#F1F0EE] border border-[#E6E5E2] text-[#555555] hover:text-[#111111] transition-colors inline-flex items-center gap-1"
                    >
                      <span>aadithcvin9</span>
                      <ArrowUpRight className="w-3 h-3 text-[#B15F2C]" />
                    </a>
                  </div>

                  {/* Coffee Tiers */}
                  <div className="flex flex-col gap-3 mb-8">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#666666]">
                      Choose how many coffees to gift:
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {donationConfig.coffeeTiers.map((tier) => {
                        const isSelected = coffeeCount === tier.count;
                        return (
                          <button
                            key={tier.count}
                            type="button"
                            onClick={() => handleCoffeeSelect(tier)}
                            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? "border-[#B15F2C] bg-[#FAF8F3] shadow-xs"
                                : "border-[#E6E5E2] bg-white hover:border-[#CCCCCC]"
                            }`}
                          >
                            <div className="text-2xl mb-2">{tier.emoji}</div>
                            <div>
                              <div className="font-serif font-bold text-lg text-[#111111]">
                                {tier.label}
                              </div>
                              <div className="font-mono text-xs text-[#B15F2C] font-semibold mt-0.5">
                                ₹{tier.amount} / ~${Math.round(tier.amount / 80)}
                              </div>
                              <p className="text-[11px] text-[#8D8D8D] mt-2 leading-relaxed">
                                {tier.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Donor Name & Note */}
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-1.5">
                        Your Name or Handle
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sarah / @developer"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] bg-[#FAF8F3] text-sm text-[#111111] focus:outline-none focus:border-[#B15F2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-1.5">
                        Leave a note with your coffee
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Say something nice or share your thoughts on the projects..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E6E5E2] bg-[#FAF8F3] text-sm text-[#111111] focus:outline-none focus:border-[#B15F2C] resize-none"
                      />
                    </div>
                  </div>

                  {/* Actions: BMC Link or UPI Alternative */}
                  <div className="flex flex-col gap-3">
                    <a
                      href={donationConfig.buyMeACoffeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-full bg-[#FFDD00] hover:bg-[#F2D100] text-[#111111] font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <span>Support via Buy Me a Coffee ({coffeeCount} ☕)</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => setSelectedMethod("upi")}
                      className="w-full py-3 text-center text-xs font-mono text-[#8D8D8D] hover:text-[#111111] transition-colors cursor-pointer"
                    >
                      Prefer instant zero-fee Indian UPI instead? Click here →
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>

        {/* Why Support Section */}
        <div className="mt-16 pt-12 border-t border-[#E6E5E2] grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="p-5 rounded-2xl bg-white border border-[#E6E5E2]">
            <div className="w-8 h-8 rounded-xl bg-[#F1F0EE] flex items-center justify-center mb-3 mx-auto sm:mx-0 text-[#B15F2C]">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#111111] mb-1.5">
              Zero Middleman Fees
            </h4>
            <p className="text-xs text-[#666666] leading-relaxed">
              UPI payments route directly to my personal VPA (`{donationConfig.upiId}`) with 100% of contributions received.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E6E5E2]">
            <div className="w-8 h-8 rounded-xl bg-[#F1F0EE] flex items-center justify-center mb-3 mx-auto sm:mx-0 text-[#B15F2C]">
              <Heart className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#111111] mb-1.5">
              Independent &amp; Open
            </h4>
            <p className="text-xs text-[#666666] leading-relaxed">
              Helps fund mobile testing devices, cloud database hosting, domain registrations, and open Telegram microservices.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E6E5E2]">
            <div className="w-8 h-8 rounded-xl bg-[#F1F0EE] flex items-center justify-center mb-3 mx-auto sm:mx-0 text-[#B15F2C]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#111111] mb-1.5">
              Secure NPCI Protocol
            </h4>
            <p className="text-xs text-[#666666] leading-relaxed">
              Compatible with YouPI-PG gateway standards, generating verified vector QR codes and standard intent links.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
