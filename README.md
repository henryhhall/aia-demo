# Associated Insurance Agency (AIA) — Web Platform & Agentic WebMCP Integration

> **"We Shop. You Save. Insurance Built For You."**  
> An enterprise-grade, SEO-optimized web portal and autonomous AI agent platform for **Associated Insurance Agency (AIA)**, a premier independent Connecticut insurance brokerage founded in 2016.

[![Framework: Astro 7](https://img.shields.io/badge/Framework-Astro%20v7.0.5-orange.svg)](https://astro.build)
[![UI: React 19](https://img.shields.io/badge/UI-React%20v19.2.7-blue.svg)](https://react.dev)
[![Styling: Tailwind CSS v4](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4.3.2-38bdf8.svg)](https://tailwindcss.com)
[![WebMCP Enabled](https://img.shields.io/badge/WebMCP-11%20Tools%20Active-8b5cf6.svg)](#-webmcp--agentic-ai-integration)
[![Email: Resend](https://img.shields.io/badge/Email-Resend%20v6-black.svg)](https://resend.com)
[![Python: 3.10+](https://img.shields.io/badge/Python-3.10%2B-3776ab.svg)](https://www.python.org)
[![Bot Defense: reCAPTCHA v3](https://img.shields.io/badge/Bot%20Defense-reCAPTCHA%20v3-emerald.svg)](#-bot-defense--security-recaptcha-v3)
[![Multilingual](https://img.shields.io/badge/Locales-EN%20%7C%20ES%20%7C%20PT%20%7C%20TR-emerald.svg)](#-multilingual-architecture-i18n)
[![Deployment: Vercel](https://img.shields.io/badge/Deploy-Vercel-black.svg)](https://vercel.com)

---

## 📋 Overview

Associated Insurance Agency (AIA) operates three physical branch offices across Connecticut (**Danbury Headquarters**, **Watertown Branch**, and **Bridgeport Community Branch**). As an independent insurance agency, AIA represents over 11 leading regional and national insurance carriers (Safeco, Travelers, The Hartford, Progressive, Foremost, Guard, Infinity, Main Street America, National General, Victoria, and K&K Insurance).

This project pairs an ultra-fast web experience for policyholders with a cutting-edge **Model Context Protocol (MCP)** and **WebMCP** architecture. The platform includes an interactive multi-line quote engine, an ACORD 25 Certificate of Insurance hub, a transactional email dispatch service via **Resend**, and a companion **Python underwriting modeling suite** for carrier rating schema validation and producer brief synthesis. External AI agents (Claude, Cursor, Antigravity, and browser-native agents) can programmatically query agency data, explore insurance products, locate multilingual agents, and submit quote requests.

---

## ✨ Key Features

### 🏛️ Digital Agency Portal
- **Independent Carrier Comparison**: Informs customers of coverage lines across personal (Auto, Homeowners, Renters, Condo, Umbrella) and commercial (BOP, General Liability, Commercial Property, Workers' Comp, Commercial Auto) products.
- **Universal Multilingual Quote Intake Engine** (`/quote`, `/es/quote`, `/pt/quote`, `/tr/quote`):
  - **Universal Embeddable Multi-Step Component** (`QuoteForm.tsx`): Built as a self-contained, embeddable component integrated directly into page heroes (homepage across EN/ES/PT/TR, branch location pages) as well as dedicated `/quote` landing routes. Allows customers to complete their quote request in-place without page redirections.
  - **Zero Duplicate Friction / Parameter Fast-Forward**: If a visitor arrives via a direct link with query parameters (e.g. `/quote?type=auto&zip=06810`), `QuoteForm.tsx` automatically detects the pre-filled parameters and fast-forwards straight to Step 2 (Contact Info) with Step 1 marked complete.
  - **Unified Multi-Step Intake Funnel**: Combines a shared customer contact foundation (name, phone with SMS consent, email, contact preference) with dynamic line-specific risk anchors for Homeowners (property address & assessor/GIS lookup), Auto (vehicles & VIN), Commercial Auto (fleet sizing), Umbrella (underlying limits), and Commercial GL (business trade & NAICS).
  - **Automated Route Redirection**: 301 redirects preserve external links and bookmarks by routing previous `/quote/homeowners` URLs across all locales (`/quote/homeowners`, `/es/...`, `/pt/...`, `/tr/...`) directly to `/quote?type=home`.
  - **Carrier-Ready Intake Payloads**: Validates submissions with honeypot bot mitigation and dispatches real-time producer briefings and customer confirmations.
- **Transactional Lead & Quote Email Pipeline (Resend Integration)**:
  - **Dual Notification Dispatch** (`src/lib/email.ts`): Automatically dispatches two transactional emails upon every quote submission via web forms or WebMCP tool invocations:
    1. **Unified Agency Producer Dispatch**: Rich HTML and plain-text briefing sent to the central agency inbox configured via `QUOTE_NOTIFICATION_EMAIL` (defaulting to `ron@aia-danbury.com`) detailing customer contact info, reach preference, SMS consent, and risk anchors—unifying leads regardless of applicant ZIP code.
    2. **Customer Confirmation**: Branded email acknowledging receipt with the confirmation reference code (`AIA-XXXXXX`) and a 24-business-hour follow-up commitment.
  - **Zero-Failure Local Development Mode**: Automatically runs in simulation mode when `RESEND_API_KEY` is unset, outputting clean audit logs to stdout.
- **Certificate of Insurance (COI / ACORD 25) Hub**: Dedicated multilingual request portals (`/certificate-request`, `/es/certificate-request`, `/pt/certificate-request`, `/tr/certificate-request`, with `/coi` and `/certificates` aliases):
  - **4-Step Interactive ACORD 25 Wizard** (`CertificateRequestForm.tsx`): Guides requestors through named insured verification, certificate holder & delivery dispatch (direct email & fax), contract endorsement terms (Additional Insured CG 20 10 / CG 20 37, Waiver of Subrogation, Primary & Non-Contributory wording), and project specifications upload.
  - **Branded React Email Templates** (`src/emails/`): Leverages `@react-email/components` for pixel-perfect transactional emails:
    1. `CertificateConfirmationEmail.tsx`: Customer receipt confirmation with reference code and turnaround SLA.
    2. `CertificateRequestEmail.tsx`: High-priority agency producer briefing detailing contract endorsements, job-site specs, and attached insurance certificates.
  - **Emergency Rush Processing**: Same-day issuance dispatch callout for active job sites, municipal permits, and contractor bid deadlines with direct hotline access to Danbury HQ.
  - **Full ACORD 25 Educational Guide**: Explains Connecticut commercial insurance requirements, statutory limitations, and the legal distinction between informational certificates and policy endorsements.
  - **Dedicated Serverless API Endpoint** (`/api/certificate-request`): Generates unique audit references (`COI-CT-2026-XXXXXX`) with dual honeypot traps (client-side spoofing & server-side rejection), time-based submission velocity tracking (`form_rendered_at`), and Google reCAPTCHA v3 verification.
- **Dedicated Personal SEO Landing Pages (Hub & Spoke Architecture)**: In-depth, targeted guides with dedicated `Service`, `BreadcrumbList`, and `FAQPage` schema across English, Spanish, Portuguese, and Turkish:
  - **Homeowners Insurance** (`/personal/homeowners`, `/es/...`, `/pt/...`, `/tr/...`): Dwelling replacement cost vs market value, winter freeze & ice damming, water backup endorsements, flood exclusions, and 15%–25% multi-policy bundling discounts.
  - **Auto & RV Insurance** (`/personal/auto`, `/es/...`, `/pt/...`, `/tr/...`): Connecticut General Statutes (CGS § 14-112) minimums (25/50/25), recommended 100/300/100 defense limits, collision, comprehensive (animal strikes, storm debris), UM/UIM coverage, and recreational vehicle (RV/camper/trailer) riders.
  - **Personal Umbrella Liability** (`/personal/umbrella`, `/es/...`, `/pt/...`, `/tr/...`): $1M to $5M+ excess liability safeguarding home equity, retirement savings (401k/IRA), and future wages against catastrophic litigation for ~$20/month.
  - **Renters & Tenant Insurance** (`/personal/renters`, `/es/...`, `/pt/...`, `/tr/...`): Debunking the landlord building insurance myth, personal property replacement cost, apartment guest liability, loss of use, and instant proof of coverage for lease signings starting at $15/month.
- **Dedicated Commercial SEO Landing Pages (Hub & Spoke Architecture)**: In-depth, targeted guides with dedicated `Service`, `BreadcrumbList`, and `FAQPage` schema across English, Spanish, Portuguese, and Turkish:
  - **Commercial General Liability** (`/commercial/general-liability`, `/es/...`, `/pt/...`, `/tr/...`): Slip-and-fall protections, completed operations, $1M/$2M standard limits, and same-day ACORD 25 Certificate of Insurance (COI) issuance for contractors.
  - **Commercial Auto & Fleet** (`/commercial/auto`, `/es/...`, `/pt/...`, `/tr/...`): Work vans, trucks, high-limit Combined Single Limit (CSL) liability, CGS § 14-112 compliance, tool floaters, and Hired/Non-Owned Auto (HNOA).
  - **Workers' Compensation & Compliance** (`/commercial/workers-compensation`, `/es/...`, `/pt/...`, `/tr/...`): Statutory benefits under CGS § 31-284, stop-work order defense, sole-proprietor Ghost Policies, and NCCI payroll classification audit assistance.
- **Dedicated Branch Office Pages & Local SEO Architecture** (`/locations`, `/locations/danbury`, `/locations/watertown`, `/locations/bridgeport`, and localized equivalents across `/es/...`, `/pt/...`, `/tr/...`):
  - **16-Route Multi-Office Network**: High-converting localized landing pages for Danbury Headquarters (50 Newtown Rd Ste 1), Watertown Branch (51 Depot St Ste 112), and Bridgeport Community Branch (2465 Main St), plus central Hub directory (`/locations`).
  - **Comprehensive Local Structured Data**: Implements full Schema.org `@graph` metadata with `InsuranceAgency`, `PostalAddress`, `GeoCoordinates`, `openingHoursSpecification`, `areaServed`, `hasMap`, `employee` rosters, `BreadcrumbList`, and localized `FAQPage`.
  - **Hero Rate Comparison Integration**: Split-screen Hero embedding the interactive `QuoteForm.tsx` island pre-populated with local office ZIP codes (`06810` for Danbury, `06795` for Watertown, `06606` for Bridgeport), localized coverage area indicators, click-to-call, and one-tap directions for seamless in-place quote submissions.
  - **Assigned Producer & Staff Rosters**: Branch-specific team directories highlighting local producers, National Producer Numbers (NPN), languages spoken (English, Spanish, Portuguese, Turkish), and direct consultative access.
  - **Hyper-Local Risk Profiling**: Tailored coverage narratives addressing regional risks (Candlewood Lake watercraft and flood zones, Litchfield County winter storms and tree-fall, Bridgeport coastal marine and commercial liability).
  - **Sticky NAP & Interactive Mapping**: Sticky Name, Address, Phone (NAP) cards, operating hours, and full responsive Google Maps embeds.
  - **Dynamic Header & Mobile Click-to-Call Phone Routing**: Global top bar header (`Header.astro`) and mobile conversion bar (`StickyMobileCallBar.astro`) dynamically detect the active branch route (via `locationId` prop or URL path resolution) to present the office label, active top-bar link underline, and direct one-tap dialing to AIA's primary phone line `(203) 748-9272`.
- **Rich Multi-Tier Navigation Dropdowns**: Interactive desktop hover cards with glassmorphism and mobile accordion drill-downs for both **Personal** and **Commercial** coverage clusters across all four languages, featuring direct links to Certificate Requests and Location pages in main and sub navigation.
- **Multilingual Support (i18n)**: Fully localized experiences with native content in **English (EN)**, **Spanish (ES)**, **Portuguese (PT)**, and **Turkish (TR)**.
- **Dedicated Team Directory & Bio Modals**: Accessible, interactive employee profile cards on dedicated Team pages (`/team`, `/es/team`, `/pt/team`, `/tr/team`) and the About page featuring all 9 team members across agency leadership and customer service representatives (Ronald T. Boucher, Yesica D. Ramirez-Mendez, Betania Almeida, Camila Macedo de Jesus, Isayeli Perez De La Mora, Ema Rego, Clara De Barros, Ashley L. Mercan, Janaija S. Hammer) with spoken language badges, specialty tags, direct customer support access, and complete biographical pop-up modals translated into English, Spanish, Portuguese, and Turkish.
- **Optimized Asset Pipeline**: Leverages Astro's native `astro:assets` image engine for zero-CLS responsive image serving, automatic WebP format conversion, and lazy loading.
- **Direct Carrier Bill Pay & Claims Directory (`CarrierBillingTable.astro` & `billingCarriers.ts`)**: Fast access to 24/7 direct phone lines and self-service online payment links for all partnered insurance carriers across English, Spanish, Portuguese, and Turkish (`/pay-bill`, `/es/pay-bill`, `/pt/pay-bill`, `/tr/pay-bill`). Cleanly segmented into **Personal Insurance Carriers** (Home, Auto, Umbrella) and **Commercial Insurance Carriers** (General Liability, Commercial Fleet, Workers' Comp) with instant click-to-pay portals and dedicated customer service lines.
- **Multilingual Direct Producer Routing Desk (`MultilingualRoutingNotice.astro`)**: High-converting consultation desk integrated across the homepage and contact pages in all four languages, highlighting AIA's competitive moat: licensed Connecticut agents fluent in English, Spanish, Portuguese, and Turkish with direct one-tap dialing to `(203) 748-9272` and branch office assignment.
- **Customer Service Hub**: Interactive claims filing guidance, policy change request steps, certificate request routing, and Connecticut state insurance regulations.
- **Multilingual Contact Hub, Team Photo Hero & Interactive Map Switcher**: Fully localized contact pages (`/contact`, `/es/contact`, `/pt/contact`, `/tr/contact`) featuring an executive Team Photo Hero section (`ContactHero.astro`) showcasing the full Associated Insurance Agency team (`Photo-of-the-Associated-Insurance-Agency-Team-1536x926.jpg`) with unobstructed portraits, quick direct calling, operating hours, and trust badges, paired with an interactive multi-office Google Maps showcase (`OfficeLocationsMap.astro`) enabling seamless tab switching between Danbury Headquarters, Watertown Branch (51 Depot St Ste 112), and Bridgeport Branch (2465 Main Street), complete with one-click driving directions, direct phone dialing, and honeypot-protected inquiry forms.
- **Regulatory Compliance & Disclaimers**: Prominent coverage binding notices across the global footer, quote builder, certificate request forms, and contact pages in all four supported languages confirming that coverage cannot be bound, altered, or cancelled via website form, email, or voicemail until directly confirmed in writing by a licensed agent.
- **TCPA & 10DLC Communications Consent**: Standardized telephone and SMS consent disclosure embedded across all intake forms (`QuoteForm.tsx`, `ContactForm.tsx`, `CertificateRequestForm.tsx`): *"Providing a number permits calls/texts from us regarding the message."*
- **Terms of Service (Multilingual)**: Comprehensive boilerplate terms pages (`/terms`, `/es/terms`, `/pt/terms`, `/tr/terms`) detailing independent brokerage representation, non-binding quote estimates, carrier portal links, user conduct, and Connecticut governing law.
- **Privacy Policy & GLBA Consumer Financial Notice (Multilingual)**: Complete privacy disclosure pages (`/privacy`, `/es/privacy`, `/pt/privacy`, `/tr/privacy`) detailing Title V Gramm-Leach-Bliley Act (GLBA) compliance, Connecticut Data Privacy Act (CTDPA) standards, carrier underwriting data sharing, and strict 10DLC mobile confidentiality rules prohibiting any third-party sharing of mobile numbers or SMS opt-in data for marketing purposes.
- **RFC 9116 Security Policy & Vulnerability Disclosure (`security.txt`)**: Standardized security disclosure declarations available at `/.well-known/security.txt` and localized across Spanish (`security-es.txt`), Portuguese (`security-pt.txt`), and Turkish (`security-tr.txt`), detailing reporting protocols, encryption keys, policy terms, and multi-channel response SLAs.
- **Comprehensive XML & HTML Sitemaps**: Automated standard XML sitemaps generated via `@astrojs/sitemap` (`/sitemap-index.xml`, `/sitemap-0.xml`, with `/sitemap.xml` redirect) indexing all localized pages including Certificate Request pages, paired with human-navigable HTML sitemaps across English (`/sitemap`), Spanish (`/es/sitemap`), Portuguese (`/pt/sitemap`), and Turkish (`/tr/sitemap`) linking to all core insurance lines, certificate requests, branch offices, and legal pages.
- **Content Collections & Editorial Integrity**: Type-safe Markdown blog articles covering risk management, seasonal Connecticut hazards, and insurance guidance. In alignment with transparent brokerage standards, generic or unverified consumer testimonials have been completely excised across all language homepages in favor of authentic carrier credentialing, licensed producer bios, and verifiable agency licensing data.
- **Location-Aware Article Filtering & Hyper-Local Content Hub**:
  - **Branch Office Page Integration** (`LocationPageContent.astro`): Physical location landing pages (`/locations/bridgeport`, `/es/locations/bridgeport`, `/pt/...`, `/tr/...`) automatically detect and showcase articles published for that specific territory (e.g. Bridgeport multi-family landlord flood vs. water backup, coastal storm surge, DP-3 dwelling policies). If a branch currently has no tagged articles, the section cleanly stays hidden.
  - **Interactive Blog Archive Filtering** (`BlogArchiveList.astro`): Central blog archives across all four languages (`/blog`, `/es/blog`, `/pt/blog`, `/tr/blog`) feature accessible, zero-reload location filter tabs ("All Locations", "Bridgeport", "Danbury", "Watertown") with dynamic post count badges and localized empty state fallbacks.
  - **URL Deep-Linking & History State Sync**: Filter states persist via URL query parameters (`/blog?location=bridgeport`), allowing seamless external link sharing, bookmarking, and native browser forward/backward navigation (`history.replaceState`).
  - **Location Matching Taxonomy & Utilities** (`src/lib/blog.ts` & `src/content.config.ts`): Type-safe Astro content collection schema supporting optional `location` frontmatter alongside intelligent multilingual tag keyword inference (`Bridgeport insurance`, `seguro en Bridgeport`, `seguro em Bridgeport`, `Bridgeport sigortası`).
  - **11 Localized Hyper-Local Risk Playbooks (44 Articles across 4 Locales)**: Comprehensive localized risk guides engineered for Connecticut policyholders and Generative Engine Optimization (GEO), published across English, Spanish, Portuguese, and Turkish:
    1. **Cross-Border Commercial Truck Compliance (I-84 & I-684)**: Weight thresholds (10,000 lbs vs 18,000 lbs), NY Highway Use Tax (HUT) decals, Brewster/Bedford I-84/I-684 inspection traps, cross-border commercial auto, tool floaters, and out-of-state liability endorsements for CT contractors working in Westchester, Putnam, and NYC.
    2. **Bridgeport Multi-Family Landlord Flood & Water Backup**: Combined sewer overflows, Black Rock and East End flood risks, DP-3 dwelling fire policies, NFIP vs private flood limits, and tenant water backup endorsements.
    3. **Candlewood Lake & Lake Kenosia Waterfront & Marine Risk**: Shoreline erosion, private dock and boat lift coverage, Candlewood Lake winter ice damage, flood zones (AE/VE), and watercraft liability riders.
    4. **Bridgeport Contractor Tool Floaters & Inland Marine**: Tools stolen from work vans/job sites, commercial auto coverage gaps, Inland Marine equipment floaters, and scheduled tool coverage.
    5. **Danbury & Fairfield County Commuter Auto Insurance**: I-84 and Route 7 cross-border traffic into Westchester/Putnam, deer collisions, multi-car discounts, and uninsured/underinsured motorist defense.
    6. **Historic Bridgeport Homebuyers Architectural Insurance**: Victorian, Colonial, and Queen Anne properties in Black Rock, Brooklawn, and Cottage District: knob-and-tube wiring, ungrounded Romex, lead paint exclusions, and true architectural replacement cost.
    7. **Connecticut Winter Freeze & Ice Dam Prevention**: Roof ice dams, attic thermal bypass, gutter heating cables, and water intrusion claims.
    8. **Still River Commercial Flash Flooding (Danbury)**: Federal Road and Newtown Road commercial flood risks, business interruption coverage, extra expense endorsements, and commercial flood riders.
    9. **Storm Surge vs. Hurricane Wind Deductibles (Seaside Park, Bridgeport)**: Long Island Sound storm surges, separating standard homeowners water damage exclusions from statutory hurricane/named-storm percentage wind deductibles (1%-5%).
    10. **International Travel Risk Management**: Medical evacuation, trip interruption, and overseas liability.
    11. **Special Event & Wedding Insurance**: Host liquor liability, venue damage, and vendor non-performance coverage.

### 🤖 WebMCP & Agentic AI Integration
- **Dual-Layer Tool Calling**:
  - **Browser Runtime (`WebMCP`)**: Registers tools onto `window.modelContext` / `document.modelContext` for in-browser AI agents and automated assistants.
  - **HTTP JSON-RPC 2.0 Endpoint (`/api/mcp`)**: Server-side standard Model Context Protocol endpoint for external agents (Claude Desktop, Cursor, Antigravity CLI, custom LLM workflows).
- **Flexible Parameter Parsing & Dual-Mode Address Resolution**:
  - The `request_certificate_of_insurance` tool accepts both single-line combined strings (`holderAddress`, e.g., `"155 Deer Hill Ave, Danbury, CT 06810"`) or modular separate fields (`holderAddress1`, `holderAddress2`, `holderCity`, `holderState`, `holderZip`), seamlessly accommodating varying agent prompt formats.
- **Dynamic In-Browser reCAPTCHA v3 & Serverless Verification**:
  - In browser contexts, `submit_quote_request` and `request_certificate_of_insurance` automatically acquire Google reCAPTCHA v3 tokens via `PUBLIC_RECAPTCHA_SITE_KEY`.
  - In serverless / headless environments, programmatic agent calls are verified via `RECAPTCHA_SECRET_KEY` or authenticated tool attribution (`source = 'WebMCP_Tool'`), preventing artificial friction while preserving bot defense.
- **Direct Browser Runtime API Dispatch**:
  - Calling `request_certificate_of_insurance` in the browser executes a direct `fetch` POST to `/api/certificate-request`, registering audit confirmation references (`COI-CT-YYYY-XXXXXX`) and dispatching transactional Resend email briefings directly to agency producers (`ron@aia-danbury.com`).
- **Hardened Input JSON Sanitization & Exploit Prevention**:
  - Comprehensive input sanitization pipeline (`src/lib/webmcp/sanitize.ts`) defending against prototype pollution (`__proto__`, `constructor`, `prototype`), Stored XSS (`<script>`, `<img onerror>`, HTML tags), and CRLF / header injection on all single-line parameters.
  - ReDoS and payload bomb mitigation enforcing recursion depth limits (max 6 levels), array item bounds (max 100 items), and maximum string lengths.
  - Active across all 11 WebMCP tools, the `/api/mcp` JSON-RPC route, the client runtime, and the interactive WebMCP Inspector.
- **Automated Verification Test Suites**:
  - **`src/lib/webmcp/test-tools.ts`**: Standalone test suite verifying registration, execution, and output payloads across all 11 WebMCP tools.
  - **`src/lib/webmcp/test-mcp-endpoint.ts`**: Verification suite testing GET discovery and JSON-RPC 2.0 methods (`initialize`, `tools/list`, `tools/call`).
- **Interactive WebMCP Inspector**: A built-in floating developer UI component (`WebMcpInspector.tsx`) allowing real-time testing, inspection of JSON schemas, and live execution of all 11 agency tools.
- **Generative Engine Optimization (GEO)**:
  - Standardized LLM indexing via [`/llms.txt`](public/llms.txt) and [`/llms-full.txt`](public/llms-full.txt).
  - Open discovery manifests via [`/.well-known/mcp.json`](public/.well-known/mcp.json) and [`/.well-known/ai-plugin.json`](public/.well-known/ai-plugin.json).
  - Audited GEO score of **88.0 / 100.0 (Grade A Citation Readiness)** documented in [`geo_audit_report.md`](geo_audit_report.md).

### 🐍 Python Underwriting & Directory Suite
- **Companion Business Logic Services**: Fully typed Python modules written to PEP 8 standards supporting underwriting risk models, rating API payloads, and producer preparation workflows:
  - **`unified_quote_service.py`**: Encapsulates the unified intake model. Combines a shared contact foundation (`SharedFoundation`) with 5 line-specific risk anchors (`HomeownersAnchor`, `PersonalAutoAnchor`, `CommercialAutoAnchor`, `UmbrellaAnchor`, `CommercialGLAnchor`) to synthesize comprehensive producer prep briefs before customer calls.
  - **`homeowners_quote_service.py`**: 4-step underwriting evaluation engine calculating Dwelling Limit A replacement costs and exporting carrier rating API JSON payloads (`HO-3 Special Form`).
  - **`office_employee_directory_service.py`**: In-memory repository modeling AIA's branch offices and staff directory, providing multilingual search and licensing credentials.
  - **`main.py`**: Executable showcase demonstrating validation, rating engine output, and directory lookups. Run via `python main.py`.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | [Astro v7.0.5](https://astro.build) | Island architecture, hybrid static & serverless rendering |
| **Adapter** | [@astrojs/vercel](https://docs.astro.build/en/guides/integrations-guide/vercel/) | Serverless edge & API route hosting |
| **UI Components** | [React v19.2.7](https://react.dev) | Interactive islands with [Framer Motion v12.42](https://www.framer.com/motion/) |
| **Email Service** | [Resend v6.32](https://resend.com) | Transactional email dispatch for agency producer alerts & customer confirmations |
| **Python Core** | [Python 3.10+](https://www.python.org) | PEP 8 companion underwriting engines, carrier payload generation & directory services |
| **Asset Engine** | [Astro Assets](https://docs.astro.build/en/guides/images/) | Build-time image optimization, WebP generation & responsive sizing |
| **Styling** | [Tailwind CSS v4.3.2](https://tailwindcss.com) | Integrated via `@tailwindcss/vite` with custom theme tokens |
| **Typography** | [Geist Sans & Mono](https://fontsource.org) | Loaded via `@fontsource/geist-sans` and `@fontsource/geist-mono` |
| **Icons** | [Phosphor Icons](https://phosphoricons.com) | Provided by `@phosphor-icons/react` |
| **SEO & Meta** | [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | Automated sitemap generation, JSON-LD Schema.org structured data |
| **Type Safety** | [TypeScript v6.0](https://www.typescriptlang.org) | Strict typing across components, content collections, and MCP schemas |

---

## 🧰 WebMCP Tool Catalog

The platform exposes **11 standardized tools** callable through both the browser runtime and `/api/mcp`:

| Tool Name | Type | Description |
| :--- | :---: | :--- |
| `get_agency_profile` | Read-only | Agency background, licensing in CT/NY/NJ/MA, corporate contact info, carrier count. |
| `get_office_locations` | Read-only | Addresses, phone/fax, office hours, GPS coordinates, and supported languages for branches. |
| `get_team_members` | Read-only | Directory of licensed agents filtered by office, language spoken, or specialty lines. |
| `get_employee_profile` | Read-only | Detailed biography, NPN credentials, languages, and direct servicing office for staff members. |
| `find_agent_by_language` | Read-only | Finds AIA branches and licensed personnel fluent in English, Spanish, Portuguese, or Turkish. |
| `get_insurance_products` | Read-only | Detailed breakdown of personal and commercial policies, limit recommendations, and bundle discounts. |
| `submit_quote_request` | Action | Ingests quote requests with reCAPTCHA verification, stages leads, and dispatches Resend transactional emails. |
| `get_carrier_billing_directory` | Read-only | Customer service phone numbers, claims lines, and online payment URLs for all 11 carriers. |
| `search_knowledge_base` | Read-only | Query Connecticut statutory liability minimums (25/50/25), flood exclusions, claims procedures, and FAQs. |
| `check_office_open_status` | Read-only | Real-time Eastern Time evaluation of office operating status (Mon–Fri 8:30 AM – 5:00 PM EST). |
| `request_certificate_of_insurance` | Action | Submits official ACORD 25 Certificate of Insurance (COI) requests. Supports single-line (`holderAddress`) or granular fields (`holderAddress1`, `holderCity`, etc.), dynamic in-browser reCAPTCHA v3 token acquisition, direct API dispatch, and Resend producer briefings. |

---

## 📁 Project Directory Structure

```text
aia/
├── public/
│   ├── .well-known/
│   │   ├── ai-plugin.json      # OpenAI / generic AI plugin manifest
│   │   ├── mcp.json            # Model Context Protocol service discovery
│   │   ├── security.txt        # RFC 9116 security policy & vulnerability disclosure
│   │   ├── security-es.txt     # Spanish localized security policy
│   │   ├── security-pt.txt     # Portuguese localized security policy
│   │   └── security-tr.txt     # Turkish localized security policy
│   ├── images/
│   │   ├── logo.webp           # Static brand logo fallback
│   │   └── logo.png            # Static brand logo fallback for Schema.org
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── llms.txt                # Curated AI knowledge base and endpoint index
│   ├── llms-full.txt           # Comprehensive LLM documentation & carrier directory
│   ├── robots.txt              # Search engine & AI crawler directives
│   └── security.txt            # RFC 9116 root mirror
├── src/
│   ├── assets/                 # Optimized static assets (processed via astro:assets)
│   │   ├── aia-logo.webp       # Official AIA oval brand emblem
│   │   ├── Agency Founder and owner Ron Boucher.jpg # Ronald T. Boucher portrait
│   │   ├── aia_yesica.png      # Yesica D. Ramirez-Mendez portrait
│   │   ├── betania-aia.png     # Betania Almeida portrait
│   │   ├── camila-aia.png      # Camila Macedo de Jesus portrait
│   │   ├── isayeli-aia.png     # Isayeli Perez De La Mora portrait
│   │   ├── aia_ema.png         # Ema Rego portrait
│   │   ├── aia_clara.png       # Clara De Barros portrait
│   │   ├── Ashley_AIA-Meet-the-team.png # Ashley L. Mercan portrait
│   │   ├── aia_janaija.png     # Janaija S. Hammer portrait
│   │   ├── logo-Foremost.jpg   # Foremost Insurance brand logo
│   │   ├── logo-TheHartford.png # The Hartford brand logo
│   │   ├── logo-libertyMutual.png # Liberty Mutual brand logo
│   │   ├── logo-progressive.svg # Progressive brand logo
│   │   ├── logo-safeco.jpg     # Safeco Insurance brand logo
│   │   └── Photo-of-the-Associated-Insurance-Agency-Team-1536x926.jpg # Full agency team photo
│   ├── components/             # Astro & React UI components
│   │   ├── homeowners-quote/   # 4-step Homeowners Quote Wizard modular components
│   │   │   ├── HomeownersQuoteWizard.tsx # Wizard container & state orchestrator
│   │   │   ├── StepLocation.tsx     # Step 1: Address & property classification
│   │   │   ├── StepConstruction.tsx # Step 2: Construction, sq ft & roof specifications
│   │   │   ├── StepSafety.tsx       # Step 3: Mitigations, pools, dogs & loss history
│   │   │   ├── StepContact.tsx      # Step 4: Contact details & Coverage A preferences
│   │   │   ├── ReviewSubmit.tsx     # Review summary, rating preview & reCAPTCHA submit
│   │   │   ├── StepNavigation.tsx   # Progress bar & prev/next buttons
│   │   │   └── FieldWrapper.tsx     # Accessible field container with validation errors
│   │   ├── BlogArchiveList.astro # Multilingual blog archive list with location filter tabs, counts & URL deep-linking
│   │   ├── CarrierBillingTable.astro # Modular carrier bill-pay & phone support table
│   │   ├── CarrierLogos.astro  # Interactive grid of 11 partnered insurance carriers
│   │   ├── CertificateRequestForm.tsx # 4-step interactive ACORD 25 COI wizard with honeypots & reCAPTCHA v3
│   │   ├── CoiSwitchBanner.astro # Contextual prompt directing contractors to COI request
│   │   ├── CommercialAuditBanner.astro # High-trust banner highlighting insurance reviews
│   │   ├── ContactForm.tsx     # Interactive contact form with bot honeypots & multilingual validation
│   │   ├── ContactHero.astro   # Multilingual Contact Page Hero showcasing full team photo & trust stats
│   │   ├── FAQAccordion.tsx    # Animated interactive FAQ accordion
│   │   ├── Footer.astro        # Agency footer with brand badge, branch info & carriers
│   │   ├── Header.astro        # Agency header with brand badge, navigation & office hours
│   │   ├── HeroQuoteStarter.tsx # Instant quote starter island on the homepage
│   │   ├── LocationPageContent.astro # Reusable branch office template with 12-col Hero & sticky NAP card
│   │   ├── LocationsHubContent.astro # Central agency office directory hub template
│   │   ├── MultilingualRoutingNotice.astro # Multilingual direct producer routing desk
│   │   ├── Navigation.tsx      # Responsive header navbar & multilingual selector
│   │   ├── OfficeLocationsMap.astro # Interactive multi-office Google Maps embed showcase & switcher
│   │   ├── QuoteForm.tsx       # Universal embeddable multi-step interactive quote form (hero & dedicated quote routes)
│   │   ├── RecaptchaLegalNotice.tsx # Localized on-form Google reCAPTCHA compliance notice (en, es, pt, tr)
│   │   ├── SEOHead.astro       # OpenGraph, Twitter, canonical, and JSON-LD schema
│   │   ├── StickyMobileCallBar.astro # Floating one-tap click-to-call mobile footer bar
│   │   ├── TeamSection.astro   # Multilingual 9-member team grid & interactive bio pop-up modal
│   │   └── WebMcpInspector.tsx # Floating in-browser WebMCP debugging & execution modal (11 tools)
│   ├── content/                # Content collections
│   │   ├── blog/               # Localized Markdown articles (en, es, pt, tr)
│   │   └── testimonials/       # Customer review JSON schema (en, es, pt, tr; excised from public UI)
│   ├── data/                   # Structured data models & agency constants
│   │   ├── billingCarriers.ts  # Carrier billing portals, toll-free lines & policy categories
│   │   └── locations.ts        # Canonical branch office specifications (Danbury, Watertown, Bridgeport)
│   ├── emails/                 # Branded React Email transactional templates
│   │   ├── CertificateConfirmationEmail.tsx # Requester confirmation with receipt reference
│   │   └── CertificateRequestEmail.tsx      # Agency producer brief with risk & endorsement specs
│   ├── content.config.ts       # Astro Content Collections schemas (Zod)
│   ├── i18n/                   # Internationalization utilities & UI string mappings
│   │   ├── locations.ts        # Localized branch office content, FAQs, and SEO metadata (en, es, pt, tr)
│   │   ├── team.ts             # Localized team bios, language proficiencies & modal UI strings (en, es, pt, tr)
│   │   ├── ui.ts               # Localized navigation and UI strings
│   │   └── utils.ts            # Locale resolution & route translation helpers
│   ├── layouts/
│   │   └── BaseLayout.astro    # Master HTML shell, SEOHead, Header, Footer, WebMCP init
│   ├── lib/
│   │   ├── blog.ts             # Blog location taxonomy detection, tag parsing & relative route builders
│   │   ├── email.ts            # Resend transactional email service (producer briefs & confirmations)
│   │   ├── homeownersQuoteI18n.ts # Full multilingual copy & tooltips for homeowners quote wizard
│   │   ├── homeownersQuoteSchema.ts # Zod validation schema & rating calculation formulas
│   │   ├── recaptcha.ts        # Client-side dynamic Google reCAPTCHA v3 script injector
│   │   ├── recaptchaVerify.ts  # Server-side reCAPTCHA token verification with Google API
│   │   └── webmcp/             # WebMCP implementation
│   │       ├── init.ts         # Browser window.modelContext bootstrap
│   │       ├── runtime.ts      # WebMCP execution engine & event emitter
│   │       ├── sanitize.ts     # Input JSON sanitization & exploit defense (prototype pollution, XSS, CRLF)
│   │       ├── test-mcp-endpoint.ts # Automated test suite for /api/mcp JSON-RPC protocol
│   │       ├── test-tools.ts   # Automated test suite verifying all 11 WebMCP tools
│   │       ├── tools.ts        # 11 AIA tool definitions, schemas, and implementations
│   │       └── types.ts        # TypeScript interfaces for MCP JSON-RPC & tools
│   ├── pages/                  # File-based routing
│   │   ├── api/
│   │   │   ├── certificate-request.ts # REST endpoint for ACORD 25 COI issuance with bot defense
│   │   │   ├── contact.ts      # REST endpoint for contact inquiries with honeypot bot validation
│   │   │   ├── mcp.ts          # JSON-RPC 2.0 MCP endpoint (GET/POST) with auto email dispatch
│   │   │   └── quote.ts        # REST endpoint for lead submission & Resend email trigger
│   │   ├── blog/               # Blog index and dynamic [...slug].astro routes
│   │   │   ├── [...slug].astro # Dynamic post renderer with SEO schema & direct answer blocks
│   │   │   └── index.astro     # Central blog directory with interactive location filtering
│   │   ├── commercial/         # Dedicated commercial cluster pages
│   │   │   ├── auto.astro      # Commercial Auto & Fleet guide
│   │   │   ├── general-liability.astro # Commercial General Liability guide & COI details
│   │   │   └── workers-compensation.astro # CT Workers' Comp & CGS § 31-284 compliance guide
│   │   ├── locations/          # Branch office directory & local SEO landing pages
│   │   │   ├── [location].astro # Dynamic static route generating /locations/danbury, /watertown, /bridgeport
│   │   │   └── index.astro     # Central Agency Office Hub & geographic directory
│   │   ├── personal/           # Dedicated personal cluster pages
│   │   │   ├── auto.astro      # Personal Auto & RV guide (CGS § 14-112 limits)
│   │   │   ├── homeowners.astro # Homeowners & Dwelling guide (replacement cost, storms)
│   │   │   ├── renters.astro   # Renters & Tenant insurance guide (HO-4, liability)
│   │   │   └── umbrella.astro  # Personal Umbrella excess liability guide ($1M-$5M+)
│   │   ├── es/                 # Spanish localized pages (including /es/locations/ hub & branch routes)
│   │   ├── pt/                 # Portuguese localized pages (including /pt/locations/ hub & branch routes)
│   │   ├── tr/                 # Turkish localized pages (including /tr/locations/ hub & branch routes)
│   │   ├── about.astro         # Agency history, credentials, and office profiles
│   │   ├── certificate-request.astro # ACORD 25 Certificate of Insurance landing & request page
│   │   ├── commercial.astro    # Commercial lines overview pillar (BOP, GL, Property, Workers' Comp)
│   │   ├── contact.astro       # Contact page embedding ContactForm.tsx & OfficeLocationsMap.astro
│   │   ├── index.astro         # Main homepage with hero, carrier logos, office cards, routing desk, and blog
│   │   ├── pay-bill.astro      # Carrier billing directory with personal & commercial lines tables
│   │   ├── personal.astro      # Personal lines (Home, Auto, Renters, Umbrella)
│   │   ├── privacy.astro       # Privacy Policy & GLBA consumer financial notice
│   │   ├── quote.astro         # Universal quote intake page embedding QuoteForm.tsx
│   │   ├── service.astro       # Customer support, claims steps, and FAQs
│   │   ├── sitemap.astro       # HTML sitemap directory & XML crawler index
│   │   ├── team.astro          # Dedicated agency team directory & staff profiles
│   │   └── terms.astro         # Terms of Service & regulatory disclosures
│   └── styles/
│       └── global.css          # Tailwind CSS v4 @theme design tokens
├── homeowners_quote_service.py # Python 4-step rating engine model & API payload builder
├── office_employee_directory_service.py # Python branch office & multilingual staff directory
├── unified_quote_service.py    # Python unified quote foundation & 5 product anchors
├── main.py                     # Python entry point demonstrating all service models
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

### Environment Variables

Copy the template environment file to create your local `.env`:

```bash
cp .env.example .env
```

| Variable | Scope | Description |
| :--- | :--- | :--- |
| `PUBLIC_RECAPTCHA_SITE_KEY` | Client & Server | Google reCAPTCHA v3 site key injected into client scripts. |
| `RECAPTCHA_SECRET_KEY` | Server-only | Google reCAPTCHA v3 private secret key for out-of-band verification. |
| `RESEND_API_KEY` | Server-only | Resend API key (`re_...`). If omitted or left as placeholder, email dispatch operates in local simulated mode without errors. |
| `RESEND_FROM_EMAIL` | Server-only | Transactional sender email address (e.g., `Associated Insurance Agency <onboarding@resend.dev>`). |
| `QUOTE_NOTIFICATION_EMAIL` | Server-only | Unified agency inbox receiving incoming producer lead alerts and customer inquiries across the site (defaulting to `ron@aia-danbury.com`). |

> [!NOTE]
> Out of the box, `.env.example` includes Google's official v3 test keys which always pass with a human score of `1.0`. Resend email dispatch gracefully detects when an API key is unconfigured and logs simulated email summaries to stdout, allowing complete local development without external credentials. For production, configure live keys in **Vercel Project Settings** (`Settings` → `Environment Variables`).

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

### 🐍 Running the Python Companion Suite

To verify the companion underwriting models, rating engine payload generators, and employee directory services:

```powershell
python main.py
```

This executes the PEP 8 demonstration workflows showcasing:
1. **Unified Quote Intake & Producer Briefs**: Validates the shared contact foundation (`SharedFoundation`) paired with line-specific risk anchors across Homeowners, Personal Auto, Commercial Auto, Umbrella, and Commercial GL.
2. **Connecticut Homeowners Rating Engine**: Simulates the 4-step wizard and outputs formatted JSON payloads (`HO-3 Special Form`) matching carrier rating API specifications.
3. **Multilingual Directory & Agent Matcher**: Demonstrates branch office lookups and matches prospective clients with language-proficient producers.

---

## 🏗️ Production Build & Deployment

To generate an optimized production bundle:

```bash
npm run build
```

> [!NOTE]
> React development and production JSX runtimes (`react/jsx-runtime`, `react/jsx-dev-runtime`) are explicitly configured in `astro.config.mjs` under `vite.optimizeDeps.include`. This ensures local development React hydration remains stable without runtime JSX mismatches.

To preview the production build locally:

```bash
npm run preview
```

### Deployment Configuration

The application is pre-configured with `@astrojs/vercel` for zero-configuration deployment to [Vercel](https://vercel.com):
- Serverless API routes (`/api/mcp`, `/api/quote`, `/api/contact`, `/api/certificate-request`) are rendered dynamically (`prerender = false`).
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
| **Türkçe** (Turkish) | `/tr` | Danbury, Watertown, Bridgeport |

All legal agreements and consumer disclosures—including the **Terms of Service** (`/terms`), **Privacy Policy & GLBA Notices** (`/privacy`), **HTML Sitemaps** (`/sitemap`), and form TCPA consent language—are 100% translated and localized into Spanish, Portuguese, and Turkish.

Localization helpers are located in [`src/i18n/utils.ts`](src/i18n/utils.ts) and [`src/i18n/ui.ts`](src/i18n/ui.ts).

### 🔀 URL Redirection & Canonical Routing Matrix

To prevent broken links, eliminate duplicate SEO content, and provide seamless access across locales, standard 301 redirects are enforced in `astro.config.mjs`:

| Source Route | Target Destination | Locales Supported | Purpose |
| :--- | :--- | :---: | :--- |
| `/quote/homeowners` | `/quote?type=home` | EN, ES, PT, TR | Unifies previous standalone homeowners quote URL into universal wizard |
| `/coi`, `/certificates` | `/certificate-request` | EN, ES, PT, TR | Shorthand aliases for commercial certificate request portal |
| `/meet-the-team` | `/team` | EN, ES, PT, TR | Canonicalizes team directory route |
| `/offices` | `/locations` | EN, ES, PT, TR | Directs office queries to central agency locations hub |
| `/locations/danbury-hq` | `/locations/danbury` | EN, ES, PT, TR | Resolves legacy branch slug alias to canonical Danbury URL |
| `/security.txt` | `/.well-known/security.txt` | EN, ES, PT, TR | RFC 9116 security declaration root resolution |
| `/sitemap.xml` | `/sitemap-index.xml` | Global | Maps traditional sitemap URL to Astro multi-sitemap index |

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
        "name": "get_insurance_products",
        "arguments": {
          "category": "personal"
        }
      }
    }
    ```
  - **Automated Email Dispatch**: Calling `submit_quote_request` via JSON-RPC automatically triggers Resend transactional email notifications to the central agency quote inbox (`QUOTE_NOTIFICATION_EMAIL`).

### 2. Quote Intake (`/api/quote`)

- **POST `/api/quote`**: Submits a lead payload (`name`, `email`, `phone`, `insuranceType`, `preferredOffice`, `preferredLanguage`, `notes`, `ratingPayload`, `recaptchaToken`, `source`).
  - **Bot Mitigation**: Validates Google reCAPTCHA v3 token (`quote_form` action, score $\ge 0.5$) and hidden honeypot fields.
  - **Resend Email Trigger**: Automatically sends an HTML producer alert to the unified agency quote inbox (`QUOTE_NOTIFICATION_EMAIL`, defaulting to `ron@aia-danbury.com`) and an acknowledgement email to the applicant.
  - **Response Payload**: Returns a confirmation code (`AIA-XXXXXX`), `emailDispatched` (boolean), `emailDetails` (`simulated`, `id`, `recipient`), and stored inquiry metadata.
- **GET `/api/quote`**: Returns recent submissions count and metadata for internal testing.

### 3. Contact Inquiries (`/api/contact`)

- **POST `/api/contact`**: Ingests direct customer inquiries (`name`, `email`, `phone`, `preferredOffice`, `subject`, `message`, `preferredLanguage`, `recaptchaToken`).
  - **Google reCAPTCHA v3**: Out-of-band verification against `https://www.google.com/recaptcha/api/siteverify` requiring score $\ge 0.5$ and action `contact_form`.
  - **Honeypot Validation**: Inspects hidden decoy trap fields (`hp_website`, `hp_company`) and evaluates submission elapsed time (`form_rendered_at < 1200ms`) to proactively drop automated scraper traffic.
  - Returns an inquiry confirmation reference ID (`inq_XXXXXX`).
- **GET `/api/contact`**: Returns recent submission counts for internal monitoring.

### 4. Certificate of Insurance Intake (`/api/certificate-request`)

- **POST `/api/certificate-request`**: Processes commercial ACORD 25 Certificate of Insurance requests (`requestorName`, `requestorEmail`, `requestorPhone`, `insuredName`, `holderName`, `holderAddress` or `holderAddress1` / `holderCity` / `holderState` / `holderZip`, `deliveryMethod`, `coverages`, `isAdditionalInsured`, `hasWrittenContract`, `waiverSubrogationLines`, `primaryNonContributory`, `jobNumber` or `jobNumberOrContract`, `specialInstructions`, `agreementAccepted`, `recaptchaToken`, `hp_website`, `hp_company`, `form_rendered_at`, `source`).
  - **Flexible Address Parser**: Intelligently decomposes single-line address strings (`"155 Deer Hill Ave, Danbury, CT 06810"`) into street, city, state, and ZIP code, or accepts discrete structured address parameters.
  - **Bot Mitigation & Agent Adaptation**: Enforces dual invisible honeypots (`hp_website`, `hp_company`), client-side silent bot rejection with synthetic confirmation code spoofing, time-based velocity checks (`form_rendered_at < 1200ms`), and Google reCAPTCHA v3 verification (`certificate_request` action, score $\ge 0.5$). For programmatic WebMCP tool calls (`source === 'WebMCP_Tool'`), automatically applies verified tool attribution.
  - **Producer Email Alert**: Automatically dispatches a detailed Resend HTML briefing to the central quote/certificate inbox (`QUOTE_NOTIFICATION_EMAIL`, defaulting to `ron@aia-danbury.com`) detailing contract endorsements (Additional Insured, Waiver of Subrogation, Primary/Non-Contributory) and turnaround SLAs.
  - Returns a unique commercial tracking reference (`COI-CT-YYYY-XXXXXX`) and 2–4 hour turnaround commitment during business hours.
- **GET `/api/certificate-request`**: Returns recent submission counts for internal administrative auditing.

---

## 🛡️ Bot Defense & Security (reCAPTCHA v3 & Honeypots)

All lead generation, certificate intake, and customer inquiry forms across the site employ a layered, frictionless security model:

1. **Google reCAPTCHA v3 (Invisible)**:
   - Client utility (`src/lib/recaptcha.ts`) dynamically loads Google's verification script on demand only on interactive form views, maintaining Core Web Vitals.
   - Generates semantic action tokens (`contact_form`, `quote_form`, `certificate_request`).
   - Server-side verification (`src/lib/recaptchaVerify.ts`) inspects the returned token, validates action matching, and enforces a minimum human score of `0.5`.
2. **Invisible Decoy Honeypots & Autofill Safety**:
   - Hidden off-screen form inputs (`hp_website`, `hp_company`) rendered with zero-size clipping (`width: 0; height: 0; opacity: 0; pointer-events: none`), `aria-hidden="true"`, screen-reader only labels (`className="sr-only"`), and explicit `autoComplete="new-password"` attributes.
   - Designed to prevent browser profile managers and password autofill heuristics (Chrome, Edge, Safari, 1Password) from inadvertently populating decoy traps when real users autofill contact or commercial details.
   - Trusted user event differentiation (`e.isTrusted`) ensures synthetic script injections are intercepted while legitimate human submissions pass seamlessly.
   - Decoupled client-side stepper navigation (`Step 1 -> Step 2 -> Step 3`) so internal UI progression remains fluid and resilient to autofill, with server-side validation and spoofing enforced on final submissions.
   - Time-delta tracking (`form_rendered_at`) detects inhuman instant submissions (< 1.2s) across contact, quote, and certificate intake endpoints.
3. **Multilingual Validation & Form Resilience**:
   - Native DOM value fallback synchronization: automatically recovers and syncs input values if browser autofill populates fields without firing synthetic React change events.
   - Prominent localized inline error alerts directly adjacent to action buttons with smooth auto-scrolling (`showError`) across all 4 languages (English, Spanish, Portuguese, Turkish).
4. **Multilingual Legal Compliance & reCAPTCHA Disclaimers**:
   - Explicit on-form branding component (`RecaptchaLegalNotice.tsx`) dynamically passed the active language prop (`lang={lang}`) linking to Google's Privacy Policy & Terms of Service in **English**, **Spanish**, **Portuguese**, and **Turkish** on all form views, review steps, and directly beneath form cards.
   - Global CSS styling (`src/styles/global.css`) suppresses the default floating `.grecaptcha-badge`, keeping the WebMCP inspector and mobile navigation clean while maintaining full Google Terms compliance.
   - Standardized statutory insurance disclaimers displayed directly below form containers across all four languages confirming coverage non-binding status until written agent confirmation.

## 🏢 Physical Office Locations & Unified Contact Routing

AIA operates a **single primary telephone line** across all branches with intelligent language routing:

| Office | Address | Primary Phone | Languages Spoken |
| :--- | :--- | :--- | :--- |
| **Danbury Corporate HQ** | 50 Newtown Road, Suite 1, Danbury, CT 06810 | (203) 748-9272 | English, Spanish, Portuguese, Turkish |
| **Watertown Branch** | 51 Depot St Ste 112, Watertown, CT 06795 | (203) 748-9272 | English, Spanish, Portuguese, Turkish |
| **Bridgeport Branch** | 2465 Main Street, Bridgeport, CT 06606 | (203) 748-9272 | English, Spanish, Portuguese, Turkish |

**Hours of Operation**: Monday – Friday: 8:30 AM – 5:00 PM EST  
**Unified Dispatch**: Calling `(203) 748-9272` connects policyholders and prospective clients directly with licensed Connecticut producers fluent in their preferred language, eliminating call transfers and departmental delays.

---

## 📄 License & Attribution

Associated Insurance Agency © 2016–Present. All rights reserved.  
Partner carrier trademarks (Safeco, Travelers, Progressive, The Hartford, etc.) belong to their respective corporate entities.
