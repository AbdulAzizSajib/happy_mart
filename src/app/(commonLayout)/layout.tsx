import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PlantInfoProvider } from "@/context/plant-info-context";
import React from "react";

export default function Commonlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlantInfoProvider>
      <div>
        <Navbar />
        {children}
        <Footer />
      </div>
    </PlantInfoProvider>
  );
}
