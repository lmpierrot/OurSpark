"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const raw = localStorage.getItem("oursparks_onboarding");
    const data = raw ? JSON.parse(raw) : {};
    if (data.introCompleted) {
      router.replace("/home");
    } else {
      router.replace("/onboarding/language");
    }
  }, [router]);

  return null;
}
