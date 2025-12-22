import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Parth Sarthi Builders | Jaipur",
  description:
    "Experience luxury living with Parth Sarthi Buildestate Pvt. Ltd. The most trusted real estate brand in Jaipur.",
  keywords: [
    "Parth Sarthi Builders",
    "Real Estate Jaipur",
    "Luxury Flats Jaipur",
    "Property in Jaipur",
    "Buy Flat Jaipur",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "Z_q8b3pRxldxIDm8F5hatsIQW3wxeYutrIP0QheU6Zg",
  }
};

export default function RootLayout({ children }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Parth Sarthi Builders",
    url: "https://www.parthsarthi.org",
    logo: "https://www.parthsarthi.org/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Parth Sarthi Tower, 2nd Floor, 2/4, Chitrakoot, Gandhi Path",
      addressLocality: "Vaishali Nagar",
      addressRegion: "Rajasthan",
      postalCode: "302017",
      addressCountry: "IN",
    },
    telephone: "+91 9024965965",
    areaServed: "Jaipur, Rajasthan, India",
    sameAs: [
      "https://www.facebook.com/parthsarthijaipur",
      "https://www.instagram.com/parthsarthi_jaipur/",
      "https://www.linkedin.com/company/parth-sarthi-buildestate-private-limited/",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-54B2BSRQ');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-54B2BSRQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>


        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-56EG8YW259"
        ></script>
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-56EG8YW259');
            `,
          }}
        />
      </body>
    </html>
  );
}
