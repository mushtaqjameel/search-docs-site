import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../styles/globals.css'

export const metadata = {
    title: 'Search Platform Hub',
    description: 'B2B Search Platform Documentation',
}

export default async function RootLayout({ children }) {
    const pageMap = await getPageMap()

    return (
        <html lang="en" suppressHydrationWarning>
            <Head />
            <body className="antialiased">
                <Layout
                    navbar={
                        <Navbar
                            logo={<span className="font-extrabold text-lg">Search Platform Hub</span>}
                        />
                    }
                    footer={<Footer>© {new Date().getFullYear()} Search Platform Team</Footer>}
                    pageMap={pageMap}
                >
                    {children}
                </Layout>
            </body>
        </html>
    )
}
