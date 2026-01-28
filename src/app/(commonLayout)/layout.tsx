import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import React from "react";

export default function Commonlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
