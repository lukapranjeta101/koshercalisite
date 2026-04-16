import type { Metadata } from "next";
import "./globals.css";
import AppWrapper from "../../mycomponents/AppWrapper";

export const metadata: Metadata = {
  title: "Cali Kosher | Premium Cannabis Dispensary",
  description:
    "Shop premium cannabis products at Cali Kosher locations in Modesto, Oakdale, and Patterson.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
