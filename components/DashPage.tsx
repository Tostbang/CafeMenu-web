"use client";
import React from "react";

export default function DashPage({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-[calc(100%-56px)] overflow-y-auto w-full  custom-scroll border border-gray-300 rounded-xl relative ">
      {children}
    </main>
  );
}
