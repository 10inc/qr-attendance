# qr-attendance
https://10inc.atlassian.net/jira/software/projects/QRA/boards/1

# Setup
- Check READMEs of each folder

# Deploy to Heroku
- We're using a subdir build pack: https://github.com/timanovsky/subdir-heroku-buildpack
- Set `PROJECT_PATH` to folder name of the app you're deploying
  - BE :: `PROJECT_PATH=api`
  - FE :: `PROJECT_PATH=ui`
- We have git remotes for Heroku deployments `git remote -v`:
  - BE :: `git push heroku-be main`
  - FE :: `git push heroku-fe main`
- Heroku links
  - BE :: https://qr-be.herokuapp.com/
  - FE :: https://qr-fe.herokuapp.com/