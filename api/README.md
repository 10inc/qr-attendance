# Requirements
- npm and NodeJS (https://nodejs.org/en/download/)
- Mongodb (https://www.mongodb.com/try/download/community)

# Setup
- Configure jwt tokens and smtp settings at `./config.json`
- Secret is used for JWT tokens. Can be any string.
- For emails either:
  - Create a fake smtp service with https://mailtrap.io/ or https://ethereal.email
    - Set env vars: `MAILTRAP_USER`, `MAILTRAP_PASS`
  - or use a Google account with less secure apps enables
    - Set env vars: `GOOGLE_SMTP_USER`, `GOOGLE_SMTP_PASS`

# Run the app
- npm ci
- npm run dev

# Tech Debt
- separate routes
- separate schemas
- general service for CRUD