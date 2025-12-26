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
            <body className="antialiased" suppressHydrationWarning>
                <Layout
                    navbar={
                        <Navbar
                            logo={
                                <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    🔎 Search Platform Hub
                                </span>
                            }
                        />
                    }
                    footer={<Footer>Search Platform Team · B2B Excellence</Footer>}
                    pageMap={pageMap}
                >
                    {children}
                </Layout>
            </body>
        </html>
    )
}
