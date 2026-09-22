# MarketPulse API 📊

A crowdsourced local market price index for Nigerian markets — garri, rice, tomatoes, fuel, and more. MarketPulse tracks real, on-the-ground prices reported by everyday people across different markets and cities, computes live price trends, and exposes it all through a public, documented REST API.

**🔗 Live API:** https://marketpulse-api-6t20.onrender.com
**📘 Interactive Docs (Swagger):** https://marketpulse-api-6t20.onrender.com/api/v1/docs
**🖥️ Frontend repo:** [marketpulse-web](https://github.com/hadihassan4peace-wq/marketpulse-web)

<!-- Add a screenshot of your Swagger docs page here -->
<!-- ![Swagger docs screenshot](./docs/screenshot-swagger.png) -->

---

## Why this project

Most beginner backend portfolios are to-do apps or blog clones. MarketPulse instead models a real problem: in Nigeria (and much of the world), there's no public, structured source of truth for what commodities actually cost from market to market. Traders, researchers, journalists, and households mostly rely on word of mouth. This project builds the data infrastructure to change that — a small but genuine open-data product, inspired by how real price indices work.

## Features

- **Crowdsourced price reporting** — authenticated users submit real prices for commodities at specific markets
- **Live aggregation** — average, min, max price and report count per commodity, computed on demand from raw data
- **Full auth system** — registration, login, bcrypt password hashing, JWT-based sessions, role-based access control (contributor vs admin)
- **Admin-gated writes** — only admins can add new markets/commodities; anyone can read
- **Robust validation** — Zod schemas reject malformed input with clear, field-level error messages
- **Interactive API docs** — full Swagger/OpenAPI documentation, testable directly in the browser
- **Automated tests** — Jest + Supertest covering core auth and validation flows

## Tech stack

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Framework | Express.js |
| Database | PostgreSQL (hosted on [Neon](https://neon.com)) |
| ORM | Prisma |
| Auth | JWT + bcrypt |
| Validation | Zod |
| Docs | Swagger (OpenAPI 3.0) |
| Testing | Jest + Supertest |
| Deployment | Render |

## API overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/v1/auth/register` | — | Register a new user |
| POST | `/api/v1/auth/login` | — | Log in, receive a JWT |
| GET | `/api/v1/auth/me` | Required | Get the current logged-in user |
| GET | `/api/v1/markets` | — | List all markets |
| POST | `/api/v1/markets` | Admin | Create a new market |
| GET | `/api/v1/commodities` | — | List all commodities |
| POST | `/api/v1/commodities` | Admin | Create a new commodity |
| GET | `/api/v1/price-reports` | — | List price reports (filterable by market/commodity) |
| POST | `/api/v1/price-reports` | Required | Submit a new price report |
| GET | `/api/v1/price-reports/stats` | — | Aggregated price statistics per commodity |

Full request/response schemas are available in the [interactive docs](https://marketpulse-api-6t20.onrender.com/api/v1/docs).

## Data model

```
User ─┬─< PriceReport >─┬─ Market
      │                 │
      └── (role: CONTRIBUTOR | ADMIN)
                         │
                    Commodity
```

- A `User` can submit many `PriceReport`s
- Each `PriceReport` belongs to one `Market` and one `Commodity`
- Foreign key constraints enforce data integrity at the database level

## Running locally

```bash
git clone https://github.com/hadihassan4peace-wq/marketpulse-api.git
cd marketpulse-api
npm install
cp .env.example .env
# fill in DATABASE_URL and JWT_SECRET in .env
npx prisma generate
npx prisma migrate dev
npm run dev
```

Server runs at `http://localhost:5000`. Health check: `GET /health`.

### Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret used to sign JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`) |
| `PORT` | Port to run the server on |

### Running tests

```bash
npm test
```

## Project structure

```
src/
  app.ts              # Express app, middleware, route mounting
  server.ts           # Entry point
  config/             # Prisma client, Swagger config
  routes/              # Route definitions
  controllers/         # Request handlers / business logic
  middleware/          # Auth guards, validation, error handling
  utils/               # Password hashing, JWT generation, validation schemas
prisma/
  schema.prisma        # Database schema
  migrations/           # Migration history
```

## What I learned building this

This was my first full backend project, built from scratch through to a live production deployment. Along the way I worked through real issues that don't show up in tutorials: a Prisma connection-pooling bug causing intermittent 500s in production, tooling version mismatches (Node 24 vs older ts-node, TypeScript 7 vs stable Jest/Prisma tooling), and getting a production database and CI environment configured correctly end to end.

---

Built by Hassan Hadi · [Frontend repo](https://github.com/hadihassan4peace-wq/marketpulse-web)
