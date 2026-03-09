import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "R4M4 Recommendation System",
  description: "Edgy movie recommendation UI powered by embeddings and bag-of-words."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

