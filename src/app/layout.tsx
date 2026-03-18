import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://valymoekspertai.lt"),
  title: {
    default: "Valymo Ekspertai",
    template: "%s | Valymo Ekspertai"
  },
  description: "Profesionalios valymo paslaugos Vilniuje.",
  icons: {
    icon: "/favicon.svg"
  }
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="lt">
      <body>{children}</body>
    </html>
  );
}
