"use client";

import Script from "next/script";

interface MicrosoftClarityProps {
  projectId?: string;
}

/**
 * Microsoft Clarity Analytics Component for Next.js App Router
 * Tracks user sessions, heatmaps, scroll depth, and interaction metrics.
 * 
 * Configure via prop or `NEXT_PUBLIC_CLARITY_PROJECT_ID` environment variable.
 */
export function MicrosoftClarity({ projectId }: MicrosoftClarityProps) {
  const clarityId = projectId || process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  if (!clarityId) {
    if (process.env.NODE_ENV === "development") {
      console.info(
        "[Microsoft Clarity] No Project ID provided. Set NEXT_PUBLIC_CLARITY_PROJECT_ID in .env.local to enable session recording."
      );
    }
    return null;
  }

  return (
    <Script
      id="microsoft-clarity-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
}
