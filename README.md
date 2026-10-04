# Associated Insurance Agency (AIA) — Web Platform & Agentic WebMCP Integration

> **"We Shop. You Save. Insurance Built For You."**  
> An enterprise-grade, SEO-optimized web portal and autonomous AI agent platform for **Associated Insurance Agency (AIA)**, a premier independent Connecticut insurance brokerage founded in 2016.

[![Framework: Astro 7](https://img.shields.io/badge/Framework-Astro%20v7.0.5-orange.svg)](https://astro.build)
[![UI: React 19](https://img.shields.io/badge/UI-React%20v19.2.7-blue.svg)](https://react.dev)
[![Styling: Tailwind CSS v4](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4.3.2-38bdf8.svg)](https://tailwindcss.com)
[![WebMCP Enabled](https://img.shields.io/badge/WebMCP-JSON--RPC%202.0-8b5cf6.svg)](#-webmcp--agentic-ai-integration)
[![Multilingual](https://img.shields.io/badge/Locales-EN%20%7C%20ES%20%7C%20PT%20%7C%20TR-emerald.svg)](#-multilingual-architecture-i18n)
[![Deployment: Vercel](https://img.shields.io/badge/Deploy-Vercel-black.svg)](https://vercel.com)

---

## 📋 Overview

Associated Insurance Agency (AIA) operates three physical branch offices across Connecticut (**Danbury Headquarters**, **Watertown Branch**, and **Bridgeport Community Branch**). As an independent insurance agency, AIA represents over 11 leading regional and national insurance carriers (Safeco, Travelers, The Hartford, Progressive, Foremost, Guard, Infinity, Main Street America, National General, Victoria, and K&K Insurance).

This project pairs a modern, blazing-fast web experience for prospective and existing policyholders with a cutting-edge **Model Context Protocol (MCP)** and **WebMCP** architecture. This enables external AI agents (Claude, Cursor, Antigravity, and browser-native agents) to programmatically query agency data, calculate quote estimates, locate multilingual agents, and submit quote requests.

---

## ✨ Key Features

### 🏛️ Digital Agency Portal
- **Independent Carrier Comparison**: Informs customers of coverage lines across personal (Auto, Homeowners, Renters, Condo, Umbrella) and commercial (BOP, General Liability, Commercial Property, Workers' Comp, Commercial Auto) products.
- **Multilingual Support (i18n)**: Fully localized experiences with native content in **English (EN)**, **Spanish (ES)**, **Portuguese (PT)**, and **Turkish (TR)**.
- **Interactive Team Showcase & Bio Modals**: Accessible, interactive employee profile cards on the About page featuring all 9 team members across agency leadership and customer service representatives (Ronald T. Boucher, Yesica D. Ramirez-Mendez, Betania Almeida, Camila Macedo de Jesus, Isayeli Perez De La Mora, Ema Rego, Clara De Barros, Ashley L. Mercan, Janaija S. Hammer) with spoken language badges, specialty tags, and complete biographical pop-up modals translated into English, Spanish, Portuguese, and Turkish.
- **Optimized Asset Pipeline**: Leverages Astro's native `astro:assets` image engine for zero-CLS responsive image serving, automatic WebP format conversion, and lazy loading.
- **Direct Carrier Bill Pay & Claims Directory**: Fast access to 24/7 direct phone lines and self-service online payment links for all 11 partnered insurance carriers.
- **Customer Service Hub**: Interactive claims filing guidance, policy change request steps, and Connecticut state insurance regulations.
- **Content Collections**: Type-safe Markdown blog articles covering risk management, seasonal Connecticut hazards, and insurance guidance.

### 🤖 WebMCP & Agentic AI Integration
- **Dual-Layer Tool Calling**:
  - **Browser Runtime (`WebMCP`)**: Registers tools onto `window.modelContext` / `document.modelContext` for in-browser AI agents and automated assistants.
  - **HTTP JSON-RPC 2.0 Endpoint (`/api/mcp`)**: Server-side standard Model Context Protocol endpoint for external agents (Claude Desktop, Cursor, Antigravity CLI, custom LLM workflows).
- **Interactive WebMCP Inspector**: A built-in floating developer UI component (`WebMcpInspector.tsx`) allowing real-time testing, inspection of JSON schemas, and live execution of all 9 agency tools.
- **Generative Engine Optimization (GEO)**:
  - Standardized LLM indexing via [`/llms.txt`](public/llms.txt) and [`/llms-full.txt`](public/llms-full.txt).
  - Open discovery manifests via [`/.well-known/mcp.json`](public/.well-known/mcp.json) and [`/.well-known/ai-plugin.json`](public/.well-known/ai-plugin.json).

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | [Astro v7.0.5](https://astro.build) | Island architecture, hybrid static & serverless rendering |
| **Adapter** | [@astrojs/vercel](https://docs.astro.build/en/guides/integrations-guide/vercel/) | Serverless edge & API route hosting |
| **UI Components** | [React v19.2.7](https://react.dev) | Interactive islands with [Framer Motion v12.42](https://www.framer.com/motion/) |
| **Asset Engine** | [Astro Assets](https://docs.astro.build/en/guides/images/) | Build-time image optimization, WebP generation & responsive sizing |
| **Styling** | [Tailwind CSS v4.3.2](https://tailwindcss.com) | Integrated via `@tailwindcss/vite` with custom theme tokens |
| **Typography** | [Geist Sans & Mono](https://fontsource.org) | Loaded via `@fontsource/geist-sans` and `@fontsource/geist-mono` |
| **Icons** | [Phosphor Icons](https://phosphoricons.com) | Provided by `@phosphor-icons/react` |
| **SEO & Meta** | [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | Automated sitemap generation, JSON-LD Schema.org structured data |
| **Type Safety** | [TypeScript v6.0](https://www.typescriptlang.org) | Strict typing across components, content collections, and MCP schemas |

---

## 🧰 WebMCP Tool Catalog

The platform exposes **9 standardized tools** callable through both the browser runtime and `/api/mcp`:

| Tool Name | Type | Description |
| :--- | :---: | :--- |
| `get_agency_profile` | Read-only | Agency background, licensing in CT/NY/NJ/MA, corporate contact info, carrier count. |
| `get_office_locations` | Read-only | Addresses, phone/fax, office hours, GPS coordinates, and supported languages for branches. |
| `find_agent_by_language` | Read-only | Finds AIA branches and licensed personnel fluent in English, Spanish, Portuguese, or Turkish. |
| `get_insurance_products` | Read-only | Detailed breakdown of personal and commercial policies, limit recommendations, and bundle discounts. |
| `calculate_quote_estimate` | Read-only | Instant premium estimations factoring location, replacement value, deductible, and multi-policy bundling. |
| `submit_quote_request` | Action | Ingests structured quote requests, generates confirmation codes, and stages inquiries for agency review. |
| `get_carrier_billing_directory` | Read-only | Customer service phone numbers, claims lines, and online payment URLs for all 11 carriers. |
| `search_knowledge_base` | Read-only | Query Connecticut statutory liability minimums (25/50/25), flood exclusions, claims procedures, and FAQs. |
| `check_office_open_status` | Read-only | Real-time Eastern Time evaluation of office operating status (Mon–Fri 8:30 AM – 5:00 PM EST). |

---

## 📁 Project Directory Structure

```text
aia/
├── public/
│   ├── .well-known/
│   │   ├── ai-plugin.json      # OpenAI / generic AI plugin manifest
│   │   └── mcp.json            # Model Context Protocol service discovery
│   ├── images/
│   │   ├── logo.webp           # Static brand logo fallback
│   │   └── logo.png            # Static brand logo fallback for Schema.org
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── llms.txt                # Curated AI knowledge base and endpoint index
│   ├── llms-full.txt           # Comprehensive LLM documentation & carrier directory
│   └── robots.txt              # Search engine & AI crawler directives
├── src/
│   ├── assets/                 # Optimized static assets (processed via astro:assets)
│   │   ├── aia-logo.webp       # Official AIA oval brand emblem
│   │   ├── aia_ronald.png      # Ronald T. Boucher portrait
│   │   ├── aia_yesica.png      # Yesica D. Ramirez-Mendez portrait
│   │   ├── aia_batania.png     # Betania Almeida portrait
│   │   ├── aia_camila.png      # Camila Macedo de Jesus portrait
│   │   ├── aia_isayeli.png     # Isayeli Perez De La Mora portrait
│   │   ├── aia_ema.png         # Ema Rego portrait
│   │   ├── aia_clara.png       # Clara De Barros portrait
│   │   ├── Ashley_AIA-Meet-the-team.png # Ashley L. Mercan portrait
│   │   └── aia_janaija.png     # Janaija S. Hammer portrait
│   ├── components/             # Astro & React UI components
│   │   ├── FAQAccordion.tsx     # Animated interactive FAQ accordion
│   │   ├── Footer.astro        # Agency footer with brand badge, branch info & carriers
│   │   ├── Header.astro        # Agency header with brand badge, navigation & office hours
│   │   ├── Navigation.tsx      # Responsive header navbar & multilingual selector
│   │   ├── QuoteForm.tsx       # Multi-step interactive quote builder
│   │   ├── SEOHead.astro       # OpenGraph, Twitter, canonical, and JSON-LD schema
│   │   ├── TeamSection.astro   # Multilingual 9-member team grid & interactive bio pop-up modal
│   │   └── WebMcpInspector.tsx # Floating in-browser WebMCP debugging & execution modal
│   ├── content/                # Content collections
│   │   ├── blog/               # Localized Markdown articles (en, es, pt, tr)
│   │   └── testimonials/       # Customer review JSON data (en, es, pt, tr)
│   ├── content.config.ts       # Astro Content Collections schemas (Zod)
│   ├── i18n/                   # Internationalization utilities & UI string mappings
│   │   ├── team.ts             # Localized team bios, language proficiencies & modal UI strings (en, es, pt, tr)
│   │   ├── ui.ts               # Localized navigation and UI strings
│   │   └── utils.ts            # Locale resolution & route translation helpers
│   ├── layouts/
│   │   └── BaseLayout.astro    # Master HTML shell, SEOHead, Header, Footer, WebMCP init
│   ├── lib/
│   │   └── webmcp/             # WebMCP implementation
│   │       ├── init.ts         # Browser window.modelContext bootstrap
│   │       ├── runtime.ts      # WebMCP execution engine & event emitter
│   │       ├── tools.ts        # 9 AIA tool definitions, schemas, and implementations
│   │       └── types.ts        # TypeScript interfaces for MCP JSON-RPC & tools
│   ├── pages/                  # File-based routing
│   │   ├── api/
│   │   │   ├── mcp.ts          # JSON-RPC 2.0 MCP endpoint (GET/POST)
│   │   │   └── quote.ts        # REST endpoint for lead submission & retrieval
│   │   ├── blog/               # Blog index and dynamic [slug].astro routes
│   │   ├── es/                 # Spanish localized landing and section pages
│   │   ├── pt/                 # Portuguese localized pages
│   │   ├── tr/                 # Turkish localized pages
│   │   ├── about.astro         # Agency history, credentials, and office profiles
│   │   ├── commercial.astro    # Commercial lines (BOP, GL, Property, Workers' Comp)
│   │   ├── index.astro         # Main homepage with hero, carrier grid, and testimonials
│   │   ├── pay-bill.astro      # 11-carrier online payment & claims directory
│   │   ├── personal.astro      # Personal lines (Home, Auto, Renters, Umbrella)
│   │   ├── quote.astro         # Quote intake page embedding QuoteForm.tsx
│   │   └── service.astro       # Customer support, claims steps, and FAQs
│   └── styles/
│       └── global.css          # Tailwind CSS v4 @theme design tokens
├── astro.config.mjs            # Astro configuration (Vercel adapter, i18n, Sitemap, React)
├── package.json                # Project dependencies and script commands
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `>= 22.12.0` (Verify using `node -v`)
- **Package Manager**: `npm` (bundled with Node)

### Installation

Clone the repository and install all dependencies:

```bash
git clone https://github.com/henryhhall/aia-demo.git
cd aia
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

The application will be accessible at: **`http://localhost:4321`**

#### Running in Background Mode (Agent / Non-blocking)

As configured for automated agent environments:

```bash
astro dev --background
```

Manage the background process using:
- `astro dev status` — Check server status
- `astro dev logs` — Stream server logs
- `astro dev stop` — Stop the background server

---

## 🏗️ Production Build & Deployment

To generate an optimized production bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### Deployment Configuration

The application is pre-configured with `@astrojs/vercel` for zero-configuration deployment to [Vercel](https://vercel.com):
- Serverless API routes (`/api/mcp`, `/api/quote`) are rendered dynamically (`prerender = false`).
- Content and marketing pages are pre-rendered statically for high performance and low latency.
- Dynamic localized paths adhere to Astro 7 i18n specifications.

---

## 🌐 Multilingual Architecture (i18n)

The site supports four primary languages with route prefixing for non-default locales:

| Language | Route Prefix | Primary Service Region |
| :--- | :--- | :--- |
| **English** (Default) | `/` | All Connecticut branches |
| **Español** (Spanish) | `/es` | Danbury, Watertown, Bridgeport |
| **Português** (Portuguese) | `/pt` | Danbury, Watertown, Bridgeport |
| **Türkçe** (Turkish) | `/tr` | Danbury Headquarters |

Localization helpers are located in [`src/i18n/utils.ts`](src/i18n/utils.ts) and [`src/i18n/ui.ts`](src/i18n/ui.ts).

---

## 🔌 API & Integration Guide

### 1. Model Context Protocol (`/api/mcp`)

The MCP endpoint allows AI agents to discover tools and invoke functions via standard JSON-RPC 2.0.

- **GET `/api/mcp`**: Returns the server identity, capabilities, and list of all available tool definitions with JSON schemas.
- **POST `/api/mcp`**: Executes JSON-RPC 2.0 methods:
  - `initialize`: Establishes protocol version and capabilities.
  - `tools/list`: Lists all available tool specifications.
  - `tools/call`: Executes a tool with the provided arguments:
    ```json
    {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "tools/call",
      "params": {
        "name": "calculate_quote_estimate",
        "arguments": {
          "insuranceType": "home",
          "location": "Danbury",
          "estimatedValueOrVehicles": 500000,
          "bundleWithOtherPolicy": true
        }
      }
    }
    ```

### 2. Quote Intake (`/api/quote`)

- **POST `/api/quote`**: Submits a lead payload (`name`, `email`, `phone`, `insuranceType`, `preferredOffice`, `preferredLanguage`, `notes`). Returns a confirmation code (`AIA-XXXXXX`).
- **GET `/api/quote`**: Returns recent submissions count and metadata for internal testing.

---

## 🏢 Physical Office Locations

| Office | Address | Phone | Languages Spoken |
| :--- | :--- | :--- | :--- |
| **Danbury Corporate HQ** | 50 Newtown Road, Suite 1, Danbury, CT 06810 | (203) 748-9272 | English, Spanish, Portuguese, Turkish |
| **Watertown Branch** | 1157 Main Street, Watertown, CT 06795 | (860) 274-8888 | English, Spanish, Portuguese, Turkish |
| **Bridgeport Branch** | 2465 Main Street, Bridgeport, CT 06606 | (203) 333-8880 | English, Spanish, Portuguese |

**Hours of Operation**: Monday – Friday: 8:30 AM – 5:00 PM EST

---

## 📄 License & Attribution

Associated Insurance Agency © 2016–Present. All rights reserved.  
Partner carrier trademarks (Safeco, Travelers, Progressive, The Hartford, etc.) belong to their respective corporate entities.
