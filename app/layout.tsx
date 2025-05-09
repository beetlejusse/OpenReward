import { CivicAuthProvider } from "@civic/auth/nextjs";

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <CivicAuthProvider>
          {children}
        </CivicAuthProvider>
      </body>
    </html>
  );
}
