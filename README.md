# 🛸 Promtix

**The Open Source AI Gateway & Prompt Management System.**

Promtix is a self-hosted, privacy-first AI infrastructure layer designed for engineering teams. It sits between your product code and LLM providers (OpenAI, Anthropic, etc.), giving you full control over prompts, costs, and observability without sending data to third-party SaaS loggers.

> **Status:** 🚧 **Active Development (v1 Alpha)**. Not ready for production yet.

## 🏗 Architecture

Promtix allows you to manage prompts in a user-friendly UI while serving them through a high-performance, stateless proxy.

- **Control Plane (`apps/backend`):** Management API. Handles Users, Workspaces, Projects, and Prompt definitions.
- **Data Plane (`apps/proxy`):** High-performance Gateway. Handles auth via Opaque Keys, resolves prompt context, and streams responses from LLMs.
- **Admin Dashboard (apps/front):** Single Page Application (SPA). The UI for managing your workspaces, prompts, and viewing analytics.

> **Monorepo:** Organized using pnpm workspaces for efficient dependency management and code sharing.

### Data Model

We use a **Workspace-First** hierarchy to organize resources:
`Workspace (Billing/Team) -> Project (Isolation) -> Resources (Prompts, Keys, Environments)`

## ⚡ Tech Stack

- **Runtime:** Node.js / Docker
- **Framework:** Hono
- **Database:** PostgreSQL + Drizzle ORM
- **Caching:** Redis (Context & Config Caching)
- **Frontend:** React + Vite + TailwindCSS
- **Package Manager:** pnpm (Workspaces)

## 🛠 Features Roadmap

### Phase 1: Foundation (Current)

- [x] **Monorepo Setup:** Split-service architecture (Core + Proxy).
- [x] **IAM System:** Multi-tenancy support via Workspaces & Projects.
- [x] **Auth:** JWT for Admin UI, Opaque Scoped Keys for API Proxy.
- [ ] **Prompt CMS:** Versioned prompts with support for `prod/dev/stage` environments.
- [ ] **Universal Proxy:** OpenAI-compatible endpoint with context injection.

### Phase 2: Observability & Control

- [ ] **Request Logging:** Async logging to Postgres via Redis Queue.
- [ ] **Analytics:** Token usage, Cost tracking, and Latency aggregation per Project/Prompt.
- [ ] **Provider Management:** Encrypted storage for OpenAI/Anthropic API keys.

### Phase 3: Advanced (Future)

- [ ] **Shadow Testing:** Silent traffic splitting for prompt evaluation.
- [ ] **Semantic Caching:** `pgvector` integration to reduce LLM costs.
- [ ] **Experiments:** A/B testing for prompt variations.

---

## 🚀 Getting Started (Dev)

Promtix is designed to be deployed via Docker (Coolify / Portainer).

```bash
# Clone repository
git clone https://github.com/ivan-yuldashev/promtix.git
cd promtix

# Install dependencies
pnpm install

# Start infrastructure (Postgres + Redis)
docker-compose up -d postgres redis

# Run migrations
pnpm db:push

# Start development server
pnpm dev

```

---

## 💬 Community & Support

We are building Promtix for the community, but we also run it in production. Here is how you can get help:

- **🐛 Bug Reports:** Found a bug? Please [open an issue](https://github.com/ivan-yuldashev/promtix/issues).
- **💡 Feature Requests:** Have an idea? Start a [discussion](https://github.com/ivan-yuldashev/promtix/discussions).
- **❓ General Help:** Stuck on setup? Ask in [GitHub Discussions](https://github.com/ivan-yuldashev/promtix/discussions).
- **💼 Commercial Support:** Need a managed version, SLA, or custom integration? Email us at `geekk@ya.ru`.

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](https://www.google.com/search?q=CONTRIBUTING.md) for details.

## ❤️ Sponsors

Promtix is an open-source project maintained by Ivan Yuldashev.
If this tool saves you time or money in production, consider sponsoring the development to ensure its longevity.

### Why sponsor?

- **Prioritized Issues:** Sponsors get priority attention on bug reports.
- **Badge:** Show your support on your GitHub profile.
- **Sustainable Open Source:** Help cover infrastructure costs (hosting, domains, test runners).

_Corporate sponsorships with logo placement are available. Contact us for details._

## License

This project is licensed under the **GNU AGPL v3**.

- **You can** use this locally or internally in your company for free.
- **You can** modify the code.
- **If you provide this as a service (SaaS)** to others over a network, you must open-source your modifications.

See [LICENSE](https://www.google.com/search?q=./LICENSE) for more details.
