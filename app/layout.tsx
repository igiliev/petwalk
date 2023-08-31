import './globals.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Providers } from './redux/providers';
import localFont from '@next/font/local';
import Script from 'next/script';

export const metadata = {
  title: 'Petsit',
  description: 'Your pet will be walked',
}

const poppins = localFont({
  src: [
    {
      path: '../public/font/Montserrat-Regular.ttf',
      weight: '400'
    },
    {
      path: '../public/font/Montserrat-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-montserrat'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  config.autoAddCss = false;
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <head>
        <Script 
          id="fb-pixel" 
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '262222953277927');
            fbq('track', 'PageView');
            `
          }}
        ></Script>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}