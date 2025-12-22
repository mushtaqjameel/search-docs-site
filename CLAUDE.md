# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website documentation hub for a B2B Search Platform. It contains sales materials, feature documentation, implementation guides, and interactive assessment tools for search solutions.

## Structure

- **index.html** - Homepage with overview of features, buckets, and navigation
- **features.html** - Detailed feature documentation (30 features across 6 buckets)
- **sales.html** - Sales playbook with personas, discovery questions, and objection handling
- **implementation.html** - Technical implementation guides and data requirements
- **tools.html** - Interactive assessment calculator and decision quadrants
- **reference.html** - Quick reference documentation and cheat sheets
- **styles.css** - Neo-Brutalism design system with CSS custom properties
- **docs/** - Source markdown documents

## Development

This is a purely static site with no build process. To develop:
- Open any HTML file directly in a browser
- Use a local server for testing: `python3 -m http.server 8000` or similar

## External Dependencies

- **Google Fonts**: Inter font family
- **Font Awesome 6.5.1**: Icon library (loaded from CDN)
- **Mermaid.js**: Flowchart diagrams (loaded from CDN)

## Design System

The site uses a Neo-Brutalism design aesthetic defined in `styles.css`:
- Bold borders (3px), box shadows for depth
- Primary palette: red (#ff3333), yellow (#ffff00), blue (#0066ff)
- Six bucket colors for feature categories (core, smart, discovery, merchandising, recovery, analytics)
- Investment level colors: MVP (gray), Standard (green), Polished (blue), Premium (purple)
- Pillar rating system: green (easy), yellow (moderate), red (complex)

## Key Concepts

- **6 Buckets**: Feature categories (Core Search, Smart Search, Discovery, Merchandising, Recovery, Analytics)
- **3 Pillars**: Rating dimensions (Data Dependence, Governance Required, Operational Safety)
- **4 Investment Levels**: MVP, Standard, Polished, Premium
- **30 Features**: Individual search capabilities rated across all pillars
- **4 Support Tiers**: Self-Service, Guided, Partnership, Managed

## Feature Distribution

- Core Search & Findability: 6 features
- Smart Search & Relevance: 6 features
- Discovery & Reordering: 8 features
- Merchandising & Control: 6 features
- Recovery & Resilience: 2 features
- Analytics & Optimization: 2 features
