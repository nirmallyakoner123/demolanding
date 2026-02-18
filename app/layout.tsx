import type { Metadata } from "next";
import Script from "next/script";
import { Nunito_Sans, Lexend, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { defaultMetadata, generateOrganizationStructuredData } from "@/lib/seo";
import ToastProvider from "@/components/ToastProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://interviewscreener.com"),
  ...defaultMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationStructuredData()),
          }}
        />
      </head>
      <body
        className={`${nunito.variable} ${lexend.variable} ${robotoMono.variable} font-nunito antialiased`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T352X25G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1307669934174050&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <Header />

        {children}

        <Footer />
        <ToastProvider />

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T352X25G');
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1307669934174050');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* TruConversion */}
        <Script id="truconversion" strategy="afterInteractive">
          {`
            var _tip = _tip || [];
            (function(d,s,id){
                var js, tjs = d.getElementsByTagName(s)[0];
                if(d.getElementById(id)) { return; }
                js = d.createElement(s); js.id = id;
                js.async = true;
                js.src = d.location.protocol + '//app.truconversion.com/ti-js/48477/b879d.js';
                tjs.parentNode.insertBefore(js, tjs);
            }(document, 'script', 'ti-js'));
          `}
        </Script>
      </body>
    </html>
  );
}
