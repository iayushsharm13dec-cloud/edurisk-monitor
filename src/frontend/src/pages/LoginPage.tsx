import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  GraduationCap,
  Loader2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const features = [
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "AI risk scoring",
  },
  {
    icon: Users,
    title: "Intervention Tracking",
    description: "Manage advisor interventions",
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Live student data",
  },
];

const stats = [
  { value: "40+", label: "Students" },
  { value: "94%", label: "Detection Rate" },
  { value: "4", label: "Risk Levels" },
];

export default function LoginPage() {
  const { login, isAuthenticated, isInitializing, isLoggingIn } = useAuth();
  const navigate = useNavigate();
  const isLoading = isInitializing || isLoggingIn;

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden"
      data-ocid="login.page"
    >
      {/* Ambient glow layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, oklch(0.65 0.18 190 / 0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 85% 85%, oklch(0.72 0.12 70 / 0.07) 0%, transparent 55%)",
        }}
      />
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.92 0.01 260) 1px, transparent 1px), linear-gradient(90deg, oklch(0.92 0.01 260) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 w-full max-w-lg">
        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-border/80 bg-card/75 backdrop-blur-2xl shadow-2xl p-8 mb-5"
          data-ocid="login.card"
          style={{
            boxShadow:
              "0 0 0 1px oklch(0.65 0.18 190 / 0.06), 0 24px 64px oklch(0 0 0 / 0.45)",
          }}
        >
          {/* Logo area */}
          <div className="flex flex-col items-center text-center mb-7">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-5 relative"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(145deg, oklch(0.65 0.18 190 / 0.18), oklch(0.65 0.18 190 / 0.05))",
                  border: "1px solid oklch(0.65 0.18 190 / 0.35)",
                  boxShadow:
                    "0 0 32px oklch(0.65 0.18 190 / 0.2), inset 0 1px 0 oklch(1 0 0 / 0.05)",
                }}
              >
                <GraduationCap
                  className="w-10 h-10 text-primary"
                  strokeWidth={1.4}
                />
              </div>
              {/* verified badge */}
              <div
                className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.62 0.16 145)",
                  border: "2.5px solid oklch(0.19 0.012 260)",
                  boxShadow: "0 2px 8px oklch(0.62 0.16 145 / 0.4)",
                }}
              >
                <ShieldCheck
                  className="w-3 h-3 text-background"
                  strokeWidth={2.5}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4 }}
            >
              <h1
                className="text-4xl font-bold text-foreground tracking-tight leading-none mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                EduRisk Monitor
              </h1>
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
                AI-powered dropout risk prediction
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                Identify at-risk students early. Monitor attendance, academic
                performance, and engagement to prevent dropout.
              </p>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/60 bg-muted/30 py-3 px-2 text-center"
              >
                <p
                  className="text-xl font-bold text-primary leading-none mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border/60" />
            <span className="text-muted-foreground text-xs tracking-wide">
              Secure institutional access
            </span>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Button
              type="button"
              onClick={login}
              disabled={isLoading}
              size="lg"
              className="w-full h-13 text-base font-semibold rounded-xl gap-2 transition-smooth"
              data-ocid="login.submit_button"
              style={{
                background: isLoading
                  ? undefined
                  : "linear-gradient(135deg, oklch(0.65 0.18 190), oklch(0.56 0.22 200))",
                boxShadow: isLoading
                  ? undefined
                  : "0 4px 24px oklch(0.65 0.18 190 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.1)",
              }}
            >
              {isLoading ? (
                <span
                  className="flex items-center gap-2"
                  data-ocid="login.loading_state"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isInitializing ? "Initializing…" : "Opening Identity…"}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Sign in with Internet Identity
                </span>
              )}
            </Button>

            <p className="text-center text-muted-foreground text-xs mt-3">
              Decentralized authentication — no passwords, no data leaks
            </p>
          </motion.div>
        </motion.div>

        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.42 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-xl border border-border/70 bg-card/50 backdrop-blur-sm p-3.5 flex flex-col items-center text-center gap-2.5 hover:border-primary/30 hover:bg-card/70 transition-smooth"
              data-ocid={`login.feature.${index + 1}`}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "oklch(0.65 0.18 190 / 0.1)",
                  border: "1px solid oklch(0.65 0.18 190 / 0.25)",
                }}
              >
                <feature.icon
                  className="w-4.5 h-4.5 text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p
                  className="text-foreground text-xs font-bold leading-tight mb-0.5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {feature.title}
                </p>
                <p className="text-muted-foreground text-[10px] leading-snug">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Branding footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-muted-foreground text-xs mt-6"
        >
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </motion.p>
      </div>
    </div>
  );
}
