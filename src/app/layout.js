import { Share_Tech } from "next/font/google"
import "./globals.css"

const shareTech = Share_Tech({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "Optim",
  description: "A website created by Optim.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${shareTech.className}`}
      >
        {children}
      </body>
    </html>
  );
}
