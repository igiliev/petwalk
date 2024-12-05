import './globals.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Providers } from './redux/providers';
import localFont from '@next/font/local';
import Script from 'next/script';
import { GlobalDataProvider } from './context/GlobalDataProvider';

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
      <meta name="facebook-domain-verification" content="ger2jyve3tgoqmy40yxi97gfpq46wv" />
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
        <Script 
          id="hotjar"
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:3635504,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `
          }}></Script>
      </head>
      <body>
        <Providers>
          <GlobalDataProvider>
                {children}
          </GlobalDataProvider>
        </Providers>
      </body>
    </html>
  )
}