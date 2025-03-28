import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Global Data",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <header>
          <div className="headerLogo">
            <Link href="/">Global Data | WDI</Link>
          </div>
          
          <nav className="headerNav">
            <Link href="/">Home</Link>
            <Link href="/#how">How does it work?</Link>
            <hr/>
            <Link href="https://databank.worldbank.org/source/world-development-indicators" target="blank" className="wdiHeader">World Development Indicators</Link>
            <Link href="/countries" className="tryHeader">Try now!</Link>
          </nav>
        </header>
        {children}
        <footer>
          👨🏻‍💻 Developed and Designed by Sergio García López |
          <span>
            <Link href="https://github.com/sergiosoftdev2" target="blank"><img src="https://img.icons8.com/ios11/512/FFFFFF/github.png"/></Link>
            <Link href="https://www.linkedin.com/in/sergiosoftdev/" target="blank"><img src="https://e7.pngegg.com/pngimages/753/965/png-clipart-linkedin-linkedin.png"/></Link>
          </span>
        </footer>


        <Script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        ></Script>
      </body>
    </html>
  );
}
