import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { NavBar } from "./components/layout/NavBar";
import ReactQueryProvider from "./providers/ReactQueryProvider";

import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:{
    default: "The Blog",
    template: "%s | The Blog",
  },
  description: "The Blog",
  keywords:[],
  openGraph:{
    title: "The Blog",
    description: "The Blog",
    url: "https://theblog.com",
    siteName: "The Blog",
    images: [
      {
        url: "https://theblog.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Blog OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter:{
    card: "summary_large_image",
    title: "The Blog",
    description: "The Blog",
    images: ["https://theblog.com/og-image.png"],
    creator: "@theblog",
  },
  robots:{
    index: true,
    follow: true,
    googleBot:{
      index: true,
      follow: true,
      'max-video-preview' : -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  metadataBase: new URL("https://theblog.com"),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({  children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ThemeProvider>
            <div className="sticky top-0 z-50">
              <header>
                <NavBar/>
              </header>
            </div>
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
