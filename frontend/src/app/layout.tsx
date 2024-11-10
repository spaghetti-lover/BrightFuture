import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer/Footer";
import ChatBot from "./components/chatbot/ChatBot";
import Header from "./components/header/Header";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BrightFuture",
  description: "BrightFuture: Kepco projet competition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <div className="mt-[60px]">{children}</div>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
