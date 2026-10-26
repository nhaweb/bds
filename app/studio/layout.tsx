import type { ReactNode } from "react";

/**
 * Separate root layout for /studio (sibling of [locale] root layout).
 * Keeps Studio outside next-intl chrome.
 */
export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
