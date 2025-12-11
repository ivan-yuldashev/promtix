# Promtix

**The AI Infrastructure Layer for Engineering Teams.**

## 🛸 What is Promtix?

Promtix is a self-hosted AI Gateway and Prompt Management System designed for privacy-conscious teams. It sits between your product code and LLM providers (OpenAI, Anthropic, etc.).

Unlike SaaS-only loggers, **Promtix** is designed to be deployed on your own infrastructure (VPS/Coolify), ensuring your data and your users' PII never leave your control.

## 🛠 Features (Roadmap)

- [ ] **Prompt CMS:** Git-like versioning for prompts with rollback support.
- [ ] **Remote Execution API:** Unified streaming interface for OpenAI/Anthropic.
- [ ] **Shadow Testing Engine:** Traffic splitting and silent evaluation.
- [ ] **Async Analytics:** Cost & Latency tracking via BullMQ workers.
- [ ] **Semantic Caching:** `pgvector` integration for similarity search.

---

## 💬 Community & Support

We are building Promtix for the community, but we also run it in production. Here is how you can get help:

- **🐛 Bug Reports:** Found a bug? Please [open an issue](https://github.com/ivan-yuldashev/promtix/issues).
- **💡 Feature Requests:** Have an idea? Start a [discussion](https://github.com/ivan-yuldashev/promtix/discussions).
- **❓ General Help:** stuck on setup? Ask in [GitHub Discussions](https://github.com/ivan-yuldashev/promtix/discussions).
- **💼 Commercial Support:** Need a managed version, SLA, or custom integration? Email us at `geekk@ya.ru`.

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## ❤️ Sponsors

Promtix is an open-source project maintained by Ivan Yuldashev.
If this tool saves you time or money in production, consider sponsoring the development to ensure its longevity.

### Why sponsor?

- **Prioritized Issues:** Sponsors get priority attention on bug reports.
- **Badge:** Show your support on your GitHub profile.
- **Sustainable Open Source:** Help cover infrastructure costs (hosting, domains, test runners).

_Corporate sponsorships with logo placement are available. Contact us for details._

### License

This project is licensed under the **GNU AGPL v3**.

- **You can** use this locally or internally in your company for free.
- **You can** modify the code.
- **If you provide this as a service (SaaS)** to others over a network, you must open-source your modifications.

See [LICENSE](./LICENSE) for more details.
