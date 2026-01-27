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
    </div>
  );
}
