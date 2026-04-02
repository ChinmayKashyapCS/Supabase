export const metadata = {
  title: "Golf Charity Platform",
  description: "Play golf. Win prizes. Support charities.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
