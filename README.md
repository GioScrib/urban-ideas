# UrbanIdeas

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.17.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Autenticazione con GoRest

L'applicazione utilizza il token Bearer di [GoRest](https://gorest.co.in/) per autenticare le richieste HTTP verso le REST API.
Per avviare una sessione valida:

1. Apri il browser e visita la pagina di login consumer di GoRest: <https://gorest.co.in/consumer/login>.
2. Esegui l'accesso o la registrazione, quindi genera un token personale dalla dashboard.
3. Copia il token Bearer visualizzato (la stringa lunga che inizia con `ey...`).
4. Avvia l'app Angular (`ng serve`) e apri `http://localhost:4200`.
5. Incolla il token nell'apposito campo della schermata di login e premi **Accedi**.

Il token viene salvato in `localStorage` come `auth_token` e viene automaticamente allegato all'header `Authorization` (`Bearer <token>`) di tutte le chiamate HTTP tramite l'interceptor `AuthInterceptor`. Quando il token scade o viene revocato, eliminalo dal `localStorage` e ripeti la procedura per generarne uno nuovo.
