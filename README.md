# task-herald

Vue Based Front end interface to create, update and delete your daily tasks.

## Pre-requisities
- GIT
- Yarn
- Compatible Browser (Chrome, Mozilla, Safari)

## Project setup

First, clone this repository into your intended destination. CD into your newly cloned directory and run the following command to install the dependencies of this project. 
```
yarn install
```

Create a .env.local or update the existing .env file in the root of the project to contain the following properties:
Note: The section below is an example of the contents of the .env file.
```
VUE_APP_APP_NAME=Task Herald
VUE_APP_API_BASE_URL=<task_manager_url>

VUE_APP_CSP_DEFAULT_SRC="'self'"
VUE_APP_CSP_MEDIA_SRC="'self' https://minglesports.tech/assets/"
VUE_APP_CSP_IMG_SRC="'self' data: https:"
VUE_APP_CSP_STYLE_SRC="'unsafe-inline' 'self'"
VUE_APP_CSP_SCRIPT_SRC="'self' 'unsafe-eval'"
VUE_APP_CSP_FRAME_SRC=""
VUE_APP_CSP_CHILD_SRC=""
VUE_APP_CSP_CONNECT_URLS="http://localhost:8080 https://localhost:8080 http://localhost:3231 ws://localhost:8080// ws://localhost:3231/ http://www.w3.org/2000/svg"

```

### Compiles and hot-reloads for development
To start a local version of the task-herald web app, run the following command after changing directories into the root of the application.
```
yarn serve
```
This should bring up a new version of the front end.

### Compiles and minifies for production
To create a build for production deployment run the following command.
```
yarn build
```

### Run your unit tests
To run unit tests type the following command:
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
TO fix lint issues run the following command. Current config: ESLint and Prettier
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
