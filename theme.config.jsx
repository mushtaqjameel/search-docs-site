export default {
    logo: <span style={{ fontWeight: 800 }}>Search Platform Hub</span>,
    project: {
        link: 'https://github.com/shuding/nextra' // Placeholder
    },
    docsRepositoryBase: 'https://github.com/shuding/nextra/tree/main/docs', // Placeholder
    footer: {
        text: 'Search Platform Documentation Hub — Built for B2B Excellence'
    },
    useNextSeoProps() {
        return {
            titleTemplate: '%s – Search Platform Hub'
        }
    },
    primaryHue: 350, // Updated to match the "red/primary" vibe but cleaner
    sidebar: {
        defaultMenuCollapseLevel: 1,
        toggleButton: true
    }
}
