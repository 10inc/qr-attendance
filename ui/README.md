# Requirements
- npm and NodeJS (https://nodejs.org/en/download/)

# Setup
- `npm ci`
- `npm run dev`

# Connect to backend api
- In `./src/index.jsx`, comment out line 12-13
- Uncomment this to use the front-end with mocked (localStorage) data

# Tech Debt
- Services general CRUD

# TODO
- Add moment for Event dates (empty value when updating)
- Send QR Code to Student's email

# Deploy to Heroku
- We're using a subdir build pack: https://github.com/timanovsky/subdir-heroku-buildpack
- Set `PROJECT_PATH` to folder name of the app you're deploying eg. `ui`
- Then deploy with:
  - `npm run build`
  - `git push heroku main`