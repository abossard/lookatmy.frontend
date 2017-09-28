# Introduction 
The magic behind the mysterious lookatmy.xyz project.

# Getting Started
`yarn install`
`yarn build`
`yarn start`

or just build the docker container and run it

# add a .env file
```
HTML_TITLE=lookatmy.xyz
NODE_ENV=development
PORT=3001
HOST=0.0.0.0
SESSION_SECRET=<secret>
FACEBOOK_CALLBACK_URL=http://localhost:3001/auth/facebook/callback
FACEBOOK_APP_ID=<secret>
FACEBOOK_APP_SECRET=<secret>
```