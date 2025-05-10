'use client';

import { UserProvider } from '@civic/auth-web3/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider
          appId={process.env.NEXT_PUBLIC_CIVIC_APP_ID || ''}
          authFlowType="popup" // or "redirect" based on your preference
        >
          {children}
        </UserProvider>
      </body>
    </html>
  );
}