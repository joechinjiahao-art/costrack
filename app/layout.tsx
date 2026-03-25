
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body style={{fontFamily:'sans-serif', background:'#f5f5f5'}}>
        {children}
      </body>
    </html>
  )
}
