import { Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

const frauncesFont = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin']
})

export const metadata = {
  title: "LegalEase",
  description: "Best Lawyer Hiring Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${frauncesFont.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <main className="w-full px-2 min-h-screen">
          {children}
        </main>
        <Footer></Footer>
        <Toaster />
      </body>
    </html>
  );
}
