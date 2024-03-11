import "./styles/global.css";


export const metadata = {
  title: 'Front-End-Assessment',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <html lang="en"  className="root-layout">
      <body>{children}
      <footer><p>Adams B. Copyright @{year}</p></footer>
      </body>
    </html>
  );
}