import '../styles/globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/components/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Word Learning',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Providers>{children}</Providers>
                <script
                    async
                    src={process.env.ANALYZE_WEBSITE_URL}
                    data-website-id={process.env.DATA_WEBSITE_ID}
                ></script>
            </body>
        </html>
    )
}
