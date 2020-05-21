<p>
   <a href="https://gitlab.com/feuertiger/feuertiger/-/commits/dev">
        <img alt="pipeline status" src="https://gitlab.com/feuertiger/feuertiger/badges/dev/pipeline.svg" />
    </a>
    <a href="https://gitlab.com/feuertiger/feuertiger/-/commits/dev">
        <img alt="coverage report" src="https://gitlab.com/feuertiger/feuertiger/badges/dev/coverage.svg" />
    </a>
   <a href="https://gitpod.io/#https://gitlab.com/feuertiger/feuertiger">
        <img alt="Gitpod" src="https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod">
   </a>
</p>

# Feuertiger

Feuertiger is an open source project to create a state-of-the-art platform for managing volunteer firefighting departments.

The main benefits of using Feuertiger should be:

-   Easy adaption of real world paper forms into the digital world and vice versa using OCR and PDF export
-   Easy import and export functionality to existing solutions
-   Easy and cheap hosting through straight forward infrastructure as code

---

## How to start

You can start coding simply using the Gitpod integration.

1. Install Gitpod [chrome extension](https://chrome.google.com/webstore/detail/gitpod-online-ide/dodmmooeoklaejobgleioelladacbeki).
2. Open Gitpod on Gitlab for your feature branch.
3. To be able to run the Firebase service you need to set some secret environment variables.<br/>
   You can also get these secrets by creating your own [Firebase](https://firebase.google.com/) project

    ```
    gp env FIREBASE_SECRETS_TYPE=**********
    gp env FIREBASE_SECRETS_PROJECT_ID=**********
    gp env FIREBASE_SECRETS_PRIVATE_KEY_ID=**********
    gp env FIREBASE_SECRETS_PRIVATE_KEY=**********
    gp env FIREBASE_SECRETS_CLIENT_EMAIL=**********
    gp env FIREBASE_SECRETS_CLIENT_ID=**********
    gp env FIREBASE_SECRETS_AUTH_URI="https://accounts.google.com/o/oauth2/auth"
    gp env FIREBASE_SECRETS_TOKEN_URI="https://oauth2.googleapis.com/token"
    gp env FIREBASE_SECRETS_AUTH_PROVIDER_X509_CERT_URL="https://www.googleapis.com/oauth2/v1/certs"
    gp env FIREBASE_SECRETS_CLIENT_X509_CERT_URL=**********
    gp env FIREBASE_SECRETS_APP_APIKEY=**********
    gp env FIREBASE_SECRETS_APP_AUTHDOMAIN=**********
    gp env FIREBASE_SECRETS_APP_DATABASEURL=**********
    gp env FIREBASE_SECRETS_APP_STORAGEBUCKET=**********
    gp env FIREBASE_SECRETS_APP_MESSAGINGSENDERID=**********
    gp env FIREBASE_SECRETS_APP_APPID=**********
    ```

4. Run services in dev mode
    ```
    yarn dev
    ```
5. Start coding

6. Login as Testuser
    ```
    User: feuertiger@feuertiger.com
    Password: feuertiger
    ```

---

## Architecture

Feuertiger is build with a nodejs backend and a react webapp.
With this the howl application can run on any kind of serverless cloud functions, e.g. firebase-functions.
Thous making it extremely cheap to operate.

The git repo is set up as a mono-repository using Lerna and Gitlab npm package registry.

### Services

| Name       | Description         | URL                             |
| ---------- | ------------------- | ------------------------------- |
| graphql    | graphql backend     | https://localhost:4000/graphiql |
| web-client | webclient server    | https://localhost:3000/         |
| storybook  | view web-components | https://localhost:6006/         |

### Packages

| Name           | Description                                   |
| -------------- | --------------------------------------------- |
| orc            | ocr tooling                                   |
| schema-graphql | backend api definiton source of truth         |
| schema-prisma  | persited data definiton source of truth       |
| web-components | component and page library used by web-client |

---

## Tech-stack

### Languages

-   [Typescript](https://www.typescriptlang.org/docs/home)

### Infrastructure

#### Database

-   [Postgre](https://www.postgresql.org/)

#### Services

-   [Firebase Auth](https://firebase.google.com/)
-   [Firebase Functions](https://firebase.google.com/)
-   Google Vision AI

### Backend

#### Data Access

-   [Prisma](https://www.prisma.io/docs/)

#### API

-   [Nodejs](https://nodejs.org/en/docs/)
-   [Graphql](https://graphql.org/learn/)
-   [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

### Web-Frontend

#### Webclient Framework

-   [Nextjs](https://nextjs.org/)

#### Webclient Rendering

-   [React](https://reactjs.org/docs/getting-started.html)

#### CSS Rendering

-   [Styled-Components](https://styled-components.com/docs)

#### UI-Library

-   [Material-UI](https://material-ui.com/)

#### API-Client

-   [Apollo client](https://www.apollographql.com/docs/react/)
