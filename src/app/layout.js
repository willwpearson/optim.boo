import { Share_Tech } from "next/font/google"
import "./globals.css"

const shareTech = Share_Tech({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "Optim",
  description: "A website created by Optim.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1E1A2A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${shareTech.className}`}
      >
        {children}
      </body>
    </html>
  );
}
