<!-- Improved compatibility of back to top link -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="docs/images/nestjs.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Help Center Boilerplate</h3>

  <p align="center">
    An awesome backend boilerplate to jump start your project!
    <br />
    <br />
    <a href="https://hc-boilerplate-backend.ecomm-stg.cencosud.com/api">View Demo</a>
    ·
    <a href="https://gitlab.com/cencosud-ds/cencommerce/post-purchase-experience/self-service/cda/boilerplates/hc-boilerplate-backend/-/issues">Report Bug</a>
    ·
    <a href="https://gitlab.com/cencosud-ds/cencommerce/post-purchase-experience/self-service/cda/boilerplates/hc-boilerplate-backend/-/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#local-start">Local Start</a></li>
        <li><a href="#docker-start">Docker Start</a></li>
        <li><a href="#openapi">OpenAPI</a></li>
        <li><a href="#jest-testing">Jest Testing</a></li>
        <li><a href="#logger">Logger</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#section">Section</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Name Screen Shot][project-screenshot]

Help Center base project for new APIs.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![NestJS][NestJS]][NestJS-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![Node.js][Node.js]][Node.js-url]
[![NPM][NPM]][NPM-url]
[![Docker][Docker]][Docker-url]
[![Jest][Jest]][Jest-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The first thing to do is to fork this project.
1. Fork the Project
2. Name project using this format `hc-api-[PROJECTNAME]` or `hc-adapter-[PROJECTNAME]`
3. Select destination folder. Depending of the project type:
    * **IMPORTANT: FOLDERS ARE BEING RESTRUCTURED SO CONFIRM DESTINATION_**
    * APIs: `cencosud-ds/cencommerce/post-purchase-experience/self-service/cda/apis`
    * ADAPTERS: `cencosud-ds/cencommerce/post-purchase-experience/self-service/cda/apis/adapters`
4. Add project description
5. Click `Fork Project` button

![Demo Fork][demo-fork]


### Prerequisites

We need to create some ENV variables to Gitlab Project Settings

**_IMPORTANT: This requires extra permission on the repo or group so maybe you will need to ask someone to do this for you._**

1. Create a new API-KEY for your project then save it for later steps
   ```sh
   $ openssl rand -hex 12
   [NEW_SUPER_SECRET_KEY]
   ```

2. Create project specific ENVs
    ```sh
    # CORE ENVS
    APP_DESC='This is a boilerplate. You can find out more about it [README.md](${APP_REPO_URL}/README.md). For this sample, you can use the api key `special-key` to test the authorization filters.'
    APP_VERSION='1.0.0'
    # APP_DEBUG='true' # ONLY IF NEEDED

    # AUTH ENVS
    APP_API_KEY='[NEW_SUPER_SECRET_KEY]'

    # DATABASE ENVS
    DB_HOST='localhost'
    DB_PORT='5432'
    DB_USERNAME='boilerplate'
    DB_PASSWORD='[DATABASE_PASSWORD]'
    DB_NAME='boilerplate'
    # DB_LOG='true' # ONLY IF NEEDED

    # EXTERNALS ENVS
    POKEAPI_BASE_URL='https://pokeapi.co/api/v2/' # EXAMPLE FOR BOILER ONLY
    POKEAPI_POKEMON_ENDPOINT='pokemon' # EXAMPLE FOR BOILER ONLY
    ```

3. Check if you need to override any of the shared ENVs of the "Help Center Group".

    Some of the needed ENVs are shared across all projects so we define them inside of the Gitlab Help Center CI/CD Settings. Currently there are 5 levels of inheritance:
    - Cencosud
    - Cencommerce
    - Post Purchase Experience
    - Self Service
    - Help Center

    This ENVs contains for example AWS configs, K8S configs, NewRelic configs, etc.
    
    So if for example you need to override the `APP_DEBUG` you need to add it to your project Gitlab CI/CD Settings

    ![Environments Override][envs-override]

4. You need to have the following software/tools:
    - Visual Studio Code (Not mandatory but recommended, the project includes some configs for this IDE)
    - Node.js 18.13.0 (Check [Nodeenv](https://github.com/nodenv/nodenv) for multiple node versions)
    - NPM 8.19.3
    - Docker


### Installation

1. Clone the repo
   ```sh
   $ git clone git@gitlab.com:cencosud-ds/cencommerce/post-purchase-experience/self-service/cda/boilerplates/hc-boilerplate-backend.git
   ```
2. Check current Node version
   ```sh
   $ node -v
   v18.13.0
   ```
3. Check HC_LIB_FLAGS configuration [README](https://gitlab.com/cencosud-ds/cencommerce/post-purchase-experience/self-service/cda/libs/cenco-selfservice-cda-flags/-/blob/master/README.md)
   ```sh
   $ echo $HC_LIB_FLAGS_TOKEN
   [SHOULD PRINT LIB TOKEN]
   ```
4. Create a new `.env` file then modify values accordingly (check file comments)
   ```sh
   cp .env.example .env
   ```
   ![Create ENV File][install-env]

3. Install NPM packages
   ```sh
   $ npm install

   added 1052 packages, and audited 1053 packages in 26s
   
   found 0 vulnerabilities
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This space to show useful examples of how the project can be used. Additional screenshots, code examples and demos.

General Team Guidelines:
 * You need a module for every `"functionality"` inside of `modules` folder
    * Inside goes dtos, entities, test, etc..
    * _To better create modules/resources check [NestJS CLI](https://docs.nestjs.com/cli/overview)_
 * External integrations goes on the `services` folder
 * Use the `HelpCenterLogger` methods to log with the standard format
 * Everything you add needs testing!
 * Always use `types` instead of `interfaces` _For more info, please refer to the [Documentation](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)_
 * Please check the `OpenAPI` decorators for controllers, dtos, etc. 
 * Keep packages updated and check for critical vulnerabilities
 * Check Gitlab CI MR's reports for code quality, dast, sast, etc issues
    * Example of a bad MR:
    * ![Gitlab Report][usage-report]

This project also uses `pre-commit` and `pre-push` hooks to verify the code we write. The steps are:

```json
"pre-commit": [
    "format", // Checks if code matches prettier's configured style
    "lint", // Checks eslint configured rules
    "spell", // Spell checker using cspell 
    "compile" // Runs typescript compiler
  ],
  "pre-push": [
    "build", // Runs nestjs build
    "test:cov", // Runs jest test coverage
    "audit" // Checks for critical packages vulnerabilities
  ]
```

_Note: All pre commit steps can be run with `$ npm run validate` and also every individual step can be run separately (Check [package.json](package.json) for details)_


### Local Start

This is the standard way to use the app with the debugger 

```sh
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

```sh
$ npm run start:dev
[Nest] 19046  - 02/22/2023, 11:50:51 AM     LOG [NestFactory] Starting Nest application...
...
[Nest] 19046  - 02/22/2023, 11:50:51 AM     LOG [NestApplication] Nest application successfully started
```

### Docker Start

Using this type of start allows you to create an entire app stack (api + database) so you can develop directly without depending on a staging database or installing a database on your local machine.

_Note: The database include the use of a data volume so in case you delete de db container the database data will persist_

For this to work we use [`docker compose`](https://docs.docker.com/compose/compose-file/) check the following file [`docker-compose.yml`](docker-compose.yml) this file uses [`Dockerfile_local`](Dockerfile_local)

_Note: In this boiler we use an postgres database, but you can choose any database docker image you want._

Commands:
```sh
# Start/Create app stack
$ npm run docker:start

# Stops all app stack
$ npm run docker:stop

# Delete app stack
$ npm run docker:down

# Delete app stack with volumes
$ npm run docker:down:complete
```

```sh
$ npm run docker:start

[+] Running 2/2
 ⠿ Container hc-boilerplate-backend-db   Started
 ⠿ Container hc-boilerplate-backend-app  Started

$ docker logs hc-boilerplate-backend-app

[Nest] 29  - 02/22/2023, 5:53:13 PM     LOG [NestFactory] Starting Nest application...
...
[Nest] 29  - 02/22/2023, 5:53:13 PM     LOG [NestApplication] Nest application successfully started

```

Some of the features:
  - The docker watches for files changes so it restart the app like when you use `npm run start:dev`
  - To connect the debugger you need to use `lunch: Docker: Attach to Node`
  - ![Docker Debug][usage-docker-debug]


### Database

As explained this boilerplate when used with `docker compose` or manually configured uses a database.

Commands:
```sh
# !WARNING! Drops the database schema and recreates it
$ npm run db:create

# updates schema based on entities
$ npm run db:update

# !WARNING! Drops all tables
$ npm run db:drop

# seed the database with the default database seeder
$ npm run db:seed
```

### Endpoints Examples

* Health
  
  _Note: jq is a CLI JSON processor. [More info ./jq](https://stedolan.github.io/jq/)_
  
  ```sh
  curl -s --request GET \
    'https://hc-boilerplate-backend.ecomm-stg.cencosud.com/health' | jq
  {
    "status": "Running",
    "uptime": "22989 seconds",
    "dateTime": "Wed Feb 22 2023 00:28:03 GMT+0000 (Coordinated Universal Time)"
  }
  ```

* Pokemons

  This set of endpoints are an example of a module using an external service as its source of data. In this example "our" `pokemons/` retrieves data from [`PokeAPI`](https://pokeapi.co/)

  _Note: xh is a friendly and fast tool for sending HTTP requests. [More info xh](https://github.com/ducaale/xh)_

  ```sh
  xh -b https://hc-boilerplate-backend.ecomm-stg.cencosud.com/pokemons api-key:special-key flag:paris
  {
    "count": 1279,
    "next": "https://hc-boilerplate-backend.ecomm-stg.cencosud.com/pokemons?offset=20&limit=20",
    "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        ...
    ]
  }
  ```
* Notes

  This set of endpoints are an example of a simple CRUD using the database to store and retrieve notes.

  _Note: this example only works locally because needs a database._

  _Note: xh is a friendly and fast tool for sending HTTP requests. [More info xh](https://github.com/ducaale/xh)_

  ```sh
  xh -b localhost:5000/notes api-key:special-key flag:paris
  {
      "count": 1,
      "results": [
          {
              "id": 1,
              "createdAt": "2023-02-22T21:16:06.000Z",
              "updatedAt": "2023-02-22T21:16:06.000Z",
              "title": "Hello World",
              "content": "Some very long content"
          }
      ]
  }
  ```


### OpenAPI
The project has a Swagger UI for complete test of the endpoints. [Swagger UI](https://hc-boilerplate-backend.ecomm-stg.cencosud.com/api)

![Swagger Usage][usage-swagger]


### Jest Testing

  ```sh
  # unit tests
  $ npm run test

  > hc-boilerplate-backend@1.0.0 test
  > jest --verbose

  PASS  src/modules/pokemons/tests/pokemons.controller.spec.ts
    PokemonsController
      ✓ should be defined (15 ms)

  PASS  src/modules/pokemons/tests/pokemons.service.spec.ts
    PokemonsService
      ✓ should be defined (12 ms)
      listPokemons
        ✓ should obtain pokemons list (3 ms)
      findOne
        ✓ should obtain one pokemon (2 ms)
        ✓ should throw error (7 ms)

  PASS  src/core/health/tests/health.controller.spec.ts
    HealthController
      ✓ should be defined (52 ms)
      ✓ should status return data (4 ms)

  PASS  src/modules/notes/tests/notes.service.spec.ts
    NotesService
      ✓ should be defined (10 ms)
      ✓ should be defined (2 ms)
      listNotes
        ✓ should obtain notes list (2 ms)
      findOne
        ✓ should obtain one note (2 ms)
      create
        ✓ should create one note (2 ms)
      update
        ✓ should update one note (1 ms)
      remove
        ✓ should remove one note (1 ms)
    NotesService No Data
      ✓ should be defined (2 ms)
      ✓ should be defined (2 ms)
      findOne
        ✓ should throw error (3 ms)
      update
        ✓ should throw error (2 ms)
      remove
        ✓ should throw error (1 ms)

  PASS  src/modules/notes/tests/notes.controller.spec.ts
    NotesController
      ✓ should be defined (10 ms)

  Test Suites: 5 passed, 5 total
  Tests:       20 passed, 20 total
  Snapshots:   0 total
  Time:        4.574 s, estimated 5 s
  Ran all test suites.
  ```

```sh
# coverage tests
$ npm run test:cov

> hc-boilerplate-backend@1.0.0 test:cov
> jest --coverage

 PASS  src/modules/pokemons/tests/pokemons.controller.spec.ts
 PASS  src/core/health/tests/health.controller.spec.ts
 PASS  src/modules/pokemons/tests/pokemons.service.spec.ts
 PASS  src/modules/notes/tests/notes.controller.spec.ts
 PASS  src/modules/notes/tests/notes.service.spec.ts
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------|---------|----------|---------|---------|-------------------
All files             |     100 |      100 |     100 |     100 |
 notes                |     100 |      100 |     100 |     100 |
  notes.service.ts    |     100 |      100 |     100 |     100 |
 pokemons             |     100 |      100 |     100 |     100 |
  pokemons.service.ts |     100 |      100 |     100 |     100 |
----------------------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 100% ( 69/69 )
Branches     : 100% ( 3/3 )
Functions    : 100% ( 12/12 )
Lines        : 100% ( 61/61 )
================================================================================

Test Suites: 5 passed, 5 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        6.834 s
Ran all test suites.
```


### Logger

This project contains a new logger called `HelpCenterLogger` that extends its functionality from the standard `ConsoleLogger`.

With this we have all the functionality of the normal logger plus a couple of methods that logs with some of the required template to show more data on New Relic

How to use it? ([_Check file `hc.logger.ts` for more info_](src/common/loggers/hc.logger.ts))

* Just as the normal logger you need to add it to the top of your service class.
  ```typescript
  export class NotesService {
    private readonly logger: HelpCenterLogger = new HelpCenterLogger(NotesService.name);
    ...
    this.logger.log('This is a log') // Normal log
    this.logger.hcInfo('TRACE-ID', 'This is a log') // New method
    ...
  }
  ```
* Then you need to call one of the available methods (by log level)
  ```typescript
  this.logger.hcDebug(headers.traceId, 'trying to get all notes', 'findAll', { headers, params: { limit, offset } });
  ```

* The following logs are available
  ```typescript
  hcInfo(traceId: string, message: string, functionName?: string, parameters?: object)
  hcDebug(traceId: string, message: string, functionName?: string, parameters?: object)
  hcWarn(traceId: string, message: string, functionName?: string, parameters?: object)
  hcError(traceId: string, message: string, functionName?: string, parameters?: object)
  // hcAlert the same as hcError but prints [ALERT] on the message so it may trigger an New Relic alert if configured
  hcAlert(traceId: string, message: string, functionName?: string, parameters?: object)
  ```

### New Envs

In case your project needs to add or modify env variables please modify [`.env.example`](.env.example) file:

```bash
NEW_VARIABLE=${NEW_VARIABLE}
```

Then check the [`app-envs.type.ts`](src/config/types/app-envs.type.ts) and [`app.config.ts`](src/config/app.config.ts) and add your new variable.


```typescript
export const appEnvs = (): AppEnvs => {
  return {
    nodeEnv: process.env['NODE_ENV'],
    name: process.env['APP_NAME'],
    repoUrl: process.env['APP_REPO_URL'],
    port: process.env['APP_PORT'] ? Number.parseInt(process.env['APP_PORT'], 10) : 0,
    version: process.env['APP_VERSION'],
    description: process.env['APP_DESC'],
    debug: process.env['APP_DEBUG'] === 'true',
    newVariable: process.env['NEW_VARIABLE'],
    ...
  };
};
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[project-screenshot]: docs/images/project-screenshot.png
[demo-fork]: docs/images/demo-fork.gif
[envs-override]: docs/images/envs-override.png
[install-env]: docs/images/install-env.png
[usage-report]: docs/images/usage-report.png
[usage-swagger]: docs/images/usage-swagger.png
[usage-docker-debug]: docs/images/usage-docker-debug.png

[NestJS]: https://img.shields.io/badge/nestjs-000000?style=for-the-badge&logo=nestjs&logoColor=E0234E
[NestJS-url]: https://nestjs.com/
[TypeScript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=FFF
[TypeScript-url]: https://www.typescriptlang.org/
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=FFF
[Node.js-url]: https://nodejs.org/
[NPM]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=FFF
[NPM-url]: https://www.npmjs.com/
[Docker]: https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=FFF
[Docker-url]: https://www.docker.com/
[Jest]: https://img.shields.io/badge/jest-FFF?style=for-the-badge&logo=jest&logoColor=C21325
[Jest-url]: https://jestjs.io/