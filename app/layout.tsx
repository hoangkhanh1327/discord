import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/theme-provider';
import ModalProvider from '@/components/providers/ModalProvider';
import { SocketProvider } from '@/components/providers/SocketProvider';

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Chat Application',
    description: 'Discord clone time.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang='en' suppressHydrationWarning>
                <body
                    className={cn(font.className, 'bg-white dark:bg-[#313338]')}
                >
                    <ThemeProvider
                        attribute='class'
                        defaultTheme='dark'
                        enableSystem={false}
                        storageKey='discord-theme'
                    >
                        <SocketProvider>
                            <ModalProvider />
                            {children}
                        </SocketProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
