# qr-attendance
https://10inc.atlassian.net/jira/software/projects/QRA/boards/1

# Requirements
- Node > 14

# Setup
- Check READMEs of each folder

# Deploy to Heroku
- We're using a subdir build pack: https://github.com/timanovsky/subdir-heroku-buildpack
- Set `PROJECT_PATH` to folder name of the app you're deploying
  - Backend: `PROJECT_PATH=api`
  - Frontend: `PROJECT_PATH=ui`
- Add Heroku remotes:
  - `git remote add heroku-be https://git.heroku.com/qr-be.git`
  - `git remote add heroku-fe https://git.heroku.com/qr-fe.git`
- Confirm `git remote -v` and push changes:
  - `git push heroku-be main`
  - `git push heroku-fe main`
- Heroku links
  - https://qr-be.herokuapp.com/
  - https://qr-fe.herokuapp.com/

# Tech used
User Management with JWT (JSON Web Tokens)
- jsonwebtoken: https://www.npmjs.com/package/jsonwebtoken

QR Code Generation
- QRCode: https://www.npmjs.com/package/qrcode

Certificate Generation
- PDFKit: https://pdfkit.org/

Mailer Agent
- NodeMailer: https://nodemailer.com/

Web Components
- MaterialUI v5: https://mui.com/

Notification Toasts
- notistack: https://iamhosseindhv.com/notistack

Database
- MongoDB: https://www.mongodb.com/try/download/community
- Mongoose: https://mongoosejs.com/

Mobile Development with ReactNative
- ReactNative (v17.0.2): https://reactnative.dev/
- ReactNative Camera: https://www.npmjs.com/package/react-native-camera
- ReactNative QR Code Scanner: https://www.npmjs.com/package/react-native-qrcode-scanner

Hosting with Heroku
- Heroku: https://heroku.com
- Subdir Buildpack: https://github.com/timanovsky/subdir-heroku-buildpack