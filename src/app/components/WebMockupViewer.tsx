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

  const [device, setDevice] = useState<DeviceMode>("laptop");
  const [viewMode, setViewMode] = useState<"live" | "screenshot">(
    hasLiveUrl ? "live" : "screenshot"
  );
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // If liveUrl changes or is missing
  useEffect(() => {
    if (!hasLiveUrl) {
      setViewMode("screenshot");
    }
  }, [hasLiveUrl]);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const domainName = cleanLiveUrl
    ? cleanLiveUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
    : "live-preview";

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

        {/* View Mode (Live vs Screenshot) & Tools */}
        <div className="flex items-center gap-2 ml-auto">
          {hasLiveUrl && (
            <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <button
                type="button"
                onClick={() => setViewMode("live")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  viewMode === "live"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="Interactive Live Website"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <Globe size={13} />
                <span className="hidden sm:inline">Live</span>
              </button>

              {fallbackImage && (
                <button
                  type="button"
                  onClick={() => setViewMode("screenshot")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    viewMode === "screenshot"
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Static Screenshot"
                >
                  <ImageIcon size={13} />
                  <span className="hidden sm:inline">Screenshot</span>
                </button>
              )}
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
                      <ShieldCheck size={11} className="text-emerald-400" />
                      <span className="hidden sm:inline">Secure</span>
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
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full overflow-y-auto bg-slate-950 flex items-center justify-center">
                        <img
                          src={fallbackImage}
                          alt={projectTitle}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Laptop Bottom Base / Keyboard Lip */}
              <div className="w-full flex flex-col items-center">
                {/* Aluminum Hinge Bar */}
                <div className="w-[102%] sm:w-[103%] h-3 sm:h-4 bg-gradient-to-b from-[#2d3748] via-[#1a202c] to-[#171923] rounded-b-lg border-b border-x border-slate-700/60 shadow-md relative flex justify-center">
                  {/* Thumb opening groove */}
                  <div className="w-20 sm:w-28 h-1.5 bg-[#0a0d14] rounded-b-md mx-auto" />
                </div>
                {/* Table reflection / soft shadow */}
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
              {/* Tablet Frame */}
              <div className="w-full rounded-[32px] bg-[#141926] p-4 sm:p-5 border border-slate-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative">
                {/* Camera dot at top */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0a0d14] border border-slate-700/80 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-cyan-400/80" />
                </div>

                {/* Tablet Screen */}
                <div className="w-full rounded-2xl overflow-hidden bg-[#050b14] border border-slate-800 flex flex-col">
                  {/* Browser Bar */}
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

                  {/* Tablet Viewport */}
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
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full overflow-y-auto bg-slate-950 flex items-center justify-center">
                        <img
                          src={fallbackImage}
                          alt={projectTitle}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Soft glow */}
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
              {/* iPhone Style Bezel */}
              <div className="w-full rounded-[48px] bg-[#141926] p-3 sm:p-3.5 border-2 border-slate-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.9)] relative">
                {/* Volume & Power button accents on sides */}
                <div className="absolute -left-1 top-24 w-1 h-8 bg-slate-600 rounded-l-sm" />
                <div className="absolute -left-1 top-36 w-1 h-12 bg-slate-600 rounded-l-sm" />
                <div className="absolute -right-1 top-28 w-1 h-14 bg-slate-600 rounded-r-sm" />

                {/* Screen */}
                <div className="w-full rounded-[38px] overflow-hidden bg-[#050b14] border border-slate-800 flex flex-col relative">
                  {/* Dynamic Island Header */}
                  <div className="w-full h-10 bg-[#090f1d] px-5 flex items-center justify-between relative z-30 select-none">
                    <span className="text-[11px] font-semibold text-white/90">9:41</span>
                    {/* Dynamic Island pill */}
                    <div className="w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-end px-2 gap-1 border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-[#111827] flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-blue-500/80" />
                      </div>
                    </div>
                    {/* Battery/WiFi icons */}
                    <div className="w-4 h-2 rounded-sm border border-white/60 relative">
                      <div className="w-2.5 h-full bg-white/80" />
                    </div>
                  </div>

                  {/* Browser URL header */}
                  <div className="w-full h-7 bg-[#0b1324] border-b border-white/[0.06] px-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-300">
                    <Lock size={9} className="text-emerald-400" />
                    <span className="truncate max-w-[180px]">{domainName}</span>
                  </div>

                  {/* Mobile Screen Viewport */}
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
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full overflow-y-auto bg-slate-950 flex items-center justify-center">
                        <img
                          src={fallbackImage}
                          alt={projectTitle}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    )}
                  </div>

                  {/* Home indicator bar at bottom */}
                  <div className="w-full h-5 bg-[#090f1d] flex items-center justify-center">
                    <div className="w-28 h-1 bg-white/40 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Soft glow */}
              <div className="w-[60%] h-4 bg-blue-500/10 blur-xl mt-1 rounded-full pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helpful Hint Notice */}
      {viewMode === "live" && cleanLiveUrl && (
        <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-slate-400 text-center">
          <AlertCircle size={13} className="text-blue-400 shrink-0" />
          <span>
            Interactive preview enabled. If this website restricts embedding, you can{" "}
            <a
              href={cleanLiveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline font-medium"
            >
              Open in New Window
            </a>
            {fallbackImage && " or switch to Screenshot mode"}.
          </span>
        </div>
      )}
    </div>
  );
};
