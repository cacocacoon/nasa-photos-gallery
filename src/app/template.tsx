import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Providers from "./_components/Providers";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback="loading...">
      <Providers>
        <Navigation />
        <main>{children}</main>
      </Providers>
    </Suspense>
  );
}
