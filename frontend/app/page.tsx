"use client";

import dynamic from "next/dynamic";

const AppClient = dynamic(() => import("../src/App"), { ssr: false });

export default function Home() {
  return <AppClient />;
}
