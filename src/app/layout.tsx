import "@/assets/style.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { Transition } from "@/hooks/use-transition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "K-Nearest Neighbors",
  description:
    "An Artificial Intelligence Prediction With K-Nearest Neighbors Algorithm",
  authors: {
    name: "Tannatee Juchan",
    url: "https://teelyjc.dev",
  },
  icons: "/favicon.png",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="th">
      <body className={inter.className}>
        <Transition>
          <main className="container">{children}</main>
        </Transition>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
