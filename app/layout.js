import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  icons: {
    apple: '/logobg.png',
  },
  metadataBase: new URL('https://www.streetgottalent.com'),
    alternates: {
      canonical: '/',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Street's Got Talent - Show case your talent and stand a chance to win big.",
      description: 'Show case your talent and stand a chance to win big at Streetgottalent by Xpatainment',
      siteId: '@Xpatainment',
      creator: 'Xpatainment',
      creatorId: '@Xpatainment',
      images: ['https://www.streetgottalent.com/logobg.png'], // Must be an absolute URL
      url: "https://www.streetgottalent.com",
    },
  openGraph: {
    title: "Street's Got Talent - Show case your talent and stand a chance to win big",
    description: 'Show case your talent and stand a chance to win big at Streetgottalent by Xpatainment.',
    keywords: "street, talent, xpatainment, showcase, industry trends, latest trends, singing, win, Trending show",
    url: 'https://www.streetgottalent.com',
    siteName: 'Streetgottalent',
    images: [
      {
        url: 'https://www.streetgottalent.com/logobg.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://www.streetgottalent.com/logobg.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'streetgottalent.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  title: "Street's Got Talent: Explore the Latest Trends and Insights",
  description: "Show case your talent and stand a chance to win big at Streetgottalent.",
  keywords: "streets, insights, talent, discussions, industry trends, latest trends, showcase, talentshow, fun, win, award, competition",
  author: "Xpatainment",
  url: "https://www.streetgottalent.com",
  image: "https://www.streetgottalent.com/logobg.png",
  siteName: "StreetGotTalent",
  type: "website"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
