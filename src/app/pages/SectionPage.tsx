import React, { useEffect } from "react";

export function SectionPage({ children, title }: { children: React.ReactNode, title?: string }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (title) {
      document.title = `${title} | Jronix Software Solutions`;
    }
  }, [title]);

  return (
    <div className="pt-24 min-h-screen">
      {children}
    </div>
  );
}
