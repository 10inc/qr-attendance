# Requirements
- NodeJS > 16 (https://nodejs.org/en/download/)
- Mongodb (https://www.mongodb.com/try/download/community)

# Setup
- Configure jwt tokens and smtp settings at `./config.json`
- Secret is used for JWT tokens. Can be any string.
- Set an SMTP agent in `.env`:
  - MailTrap
    ```
      SMTP_CLIENT="mailtrap"
      SMTP_USER="<INSERT YOUR CREDENTIALS>"
      SMTP_PASS="<INSERT YOUR CREDENTIALS>"
    ```
  - Google Mail (personal email that accepts less secure apps)
    ```
      SMTP_CLIENT="gmail"
      SMTP_USER="<INSERT GOOGLE EMAIL>"
      SMTP_PASS="<INSERT GOOGLE PASSWORD>"
    ```

# Run the app
- npm ci
- npm run dev

# Tech Debt
- separate routes
- separate schemas
- general service for CRUD