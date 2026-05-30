import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { Check, X, Shield, Sparkles, Zap, Award, CreditCard, Lock, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export function UpgradeModal() {
  const { isUpgradeModalOpen, setUpgradeModalOpen, upgradeToStudio, isStudio } = useStudio();
  const [step, setStep] = useState<"plans" | "checkout" | "success">("plans");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  // Card input states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  if (!isUpgradeModalOpen) return null;

  const handleClose = () => {
    setUpgradeModalOpen(false);
    // Reset steps if closed
    setTimeout(() => {
      setStep("plans");
      setCardNumber("");
      setCardName("");
      setCardExpiry("");
      setCardCvv("");
      setLoading(false);
    }, 200);
  };

  const startCheckout = () => {
    setStep("checkout");
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
      toast.error("Please fill in all payment details.");
      return;
    }

    setLoading(true);
    setLoadingText("Verifying credentials...");

    setTimeout(() => {
      setLoadingText("Authorizing secure deposit...");
      setTimeout(() => {
        setLoadingText("Activating Connect Studio License...");
        setTimeout(() => {
          setLoading(false);
          setStep("success");
          upgradeToStudio();
          toast.success("Studio Upgrade Successful! Welcome to Connect Studio.", {
            description: "Unlimited workspaces and AI audits are now active.",
          });
        }, 1200);
      }, 1000);
    }, 1000);
  };

  // Card formatting helpers
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    if (formattedValue.length <= 19) {
      setCardNumber(formattedValue);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    if (value.length <= 5) {
      setCardExpiry(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setCardCvv(value);
    }
  };

  // Get Card Type
  const getCardType = (num: string) => {
    if (num.startsWith("4")) return "Visa";
    if (num.startsWith("5")) return "Mastercard";
    if (num.startsWith("3")) return "Amex";
    return "Credit Card";
  };

  const features = [
    {
      title: "Unlimited Workspaces",
      desc: "Manage client accounts, personal pages, and brands concurrently.",
    },
    {
      title: "Premium AI Audits",
      desc: "Unlock deep strategy blueprints, scheduling models, and tone suggestions.",
    },
    {
      title: "Real-time AI Scanning",
      desc: "Re-run audits instantly to test captions and optimize before publishing.",
    },
    {
      title: "Advanced PDF Exporting",
      desc: "Download stunning, client-ready analytical reports in one click.",
    },
    {
      title: "Priority Support & Training",
      desc: "Direct access to our dashboard engineering team and product managers.",
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 px-4 py-6 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Card Container */}
      <div
        className="glass-panel relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-background/60 shadow-2xl transition-all md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-y-visible"
        style={{
          boxShadow: "0 0 80px -10px oklch(0.66 0.22 295 / 0.25)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-6 top-6 z-10 rounded-full border border-white/10 bg-white/5 p-2 text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground cursor-pointer"
        >
          <X className="size-4" />
        </button>

        {step === "plans" && (
          <>
            {/* Left Side: Pitch */}
            <div className="flex-1 p-8 md:p-12 bg-gradient-to-br from-accent-purple/10 to-accent-blue/5 border-r border-glass-border">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-accent-purple/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-purple">
                  <Sparkles className="size-3" />
                  Premium
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Upgrade to Connect{" "}
                <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                  Studio
                </span>
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Connect Studio empowers agency leads, marketing consultants, and content strategists
                to run multi-client operations with advanced analytical intelligence.
              </p>

              <div className="mt-8 space-y-5">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
                      <Check className="size-3" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{feat.title}</h4>
                      <p className="text-xs text-muted-foreground">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Plans Option */}
            <div className="w-full md:w-[380px] p-8 md:p-12 flex flex-col justify-between bg-white/[0.01]">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">Select your plan</h3>
                <p className="text-xs text-muted-foreground">
                  Cancel or modify your subscription at any time.
                </p>

                {/* Plan Card */}
                <div className="mt-6 rounded-2xl border-2 border-accent-purple bg-gradient-to-br from-accent-purple/20 to-accent-blue/10 p-5 shadow-[0_0_24px_-8px_oklch(0.66_0.22_295/0.4)]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">Studio Pro</span>
                    <span className="rounded-full bg-accent-purple/25 px-2 py-0.5 text-[10px] font-bold text-accent-purple uppercase tracking-wider">
                      Popular
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="font-display text-4xl font-extrabold text-foreground">
                      $15
                    </span>
                    <span className="ml-1 text-sm text-muted-foreground">/ month</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="size-3.5 text-accent-purple" /> Unlimited Workspaces
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="size-3.5 text-accent-purple" /> Advanced AI Audit Blueprints
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="size-3.5 text-accent-purple" /> Live pre-publish simulations
                    </li>
                  </ul>
                </div>

                <div className="mt-4 rounded-xl border border-glass-border bg-white/[0.01] p-4 transition-all hover:bg-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Studio Yearly (Save 20%)
                    </span>
                    <span className="text-xs font-bold text-foreground">$144/yr</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={startCheckout}
                  className="w-full rounded-xl bg-foreground py-3 text-sm font-bold text-background transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] cursor-pointer"
                >
                  Continue to checkout
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                  <Shield className="size-3.5" />
                  Secure 256-bit encrypted checkout
                </div>
              </div>
            </div>
          </>
        )}

        {step === "checkout" && (
          <div className="flex-1 p-8 md:p-12 flex flex-col md:flex-row gap-8 bg-gradient-to-br from-accent-purple/5 to-accent-blue/5">
            {/* Payment Fields Form */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <button
                  onClick={() => setStep("plans")}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors cursor-pointer"
                >
                  ← Back to plans
                </button>
                <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                  Secure Checkout
                </h3>
                <p className="text-xs text-muted-foreground">
                  Studio License Activation · $15.00 billed monthly
                </p>

                <form onSubmit={handlePayment} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      disabled={loading}
                      required
                      className="w-full rounded-xl border border-glass-border bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-accent-purple focus:bg-white/10 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="4000 1234 5678 9010"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        onFocus={() => setFocusedField("number")}
                        onBlur={() => setFocusedField(null)}
                        disabled={loading}
                        required
                        className="w-full rounded-xl border border-glass-border bg-white/5 pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-accent-purple focus:bg-white/10 focus:outline-none transition-all"
                      />
                      <CreditCard className="absolute left-4 top-3 size-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        onFocus={() => setFocusedField("expiry")}
                        onBlur={() => setFocusedField(null)}
                        disabled={loading}
                        required
                        className="w-full rounded-xl border border-glass-border bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-accent-purple focus:bg-white/10 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        CVV / Code
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="•••"
                          value={cardCvv}
                          onChange={handleCvvChange}
                          onFocus={() => setFocusedField("cvv")}
                          onBlur={() => setFocusedField(null)}
                          disabled={loading}
                          required
                          className="w-full rounded-xl border border-glass-border bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-accent-purple focus:bg-white/10 focus:outline-none transition-all"
                        />
                        <Lock className="absolute right-4 top-3 size-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple py-3 text-sm font-bold text-background transition-all hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="size-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        <span>{loadingText}</span>
                      </>
                    ) : (
                      <>
                        <Shield className="size-4" />
                        <span>Upgrade now ($15.00)</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Credit Card Visualizer */}
            <div className="w-full md:w-[320px] flex items-center justify-center">
              <div
                className={`relative w-full max-w-[320px] h-[190px] rounded-2xl p-6 transition-all duration-500 bg-gradient-to-br from-accent-purple via-[#581c87] to-accent-blue border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden group ${focusedField === "cvv" ? "rotate-y-180" : ""}`}
                style={{
                  perspective: "1000px",
                  boxShadow: "0 20px 40px -10px oklch(0.66 0.22 295 / 0.5)",
                }}
              >
                {/* Background glow animations */}
                <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl group-hover:bg-white/15 transition-all" />
                <div className="absolute -left-10 -bottom-10 size-32 rounded-full bg-accent-pink/20 blur-2xl" />

                {focusedField !== "cvv" ? (
                  <>
                    <div className="flex justify-between items-start">
                      <div className="size-10 rounded-lg bg-yellow-500/20 border border-yellow-500/40 relative overflow-hidden flex items-center justify-center">
                        <div className="w-8 h-6 border border-yellow-500/30 rounded absolute opacity-50" />
                        <div className="w-4 h-6 border-l border-r border-yellow-500/30 absolute opacity-50" />
                      </div>
                      <span className="font-display font-bold text-sm tracking-widest text-white/90">
                        {getCardType(cardNumber)}
                      </span>
                    </div>

                    <div className="my-4">
                      <div className="font-display text-lg text-white tracking-widest text-center tabular-nums">
                        {cardNumber || "•••• •••• •••• ••••"}
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="min-w-0">
                        <div className="text-[8px] uppercase tracking-wider text-white/60">
                          Card Holder
                        </div>
                        <div className="font-display text-xs text-white truncate max-w-[180px] font-medium">
                          {cardName.toUpperCase() || "ALEX MORGAN"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[8px] uppercase tracking-wider text-white/60">
                          Expires
                        </div>
                        <div className="font-display text-xs text-white tabular-nums">
                          {cardExpiry || "MM/YY"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col justify-between py-2 rotate-y-180">
                    <div className="h-8 w-full bg-black/40 -mx-6 mt-2" />
                    <div>
                      <div className="flex justify-end pr-2">
                        <span className="text-[8px] uppercase text-white/60 mr-2 self-center">
                          CVV Code
                        </span>
                        <div className="bg-white text-black px-2 py-0.5 rounded text-xs font-mono font-bold">
                          {cardCvv || "•••"}
                        </div>
                      </div>
                    </div>
                    <div className="text-[8px] text-white/40 leading-tight">
                      This credit card simulation does not store nor charge real funds. Connect
                      Analytics Studio upgrade demo.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="flex-1 p-8 md:p-16 flex flex-col items-center text-center justify-center bg-gradient-to-br from-accent-purple/20 via-background to-accent-blue/10">
            <div className="size-20 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple p-[1px] shadow-[0_0_50px_-5px_oklch(0.78_0.16_230/0.5)]">
              <div className="size-full rounded-full bg-background flex items-center justify-center">
                <Check className="size-10 text-accent-blue animate-bounce" strokeWidth={3} />
              </div>
            </div>

            <h2 className="mt-8 font-display text-3xl font-extrabold text-foreground">
              Welcome to Connect Studio!
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Your license is active. You have unlocked unlimited workspaces and instant AI
              performance audit reports.
            </p>

            <div className="mt-8 rounded-2xl border border-glass-border bg-white/5 p-6 max-w-sm w-full text-left">
              <h4 className="text-xs font-bold text-accent-purple uppercase tracking-widest flex items-center gap-1.5">
                <Award className="size-4" /> License Details
              </h4>
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tier:</span>{" "}
                  <span className="font-semibold text-foreground">Studio Professional</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Workspaces:</span>{" "}
                  <span className="font-semibold text-success">Unlimited (3 Active)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Audits:</span>{" "}
                  <span className="font-semibold text-success">Unlimited Scans Active</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="mt-8 px-8 py-3 rounded-xl bg-foreground text-background font-bold text-sm transition-all hover:scale-[1.02] hover:brightness-110 cursor-pointer"
            >
              Get started in Studio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
