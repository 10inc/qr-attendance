# Requirements
- npm and NodeJS (https://nodejs.org/en/download/)
- Mongodb (https://www.mongodb.com/try/download/community)

# Setup
- Configure jwt tokens and smtp settings at `./config.json`
- Secret is used for JWT tokens. Can be any string.
- Create a fake smtp service with https://mailtrap.io/ or https://ethereal.email

# Run the app
- npm ci
- npm run start:dev

# Tech Debt
- separate routes
- separate schemas
- general service for CRUD