import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andrei Dodu - Full-Stack Developer & Value Investor",
  description: "Portfolio of Andrei Dodu, a full-stack developer and value investor combining technical expertise with financial acumen. Based in Sweden.",
  keywords: ["Full-Stack Developer", "Value Investor", "Next.js", "React", "TypeScript", "Portfolio"],
  authors: [{ name: "Andrei Dodu" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Fixed diagonal gradient background */}
        <div className="diagonal-gradient-bg" />
        {children}
      </body>
    </html>
  );
}
