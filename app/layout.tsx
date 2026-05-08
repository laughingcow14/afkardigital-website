import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AfkarDigital — Control · IoT · Automation",
  description: "Continuous monitoring in front of your eyes. Total control at your fingertips. AFKAR DIGITAL builds the hardware, cloud and software that bring any device to your mobile or PC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
