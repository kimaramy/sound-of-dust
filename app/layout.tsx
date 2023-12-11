import './globals.css';

import { DesktopOnly } from '@/lib/device';
import { fontSans } from '@/lib/fonts';
import { Progress, RouteChangeEventHandlers } from '@/lib/router';
import { cn } from '@/lib/utils';
import Floating from '@/components/Floating';
import FloatingButtons from '@/components/FloatingButtons';
import HomeButton from '@/components/HomeButton';
import QueryClientProvider from '@/components/QueryClientProvider';
import QueryErrorBoundary from '@/components/QueryErrorBoundary';
import RuntimeErrorBoundary from '@/components/RuntimeErrorBoundary';
import SoundFilterX from '@/components/SoundFilterX';
import SoundFilterY from '@/components/SoundFilterY';
import ThemeProvider from '@/components/ThemeProvider';
import ToastProvider from '@/components/ToastProvider';
import ZoomInButton from '@/components/ZoomInButton';
import ZoomOutButton from '@/components/ZoomOutButton';
import ZoomResetHandler from '@/components/ZoomResetHandler';

import { baseMetadata } from './metadata';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = baseMetadata;

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          httpEquiv="refresh"
          content="3600; url=https://sound-of-dust.vercel.app/"
        />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-body font-sans antialiased scrollbar-hide',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider>
            <div className="relative flex min-h-screen flex-col">
              <SoundFilterX />
              <SoundFilterY />
              <div className="flex-1">
                <RuntimeErrorBoundary>
                  <QueryErrorBoundary>
                    {children}
                    <DesktopOnly>
                      <FloatingButtons />
                      <Floating className="bottom-[11%] right-[2%] flex-col">
                        <ZoomInButton />
                        <ZoomOutButton />
                      </Floating>
                      <Floating className="bottom-[3%] right-[2%]">
                        <HomeButton />
                      </Floating>
                    </DesktopOnly>
                  </QueryErrorBoundary>
                </RuntimeErrorBoundary>
              </div>
            </div>
            <ToastProvider />
          </QueryClientProvider>
        </ThemeProvider>
        <ZoomResetHandler />
        <RouteChangeEventHandlers progressComponent={<Progress />} />
      </body>
    </html>
  );
}

export default RootLayout;
