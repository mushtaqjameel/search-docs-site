# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nextra-based documentation site for a B2B Search Platform. It contains sales materials, feature documentation, implementation guides, and interactive tools for search solutions.

## Structure

- **content/** - MDX content pages
  - `index.mdx` - Homepage
  - `features.mdx` - Feature explorer (31 features)
  - `sales.mdx` - Sales playbook
  - `implementation.mdx` - Implementation guides
  - `tools.mdx` - Interactive scope generator and decision tools
  - `reference.mdx` - Quick reference
  - `strategy.mdx` - Strategy frameworks
- **components/** - React components
  - `SearchScopeGenerator.jsx` - Main interactive tool for generating implementation scope
  - `FeaturesList.jsx` - Feature catalog with filtering
  - `DecisionQuadrants.jsx` - Strategic decision frameworks
  - `Hero.jsx`, `Stats.jsx`, etc. - UI components
- **app/** - Next.js app directory
- **theme.config.jsx** - Nextra theme configuration

## Development

```bash
npm install
npm run dev
```

Site runs at http://localhost:3000

## Key Components

### SearchScopeGenerator (Primary Interactive Tool)
Located at `/components/SearchScopeGenerator.jsx`. This tool:
- Walks through client assessment (profile, data readiness, capacity)
- Accounts for AI enrichment as a data remediation path
- Generates phased implementation scope (Day 1, Day 30, Day 60-90)
- Recommends investment levels per feature
- Suggests support tier based on capacity

### FeaturesList
Complete feature catalog with:
- 31 features across 6 buckets
- Three pillar ratings (data, governance, safety)
- Filtering and search
- Expandable detail cards

## Key Concepts

- **6 Buckets**: Core Search (8), AI Search (6), Discovery (8), Merchandising (6), Recovery (2), Analytics (1)
- **3 Pillars**: Data Dependence, Governance Required, Operational Safety (green/yellow/red)
- **4 Investment Levels**: MVP, Standard, Polished, Premium
- **4 Support Tiers**: Self-Service, Guided, Partnership, Managed
- **Implementation Phases**: Day 1, Day 30, Day 60-90

## Tech Stack

- Next.js 15 + Nextra
- React 19
- Tailwind CSS
- Lucide React icons
- Mermaid.js for diagrams
