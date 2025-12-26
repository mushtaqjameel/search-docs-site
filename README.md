# B2B Search Platform Documentation

A Nextra-based documentation site for a B2B Search Platform. Contains sales materials, feature documentation, implementation guides, and interactive tools for search solutions.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Site runs at http://localhost:3000

### Build

```bash
npm run build
```

## Project Structure

```
content/           MDX content pages
  index.mdx        Homepage
  features.mdx     Feature explorer (30+ features)
  sales.mdx        Sales playbook
  implementation.mdx Implementation guides
  tools.mdx        Interactive scope generator
  reference.mdx    Quick reference
  strategy.mdx     Strategy frameworks
  estimation.mdx   Estimation framework

components/        React components
  SearchScopeGenerator.jsx  Main interactive tool
  FeaturesList.jsx          Feature catalog with filtering
  FeatureBuckets.jsx        Feature bucket cards
  DecisionQuadrants.jsx     Strategic decision frameworks
  DiagramWithHelp.jsx       Diagram explanations
  Mermaid.jsx               Mermaid diagram renderer
  ...

app/               Next.js app directory
theme.config.jsx   Nextra theme configuration
```

## Key Concepts

### 6 Feature Buckets

| Bucket | Features | Description |
|--------|----------|-------------|
| Core Search | 8 | Findability fundamentals |
| AI Search | 6 | AI understanding & ranking |
| Discovery | 7 | Cross-sell & reordering |
| Merchandising | 6 | Business user control |
| Recovery | 2 | Never dead-end |
| Analytics | 2 | Measure & optimize |

### 3 Pillars (Risk Assessment)

- **Data Dependence**: Basic (green) / Rich (yellow) / Multiple (red)
- **Governance Required**: Low (green) / Periodic (yellow) / Ongoing (red)
- **Operational Safety**: Safe (green) / Trained (yellow) / Expert (red)

### 4 Investment Levels

- **MVP**: Make it work, ship fast
- **Standard**: Solid implementation
- **Polished**: Self-service ready
- **Premium**: Bulletproof, white-glove

### 4 Support Tiers

- **Self-Service**: Low risk + High capacity
- **Guided**: Training + documentation
- **Partnership**: Shared ownership
- **Managed**: We operate for them

## Interactive Tools

### Search Scope Generator

Located at `/tools`. A 5-step wizard that:
- Assesses client profile (industry, timeline, pain points)
- Evaluates data readiness with quality metrics
- Explores discovery & remediation options (Pay Now/Pay Later/AI enrichment)
- Measures client capacity for ongoing operations
- Generates phased implementation scope with support tier recommendations

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [Nextra](https://nextra.site/) - Documentation framework
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) - Icons
- [Mermaid.js](https://mermaid.js.org/) - Diagrams

## License

Proprietary
