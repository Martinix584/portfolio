# Martín Porollan

<p align="left">
  <strong>Systems Engineering Student · Data, Analytics & Applied AI</strong><br>
  📍 Mendoza, Argentina &nbsp;|&nbsp; 🎓 UTN FRM (4th year) &nbsp;|&nbsp; 🌐 English C1 (TOEFL iBT)
</p>

<p align="left">
  <a href="https://martinporollan.vercel.app/">
    <img src="https://img.shields.io/badge/Portfolio-martinporollan.vercel.app-0070F3?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio" />
  </a>
  <a href="https://linkedin.com/in/martinporollan">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://github.com/Martinix584">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="mailto:mporollan@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
</p>

---

Fourth-year Systems Engineering student at UTN with almost 2 years digitizing the operations of a water bottling and distribution company. I work with **SQL and PostgreSQL**: data modeling, reporting views, ETL migrations and data-quality validation. I've brought **applied AI** into real processes — invoice extraction with Vision LLMs (Gemini) and natural-language database operations over **MCP** — always with validations and a human in the loop. Next goal: AI-powered analytics on **Google Cloud** (Looker, BigQuery, Vertex AI).

---

### Techs & frameworks

<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=postgres,supabase,python,fastapi,java,spring,ts,flutter,dart,kotlin,firebase,docker,linux,git,githubactions,vercel" alt="My Skills" />
  </a>
</p>

---

### Highlights

- **100% digital operation** — factory delivery notes moved from paper to an app: **4,300+** recorded (~700/month) across **44** distributors.
- **Zero-loss migration** — **5,220** values validated between Firebase and PostgreSQL with **0** mismatches.
- **Applied AI in production** — automatic invoice reading with Gemini and natural-language DB operations via MCP.
- **Quality & reliability** — bank reconciliation with human review of doubtful matches, payment deduplication and **184** automated tests.

---

### Experience

- **Operations & IT Automation Analyst** — *Water bottling & distribution company, Mendoza* `(11/2024 – Present)`
  - **Delivery-note ERP (Flutter)**: replaced paper delivery notes with offline entry, numbered receipt books, digital signature and Bluetooth thermal printing.
  - **Firebase → PostgreSQL migration (ETL)**: moved to Supabase/PostgreSQL for referential integrity and SQL reporting; daily-stats views, transactional FIFO payment allocation, RLS and auditing.
  - **Bank reconciliation (Java → Python)**: scoring engine matching 3 banks' statements and WhatsApp receipts (read with Gemini) against pending invoices by CUIT, amount, name and date; auto-posts only high-confidence matches and learns from each review. Rewritten in **FastAPI** with verifiable rules instead of an LLM classifier.
  - **Purchase invoices with a Vision LLM (Python)**: Gemini 2.5 Flash via a Telegram bot extracts 14 fields per invoice, validates CUIT, amounts and duplicates, and generates ARCA's digital VAT ledger import files. Used by two companies.
  - **E-invoicing (TypeScript)**: ARCA web services (WSAA, WSFEv1) in Supabase Edge Functions with certificate signing, token caching, sequential numbering and Vault-stored certificates.
  - **MCP server (Python, FastMCP)**: operators log collections and delivery notes from an AI chat. 23 tools, no free-form SQL — each calls a validating, audited DB function with the user's own OAuth token (RLS) and idempotent retries.
  - **Field service app (Flutter)**: mobile app to manage service visits, with Bluetooth integration.

---

### Featured Projects

| Project | Description | Stack |
| :--- | :--- | :--- |
| **Delivery-note ERP** | Paperless delivery notes: 4,300+ recorded, offline-first, BT thermal printing. | `Flutter`, `Supabase`, `PostgreSQL` |
| **Bank Reconciliation Engine** | Confidence-scored payment matching with human review and 184 tests. | `Python`, `FastAPI`, `Gemini` |
| **Vision LLM Invoicing** | Photo/PDF → validated JSON → ARCA VAT ledger files. | `Python`, `Gemini 2.5 Flash`, `Telegram` |
| **MCP Server** | Natural-language DB operations with 23 audited tools under RLS. | `Python`, `FastMCP`, `PostgreSQL` |
| **SportsApp** | Native Android app with its own backend: live scores for 5 sports over SSE, offline cache with Room. | `Kotlin`, `Jetpack Compose`, `Ktor`, `PostgreSQL` |

---

### Education & Languages

- 🎓 **Information Systems Engineering** — *Universidad Tecnológica Nacional (UTN FRM)* `(4th year, ongoing)`
- 📜 **English C1 · TOEFL iBT** — *Instituto Amicana* `(2015 – 2019)`
- 🗣️ Spanish (native) · English (C1)

---

### About this Interactive Portfolio

> 🌐 **Live Website**: [https://martinporollan.vercel.app/](https://martinporollan.vercel.app/)

This repository hosts my interactive web portfolio with an industrial factory theme, built with **Next.js 16**, **Tailwind CSS**, and **Framer Motion**:

- 🚪 **Interactive Plant Blueprint**: Visual schematic of 7 interactive sectors, each revealing project architecture and business impact.
- ⚙️ **Factory Simulator**: Mini puzzle game simulating production lines and logistics logic.
- 🧪 **R&D Lab & Toolbox**: Side projects and a skills toolbox, plus CV downloads in Spanish and English.
- 🚨 **Emergency Stop & Visit Counter**: Quick contact action panel and live visitor telemetry.

```bash
# Run locally
npm install
npm run dev     # http://localhost:3000
npm run build
```
