import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "AI Workforce OS",
  description: "A launch-ready AI workforce platform to sell agentic automation, revenue recovery and AI operations.",
  openGraph: {
    title: "AI Workforce OS",
    description: "Sell a modern AI workforce SaaS with agents, workflows and knowledge.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
