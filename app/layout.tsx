import "@/styles/globals.css";
import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Product Search App",
  description: "A simple Next.js TypeScript app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
