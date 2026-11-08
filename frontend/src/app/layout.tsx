import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { getServerSession } from "next-auth";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { authOptions } from "@/features/auth/authOptions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sports Facility Booking",
  description: "Search and book sports facilities",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await getServerSession(authOptions);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider session={session}>
          <Navbar />
          <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
