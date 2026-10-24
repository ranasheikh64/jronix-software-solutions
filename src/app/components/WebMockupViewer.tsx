import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Laptop,
  Tablet,
  Smartphone,
  RotateCw,
  ExternalLink,
  Lock,
  Image as ImageIcon,
  Globe,
  Maximize2,
  Minimize2,
  ShieldCheck,
  ShieldAlert,
  AlertCircle
} from "lucide-react";

export type DeviceMode = "laptop" | "tablet" | "mobile";

interface WebMockupViewerProps {
  liveUrl?: string;
  fallbackImage?: string;
  projectTitle: string;
  accentColor?: string;
}

export const WebMockupViewer: React.FC<WebMockupViewerProps> = ({
  liveUrl,
  fallbackImage,
  projectTitle,
  accentColor = "#3b82f6",
}) => {
  // Sanitize live URL (handles cases like "#https://velvet-amber.vercel.app/")
  const sanitizeUrl = (raw?: string) => {
    if (!raw) return "";
    let clean = raw.trim().replace(/^#+/, "").trim();
    if (!clean) return "";
    if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
      clean = `https://${clean}`;
    }
    return clean;
  };

  const cleanLiveUrl = sanitizeUrl(liveUrl);
  const hasLiveUrl = Boolean(cleanLiveUrl);

  // Check if domain is known to have anti-bot/DDoS verification challenge (e.g. OpenResty WAF / Cloudflare)
  const isBotProtectedSite = Boolean(
    cleanLiveUrl && cleanLiveUrl.toLowerCase().includes("wondersalliedhealth")
  );

  const [device, setDevice] = useState<DeviceMode>("laptop");
  // Default to design view if the site has bot protection, otherwise live if URL is present
  const [viewMode, setViewMode] = useState<"live" | "screenshot">(
    hasLiveUrl && !isBotProtectedSite ? "live" : "screenshot"
  );
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWafHint, setShowWafHint] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // If liveUrl changes or is missing
  useEffect(() => {
    if (!hasLiveUrl) {
      setViewMode("screenshot");
    } else if (isBotProtectedSite) {
      setViewMode("screenshot");
    }
  }, [hasLiveUrl, isBotProtectedSite]);

  // If stuck on live mode for more than 4 seconds, offer switch to design view
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (viewMode === "live") {
      timer = setTimeout(() => {
        setShowWafHint(true);
      }, 4000);
    } else {
      setShowWafHint(false);
    }
    return () => clearTimeout(timer);
  }, [viewMode, iframeKey]);

  const handleReload = () => {
    setIsLoading(true);
    setShowWafHint(false);
    setIframeKey((prev) => prev + 1);
  };

  const domainName = cleanLiveUrl
    ? cleanLiveUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
    : "preview";

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 p-4 md:p-8 overflow-y-auto bg-[#030712]/95 backdrop-blur-2xl"
          : "my-8"
      }`}
    >
      {/* ── Top Control Bar ── */}
      <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 mb-6 px-3 py-2.5 rounded-2xl bg-[#081224]/80 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/40">
        {/* Device Mode Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <button
            type="button"
            onClick={() => setDevice("laptop")}
            className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              device === "laptop"
                ? "text-white shadow-lg shadow-black/50"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            }`}
          >
            {device === "laptop" && (
              <motion.div
                layoutId="device-pill"
                className="absolute inset-0 rounded-lg"
                style={{ background: accentColor, opacity: 0.9 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <Laptop size={14} className="relative z-10" />
            <span className="relative z-10 hidden sm:inline">Laptop</span>
          </button>

          <button
            type="button"
            onClick={() => setDevice("tablet")}
            className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              device === "tablet"
                ? "text-white shadow-lg shadow-black/50"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            }`}
          >
            {device === "tablet" && (
              <motion.div
                layoutId="device-pill"
                className="absolute inset-0 rounded-lg"
                style={{ background: accentColor, opacity: 0.9 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <Tablet size={14} className="relative z-10" />
            <span className="relative z-10 hidden sm:inline">Tablet</span>
          </button>

          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              device === "mobile"
                ? "text-white shadow-lg shadow-black/50"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            }`}
          >
            {device === "mobile" && (
              <motion.div
                layoutId="device-pill"
                className="absolute inset-0 rounded-lg"
                style={{ background: accentColor, opacity: 0.9 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <Smartphone size={14} className="relative z-10" />
            <span className="relative z-10 hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* View Mode (Design View vs Live View) & Tools */}
        <div className="flex items-center gap-2 ml-auto">
          {hasLiveUrl && (
            <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              {fallbackImage && (
                <button
                  type="button"
                  onClick={() => setViewMode("screenshot")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === "screenshot"
                      ? "bg-white/15 text-white shadow-md shadow-black/40 border border-white/10"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="High-resolution verified design preview"
                >
                  <ImageIcon size={13} className={viewMode === "screenshot" ? "text-cyan-400" : ""} />
                  <span>Design View</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setViewMode("live")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "live"
                    ? "bg-white/15 text-white shadow-md shadow-black/40 border border-white/10"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="Interactive live website"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${viewMode === "live" ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
                <Globe size={13} className={viewMode === "live" ? "text-emerald-400" : ""} />
                <span>Live View</span>
              </button>
            </div>
          )}

          {/* Action buttons */}
          {hasLiveUrl && viewMode === "live" && (
            <button
              type="button"
              onClick={handleReload}
              title="Reload live preview"
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all"
            >
              <RotateCw size={14} className={isLoading ? "animate-spin" : ""} />
            </button>
          )}

          {hasLiveUrl && (
            <a
              href={cleanLiveUrl}
              target="_blank"
              rel="noreferrer"
              title="Open website in new tab"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all"
            >
              <ExternalLink size={13} />
              <span className="hidden md:inline">Open New Tab</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* ── Device Frameset Container ── */}
      <div className="w-full flex justify-center items-center py-2 overflow-x-auto min-h-[500px]">
        <AnimatePresence mode="wait">
          {/* LAPTOP MOCKUP */}
          {device === "laptop" && (
            <motion.div
              key="laptop-frame"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col items-center w-full max-w-[960px] px-2 sm:px-4"
            >
              {/* Laptop Screen Bezel */}
              <div className="w-full rounded-t-2xl sm:rounded-t-3xl bg-[#131722] p-2.5 sm:p-3 border-t border-x border-slate-700/60 shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative">
                {/* Metallic bezel border & camera notch */}
                <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#0b0e17] rounded-b-lg flex items-center justify-center gap-1.5 z-30">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b] border border-slate-700 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-cyan-400/80" />
                  </div>
                </div>

                {/* MacBook Display Screen */}
                <div className="w-full rounded-lg sm:rounded-xl overflow-hidden bg-[#050b14] border border-slate-800/80 shadow-inner flex flex-col">
                  {/* macOS Safari Style Header */}
                  <div className="w-full h-8 sm:h-9 bg-[#0b1324] border-b border-white/[0.07] px-3 flex items-center justify-between gap-2 select-none">
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80" />
                    </div>

                    {/* URL Pill */}
                    <div className="flex-1 max-w-sm mx-auto h-5 sm:h-6 rounded-md bg-white/[0.04] border border-white/[0.08] px-2.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-300">
                      <Lock size={10} className="text-emerald-400" />
                      <span className="truncate">{cleanLiveUrl || "preview"}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      {viewMode === "screenshot" ? (
                        <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-medium">Design</span>
                      ) : (
                        <>
                          <ShieldCheck size={11} className="text-emerald-400" />
                          <span className="hidden sm:inline">Live</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Screen Content Viewport */}
                  <div className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] bg-white overflow-hidden">
                    {viewMode === "live" && cleanLiveUrl ? (
                      <>
                        {isLoading && (
                          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#070e1c] gap-3 text-slate-400">
                            <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-blue-500 animate-spin" />
                            <p className="text-xs font-medium">Loading live preview...</p>
                          </div>
                        )}
                        <iframe
                          key={`laptop-${iframeKey}`}
                          src={cleanLiveUrl}
                          title={`${projectTitle} - Laptop Live Preview`}
                          onLoad={() => setIsLoading(false)}
                          className="w-full h-full border-0 bg-white"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full overflow-y-auto bg-slate-950 scroll-smooth">
                        <img
                          src={fallbackImage}
                          alt={projectTitle}
                          className="w-full h-auto min-h-full object-cover object-top block"
                        />
                      </div>
                    )}

                    {/* WAF Anti-bot notice prompt */}
                    {showWafHint && viewMode === "live" && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-lg w-[92%] p-3 rounded-xl bg-[#091122]/95 border border-amber-500/40 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 text-xs text-slate-200">
                        <div className="flex items-center gap-2">
                          <ShieldAlert size={16} className="text-amber-400 shrink-0" />
                          <span className="text-[11px] leading-tight">
                            Website has Bot/DDoS Protection.
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {fallbackImage && (
                            <button
                              type="button"
                              onClick={() => setViewMode("screenshot")}
                              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-[11px] transition-colors"
                            >
                              View Design
                            </button>
                          )}
                          <a
                            href={cleanLiveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-colors inline-flex items-center gap-1"
                          >
                            Open Live <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Laptop Bottom Base / Keyboard Lip */}
              <div className="w-full flex flex-col items-center">
                <div className="w-[102%] sm:w-[103%] h-3 sm:h-4 bg-gradient-to-b from-[#2d3748] via-[#1a202c] to-[#171923] rounded-b-lg border-b border-x border-slate-700/60 shadow-md relative flex justify-center">
                  <div className="w-20 sm:w-28 h-1.5 bg-[#0a0d14] rounded-b-md mx-auto" />
                </div>
                <div className="w-[90%] h-4 bg-blue-500/10 blur-xl -mt-1 rounded-full pointer-events-none" />
              </div>
            </motion.div>
          )}

          {/* TABLET MOCKUP */}
          {device === "tablet" && (
            <motion.div
              key="tablet-frame"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col items-center w-full max-w-[580px] px-4"
            >
              <div className="w-full rounded-[32px] bg-[#141926] p-4 sm:p-5 border border-slate-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative">
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0a0d14] border border-slate-700/80 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-cyan-400/80" />
                </div>

                <div className="w-full rounded-2xl overflow-hidden bg-[#050b14] border border-slate-800 flex flex-col">
                  <div className="w-full h-8 bg-[#0b1324] border-b border-white/[0.07] px-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                      <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex-1 max-w-[240px] mx-auto h-5 rounded-md bg-white/[0.04] border border-white/[0.08] px-2 flex items-center justify-center gap-1 text-[10px] text-slate-300">
                      <Lock size={9} className="text-emerald-400" />
                      <span className="truncate">{cleanLiveUrl || "preview"}</span>
                    </div>
                    <div className="w-4" />
                  </div>

                  <div className="relative w-full h-[520px] sm:h-[620px] bg-white overflow-hidden">
                    {viewMode === "live" && cleanLiveUrl ? (
                      <>
                        {isLoading && (
                          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#070e1c] gap-3 text-slate-400">
                            <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-blue-500 animate-spin" />
                            <p className="text-xs font-medium">Loading tablet view...</p>
                          </div>
                        )}
                        <iframe
                          key={`tablet-${iframeKey}`}
                          src={cleanLiveUrl}
                          title={`${projectTitle} - Tablet Live Preview`}
                          onLoad={() => setIsLoading(false)}
                          className="w-full h-full border-0 bg-white"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full overflow-y-auto bg-slate-950 scroll-smooth">
                        <img
                          src={fallbackImage}
                          alt={projectTitle}
                          className="w-full h-auto min-h-full object-cover object-top block"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[80%] h-4 bg-blue-500/10 blur-xl mt-1 rounded-full pointer-events-none" />
            </motion.div>
          )}

          {/* MOBILE MOCKUP */}
          {device === "mobile" && (
            <motion.div
              key="mobile-frame"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col items-center w-full max-w-[360px] px-4"
            >
              <div className="w-full rounded-[48px] bg-[#141926] p-3 sm:p-3.5 border-2 border-slate-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.9)] relative">
                <div className="absolute -left-1 top-24 w-1 h-8 bg-slate-600 rounded-l-sm" />
                <div className="absolute -left-1 top-36 w-1 h-12 bg-slate-600 rounded-l-sm" />
                <div className="absolute -right-1 top-28 w-1 h-14 bg-slate-600 rounded-r-sm" />

                <div className="w-full rounded-[38px] overflow-hidden bg-[#050b14] border border-slate-800 flex flex-col relative">
                  <div className="w-full h-10 bg-[#090f1d] px-5 flex items-center justify-between relative z-30 select-none">
                    <span className="text-[11px] font-semibold text-white/90">9:41</span>
                    <div className="w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-end px-2 gap-1 border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-[#111827] flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-blue-500/80" />
                      </div>
                    </div>
                    <div className="w-4 h-2 rounded-sm border border-white/60 relative">
                      <div className="w-2.5 h-full bg-white/80" />
                    </div>
                  </div>

                  <div className="w-full h-7 bg-[#0b1324] border-b border-white/[0.06] px-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-300">
                    <Lock size={9} className="text-emerald-400" />
                    <span className="truncate max-w-[180px]">{domainName}</span>
                  </div>

                  <div className="relative w-full h-[580px] bg-white overflow-hidden">
                    {viewMode === "live" && cleanLiveUrl ? (
                      <>
                        {isLoading && (
                          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#070e1c] gap-3 text-slate-400">
                            <div className="w-7 h-7 rounded-full border-2 border-slate-700 border-t-blue-500 animate-spin" />
                            <p className="text-xs font-medium">Loading mobile view...</p>
                          </div>
                        )}
                        <iframe
                          key={`mobile-${iframeKey}`}
                          src={cleanLiveUrl}
                          title={`${projectTitle} - Mobile Live Preview`}
                          onLoad={() => setIsLoading(false)}
                          className="w-full h-full border-0 bg-white"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full overflow-y-auto bg-slate-950 scroll-smooth">
                        <img
                          src={fallbackImage}
                          alt={projectTitle}
                          className="w-full h-auto min-h-full object-cover object-top block"
                        />
                      </div>
                    )}
                  </div>

                  <div className="w-full h-5 bg-[#090f1d] flex items-center justify-center">
                    <div className="w-28 h-1 bg-white/40 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="w-[60%] h-4 bg-blue-500/10 blur-xl mt-1 rounded-full pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helpful Hint Notice */}
      <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-slate-400 text-center">
        <AlertCircle size={13} className="text-blue-400 shrink-0" />
        <span>
          Viewing responsive mockup presentation. Click{" "}
          <a
            href={cleanLiveUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline font-medium inline-flex items-center gap-0.5"
          >
            Open New Tab <ExternalLink size={10} />
          </a>{" "}
          to interact directly with the live server.
        </span>
      </div>
    </div>
  );
};
