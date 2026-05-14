import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "FAMLYX BD",
  description:
    "Your Everyday Lifestyle Partner | Clothes | Bags | Shoes | Quality Products at Affordable Price",
  icons: {
    icon: "/fam.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>
        {children}
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            style: {
              minWidth: "580px",
              padding: "16px 20px",
              borderRadius: "14px",
              fontSize: "15px",
              fontWeight: 500,
              boxShadow:
                "0 10px 40px -10px rgba(0,0,0,0.25), 0 4px 12px -4px rgba(0,0,0,0.1)",
              border: "1px solid rgba(0,0,0,0.06)",
              backdropFilter: "blur(12px)",
            },
            className: "modern-toast",
          }}
        />
      </body>
    </html>
  );
}
