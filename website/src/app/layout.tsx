import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lost Forest Studios",
  description: "Lost Forest Studios landing page",
  icons: {
    icon: "/branding/lost-forest-game-studio-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
