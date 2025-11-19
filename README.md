# UrbanIdeas

## 📋 Indice

- [Descrizione](#-descrizione)
- [Funzionalità dell'Applicazione](#-funzionalità-dellapplicazione)
- [Tecnologie e Librerie Utilizzate](#-tecnologie-e-librerie-utilizzate)
- [Prerequisiti](#-prerequisiti)
- [Installazione e Configurazione](#-installazione-e-configurazione)
- [Comandi Disponibili](#-comandi-disponibili)
- [Struttura del Progetto](#-struttura-del-progetto)
- [Autenticazione e API](#-autenticazione-e-api)
- [Build e Deployment](#-build-e-deployment)
- [Test](#-test)
- [Risoluzione Problemi](#-risoluzione-problemi)

---

## 🎯 Descrizione

**UrbanIdeas** è un'applicazione web moderna per la gestione e condivisione di idee sociali. Si tratta di una Single Page Application (SPA) sviluppata con **Angular 20** che utilizza le API pubbliche di GoRest per gestire utenti, post e commenti.

L'applicazione permette agli utenti di:
- Visualizzare e gestire profili utente
- Creare e visualizzare post
- Aggiungere commenti ai post
- Cercare e filtrare contenuti
- Navigare attraverso un'interfaccia Material Design intuitiva

---

## ⚡ Funzionalità dell'Applicazione

### 1. Sistema di Autenticazione

**Percorso**: `/login`

- **Login con Bearer Token**: L'applicazione utilizza l'autenticazione basata su token di GoRest
- **Protezione delle Route**: Tutte le route principali sono protette da un `AuthGuard`
- **Storage Persistente**: Il token viene salvato in `localStorage` per mantenere la sessione
- **Logout**: Funzionalità di logout che rimuove il token e reindirizza al login

**Come funziona**:
1. L'utente inserisce il Bearer Token ottenuto da GoRest
2. Il token viene validato tramite una chiamata API
3. Se valido, viene salvato e l'utente è reindirizzato alla lista utenti
4. Tutte le richieste HTTP successive includono automaticamente il token nell'header `Authorization`

**Implementazione Tecnica**:
- `AuthService` (src/app/core/services/auth.service.ts:1): Gestisce login, logout e verifica dello stato di autenticazione
- `AuthGuard` (src/app/core/guards/auth.guard.ts:1): Protegge le route da accessi non autorizzati
- `AuthInterceptor` (src/app/core/interceptors/auth.interceptor.ts:1): Inietta automaticamente il token in tutte le richieste HTTP

---

### 2. Gestione Utenti

**Percorso**: `/users`

#### Funzionalità:

**Visualizzazione Lista Utenti**:
- Vista a griglia con layout responsive (1-3 colonne configurabili)
- Paginazione personalizzata con dimensione pagina variabile (6, 12, 24 elementi)
- Visualizzazione del conteggio totale degli utenti

**Ricerca e Filtraggio**:
- Ricerca in tempo reale per nome e email
- Filtro istantaneo senza necessità di premere invio
- Indicatore visivo del numero di risultati trovati

**Creazione Nuovo Utente**:
- Dialog modale con form validato
- Campi richiesti:
  - Nome (minimo 3 caratteri)
  - Email (validazione formato email)
  - Genere (male/female)
  - Stato (active/inactive)
- Validazione in tempo reale con messaggi di errore
- Feedback immediato tramite snackbar

**Eliminazione Utente**:
- Dialog di conferma prima dell'eliminazione
- Messaggio di successo/errore dopo l'operazione
- Aggiornamento automatico della lista

**Visualizzazione Dettagli**:
- Click su una card utente per vedere i dettagli completi
- Navigazione alla pagina dedicata dell'utente

**Componenti Principali**:
- `UserListComponent` (src/app/pages/user-list/user-list.component.ts:1): Container principale
- `UserCardComponent` (src/app/components/user-list/user-card/user-card.component.ts:1): Card singolo utente
- `CreateUserDialogComponent` (src/app/components/user-list/create-user-dialog/create-user-dialog.component.ts:1): Form di creazione

---

### 3. Pagina Dettagli Utente

**Percorso**: `/users/:id`

#### Funzionalità:

**Informazioni Utente**:
- Card con tutti i dettagli dell'utente (nome, email, genere, stato)
- Badge colorati per genere e stato
- Layout responsive con Material Design

**Gestione Post dell'Utente**:
- Visualizzazione di tutti i post pubblicati dall'utente
- Griglia responsive con layout configurabile
- Paginazione dedicata per i post

**Interazione con i Post**:
- Click su un post per visualizzare i commenti
- Dialog modale con lista completa dei commenti
- Possibilità di aggiungere nuovi commenti

**Navigazione**:
- Pulsante "Indietro" per tornare alla lista utenti
- Breadcrumb visivo nella toolbar

**Componenti Principali**:
- `UserDetailsPageComponent` (src/app/pages/user-details-page/user-details-page.component.ts:1): Container principale
- `UserDetailsCardComponent` (src/app/components/user-details/user-details-card/user-details-card.component.ts:1): Card dettagli
- `PostCommentsDialogComponent` (src/app/components/user-details/post-comments-dialog/post-comments-dialog.component.ts:1): Dialog commenti

---

### 4. Gestione Post

**Percorso**: `/posts`

#### Funzionalità:

**Visualizzazione Lista Post**:
- Vista a griglia con post di tutti gli utenti
- Layout responsive con colonne adattive
- Conteggio totale dei post visualizzato nell'header
- Paginazione con dimensioni personalizzabili

**Ricerca Post**:
- Ricerca in tempo reale su titolo e corpo del post
- Risultati filtrati istantaneamente
- Indicatore del numero di post trovati

**Creazione Nuovo Post**:
- Dialog modale con form validato
- Campi richiesti:
  - Titolo (minimo 5 caratteri)
  - Corpo del testo (minimo 10 caratteri)
- Il post viene creato per l'utente autenticato
- Validazione in tempo reale
- Feedback con snackbar

**Visualizzazione Card Post**:
- Titolo e anteprima del contenuto
- Informazioni sull'autore con badge di stato
- Design uniforme con Material Design

**Componenti Principali**:
- `PostListComponent` (src/app/pages/post-list/post-list.component.ts:1): Container principale
- `CreatePostDialogComponent` (src/app/components/post-list/create-post-dialog/create-post-dialog.component.ts:1): Form di creazione
- `UserPostCardComponent` (src/app/components/shared/user-post-card/user-post-card.component.ts:1): Card singolo post

---

### 5. Sistema Commenti

**Funzionalità**:

**Visualizzazione Commenti**:
- Dialog modale che mostra tutti i commenti di un post
- Header con titolo e corpo del post per contesto
- Lista scrollabile di commenti
- Ogni commento mostra: nome autore, email e corpo del messaggio

**Aggiunta Nuovo Commento**:
- Form integrato nel dialog dei commenti
- Campi richiesti:
  - Nome (minimo 3 caratteri)
  - Email (validazione formato)
  - Messaggio (minimo 10 caratteri)
- Validazione in tempo reale con messaggi di errore specifici
- Aggiornamento automatico della lista dopo l'invio
- Messaggio di conferma con snackbar

**Gestione Errori**:
- Validazione completa del form
- Messaggi di errore user-friendly
- Gestione errori API con feedback all'utente

**Componenti Principali**:
- `PostCommentsDialogComponent` (src/app/components/user-details/post-comments-dialog/post-comments-dialog.component.ts:1): Dialog principale
- `AddCommentDialogComponent` (src/app/components/shared/add-comment-dialog/add-comment-dialog.component.ts:1): Form aggiunta commento

---

### 6. Componenti UI Condivisi

**Toolbar**:
- Navigazione principale con logo/titolo
- Pulsante logout sempre visibile
- Design Material con tema Rose Red

**Griglia Personalizzata**:
- Layout responsivo configurabile (1-3 colonne)
- Adattamento automatico alla larghezza dello schermo
- Utilizzata per liste utenti e post

**Paginatore Personalizzato**:
- Navigazione tra le pagine
- Selezione dimensione pagina (6, 12, 24 elementi)
- Indicatore pagina corrente/totale

**Barra di Ricerca**:
- Ricerca in tempo reale
- Debouncing per ottimizzare le performance
- Icon di ricerca Material
- Utilizzata in liste utenti e post

**Dialog di Conferma**:
- Dialog riutilizzabile per azioni distruttive
- Titolo e messaggio personalizzabili
- Pulsanti Annulla/Conferma con stili coerenti

**Snackbar Notifiche**:
- Feedback immediato per tutte le operazioni
- Messaggi di successo (verde) ed errore (rosso)
- Durata configurabile (3 secondi default)

**Componenti Condivisi**:
- `CustomGridComponent` (src/app/components/shared/custom-grid/custom-grid.component.ts:1): Griglia responsive
- `CustomPaginatorComponent` (src/app/components/shared/custom-paginator/custom-paginator.component.ts:1): Paginazione
- `CustomSearchComponent` (src/app/components/shared/custom-search/custom-search.component.ts:1): Ricerca
- `ConfirmDialogComponent` (src/app/components/shared/confirm-dialog/confirm-dialog.component.ts:1): Dialog conferma
- `ToolbarComponent` (src/app/components/shared/toolbar/toolbar.component.ts:1): Barra di navigazione

---

## 🛠 Tecnologie e Librerie Utilizzate

### Framework e Linguaggi

| Tecnologia | Versione | Descrizione |
|-----------|----------|-------------|
| **Angular** | 20.3.11 | Framework principale per lo sviluppo frontend |
| **TypeScript** | 5.9.3 | Linguaggio di programmazione con tipizzazione statica |
| **HTML5** | - | Markup per la struttura delle pagine |
| **SCSS** | - | Preprocessore CSS per gli stili |

### Librerie UI e Component

| Libreria | Versione | Utilizzo nell'App |
|----------|----------|-------------------|
| **@angular/material** | 20.2.12 | Componenti UI Material Design (cards, buttons, dialogs, forms, toolbar, snackbar, badges) |
| **@angular/cdk** | 20.2.12 | Component Development Kit per funzionalità avanzate (layout, overlay, a11y) |

### Routing e Forms

| Libreria | Versione | Utilizzo nell'App |
|----------|----------|-------------------|
| **@angular/router** | 20.3.11 | Sistema di routing per la navigazione tra le pagine |
| **@angular/forms** | 20.3.11 | Gestione form reattivi con validazione (ReactiveFormsModule) |

### HTTP e State Management

| Libreria | Versione | Utilizzo nell'App |
|----------|----------|-------------------|
| **@angular/common/http** | 20.3.11 | HttpClient per chiamate API REST |
| **RxJS** | 7.8.0 | Programmazione reattiva per gestione asincrona (Observables, BehaviorSubject, operators) |

### Server-Side Rendering

| Libreria | Versione | Utilizzo nell'App |
|----------|----------|-------------------|
| **@angular/ssr** | 20.3.10 | Server-Side Rendering (opzionale per SEO e performance) |
| **@angular/platform-server** | 20.3.11 | Supporto per rendering lato server |
| **Express** | 4.18.2 | Server Node.js per SSR |

### Testing

| Libreria | Versione | Utilizzo |
|----------|----------|----------|
| **Jasmine** | 5.6.0 | Framework di testing (describe, it, expect) |
| **Karma** | 6.4.0 | Test runner per eseguire i test nel browser |
| **karma-chrome-launcher** | 3.2.0 | Launcher per Chrome e ChromeHeadless |
| **karma-coverage** | 2.2.0 | Report di code coverage |
| **karma-jasmine** | 5.1.0 | Integrazione Jasmine con Karma |

### Build e Deployment

| Libreria | Versione | Utilizzo |
|----------|----------|----------|
| **@angular/cli** | 20.3.10 | CLI per sviluppo, build e scaffolding |
| **@angular/build** | 20.3.10 | Sistema di build basato su esbuild/Vite |
| **angular-cli-ghpages** | 2.0.3 | Deploy automatico su GitHub Pages |

### Altre Dipendenze

| Libreria | Versione | Utilizzo |
|----------|----------|----------|
| **zone.js** | 0.15.0 | Change detection di Angular |
| **tslib** | 2.3.0 | Libreria di helper per TypeScript |

---

## 📦 Prerequisiti

Prima di iniziare, assicurati di avere installato sul tuo sistema:

### Software Richiesto

1. **Node.js** (versione 18.x o superiore)
   - Verifica l'installazione: `node --version`
   - Download: [https://nodejs.org/](https://nodejs.org/)

2. **npm** (incluso con Node.js) o **yarn**
   - Verifica l'installazione: `npm --version`

3. **Git**
   - Verifica l'installazione: `git --version`
   - Download: [https://git-scm.com/](https://git-scm.com/)

4. **Browser Moderno**
   - Chrome, Firefox, Safari o Edge (ultima versione)

### Account GoRest (per l'autenticazione)

L'applicazione richiede un token Bearer di GoRest per funzionare:

1. Vai su [https://gorest.co.in/](https://gorest.co.in/)
2. Clicca su "Sign in" in alto a destra
3. Registrati con il tuo account GitHub o Google
4. Una volta loggato, vai su [https://gorest.co.in/consumer/login](https://gorest.co.in/consumer/login)
5. Copia il tuo **Access Token** (una stringa che inizia con un carattere lungo)

⚠️ **Importante**: Conserva il token in un luogo sicuro, ti servirà per fare il login nell'applicazione.

---

## 🚀 Installazione e Configurazione

### Passo 1: Clonare il Repository

```bash
# Clona il repository
git clone <url-del-repository>

# Entra nella directory del progetto
cd urban-ideas
```

### Passo 2: Installare le Dipendenze

```bash
# Installa tutte le dipendenze npm
npm install
```

Questo comando installerà tutte le librerie elencate in `package.json` nella cartella `node_modules/`.

**Tempo stimato**: 2-5 minuti (dipende dalla velocità della connessione)

### Passo 3: Configurare l'Autenticazione

L'applicazione non richiede file `.env` o configurazioni particolari. L'unica configurazione necessaria è il token Bearer di GoRest, che verrà inserito tramite l'interfaccia web al primo accesso.

**Nota**: Se vuoi testare rapidamente l'app, puoi modificare temporaneamente il file `auth.interceptor.ts` per inserire un token hardcoded (solo per sviluppo locale).

### Passo 4: Avviare l'Applicazione

```bash
# Avvia il server di sviluppo
npm start

# oppure
ng serve
```

L'applicazione sarà disponibile su: **http://localhost:4200/**

Il server si riavvierà automaticamente quando modifichi i file sorgente (Hot Reload).

### Passo 5: Effettuare il Login

1. Apri il browser e vai su `http://localhost:4200/`
2. Verrai reindirizzato automaticamente alla pagina di login
3. Incolla il token Bearer ottenuto da GoRest
4. Clicca su "Accedi"
5. Se il token è valido, verrai reindirizzato alla lista degli utenti

---

## 📝 Comandi Disponibili

### Comandi di Sviluppo

```bash
# Avvia il server di sviluppo (http://localhost:4200)
npm start

# Avvia il server con configurazione personalizzata
ng serve --port 4300 --open

# Avvia il build in modalità watch (ricompila automaticamente)
npm run watch
```

### Comandi di Build

```bash
# Build di sviluppo
npm run build

# Build di produzione ottimizzato
npm run build:prod

# Output: dist/urban-ideas/browser/
```

**Differenze tra build dev e prod**:
- Produzione: minificazione, tree-shaking, ahead-of-time compilation
- Dev: source maps completi, no ottimizzazioni

### Comandi di Test

```bash
# Esegui i test in modalità watch (si riavviano ad ogni modifica)
npm test

# Esegui i test una volta sola (utile per CI/CD)
npm run test:ci

# Esegui i test con coverage (genera report di copertura)
npm run test:coverage

# Esegui i test in modalità headless (senza aprire il browser)
npm run test:headless

# Debug dei test in Chrome
npm run test:debug

# Verifica che la coverage sia sufficiente
npm run coverage:check

# Apri il report di coverage nel browser (dopo aver eseguito test:coverage)
npm run coverage:open
```

**Report Coverage**: Viene generato in `coverage/urban-ideas/index.html`

### Comandi di Deployment

```bash
# Deploy completo su GitHub Pages (build + deploy)
npm run deploy

# Solo build di produzione e preparazione file
npm run predeploy
```

**Prerequisiti per il deploy**:
- Repository GitHub configurato
- Branch `gh-pages` esistente o permessi per crearlo
- URL base configurato in `angular.json`

### Comandi di Server-Side Rendering (Opzionale)

```bash
# Build SSR
npm run build

# Avvia il server SSR (dopo il build)
npm run serve:ssr:urban-ideas
```

L'app SSR sarà disponibile su `http://localhost:4000/`

### Comandi Angular CLI

```bash
# Genera un nuovo componente
ng generate component nome-componente

# Genera un nuovo servizio
ng generate service nome-servizio

# Genera un guard
ng generate guard nome-guard

# Lista di tutti i comandi disponibili
ng generate --help

# Analisi del bundle size
ng build --stats-json
```

### Comandi Git (per sviluppatori)

```bash
# Verifica lo stato dei file
git status

# Aggiungi file allo stage
git add .

# Crea un commit
git commit -m "Descrizione delle modifiche"

# Pusha le modifiche sul branch remoto
git push -u origin nome-branch
```

---

## 📁 Struttura del Progetto

```
urban-ideas/
│
├── src/                                    # Codice sorgente dell'applicazione
│   ├── app/                                # Modulo principale Angular
│   │   │
│   │   ├── pages/                          # Pagine complete (container components)
│   │   │   ├── user-list/                  # Pagina lista utenti
│   │   │   ├── post-list/                  # Pagina lista post
│   │   │   └── user-details-page/          # Pagina dettagli utente
│   │   │
│   │   ├── components/                     # Componenti riutilizzabili
│   │   │   │
│   │   │   ├── shared/                     # Componenti condivisi tra features
│   │   │   │   ├── toolbar/                # Barra di navigazione
│   │   │   │   ├── custom-grid/            # Griglia responsive
│   │   │   │   ├── custom-paginator/       # Paginatore personalizzato
│   │   │   │   ├── custom-search/          # Barra di ricerca
│   │   │   │   ├── confirm-dialog/         # Dialog di conferma
│   │   │   │   ├── user-post-card/         # Card post generico
│   │   │   │   ├── add-comment-dialog/     # Dialog aggiunta commento
│   │   │   │   ├── custom-button/          # Pulsante personalizzato
│   │   │   │   ├── custom-dialog-container/ # Container dialog
│   │   │   │   └── custom-post-card-header/ # Header card post
│   │   │   │
│   │   │   ├── user-list/                  # Componenti specifici per user-list
│   │   │   │   ├── user-list-header/       # Header lista utenti
│   │   │   │   ├── user-card/              # Card singolo utente
│   │   │   │   └── create-user-dialog/     # Dialog creazione utente
│   │   │   │
│   │   │   ├── post-list/                  # Componenti specifici per post-list
│   │   │   │   ├── post-list-page-header/  # Header lista post
│   │   │   │   └── create-post-dialog/     # Dialog creazione post
│   │   │   │
│   │   │   └── user-details/               # Componenti specifici per dettagli utente
│   │   │       ├── user-details-header/    # Header dettagli utente
│   │   │       ├── user-details-card/      # Card info utente
│   │   │       └── post-comments-dialog/   # Dialog commenti post
│   │   │
│   │   ├── features/                       # Feature modules con routing
│   │   │   ├── auth/                       # Modulo autenticazione
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth-routing.module.ts
│   │   │   │   └── pages/login/            # Pagina login
│   │   │   │
│   │   │   ├── users/                      # Modulo gestione utenti
│   │   │   │   ├── users.module.ts
│   │   │   │   └── users-routing.module.ts
│   │   │   │
│   │   │   └── posts/                      # Modulo gestione post
│   │   │       ├── posts.module.ts
│   │   │       └── posts-routing.module.ts
│   │   │
│   │   ├── core/                           # Servizi core, guards, interceptors
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts         # Servizio autenticazione
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts           # Guard protezione route
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts     # Interceptor per token
│   │   │   └── core.module.ts
│   │   │
│   │   ├── services/                       # Servizi API
│   │   │   └── users/
│   │   │       └── api.service.ts          # Servizio chiamate API GoRest
│   │   │
│   │   ├── shared/                         # Modelli e utilities condivise
│   │   │   ├── user.ts                     # Interfaccia User
│   │   │   ├── post.model.ts               # Interfaccia Post
│   │   │   ├── comment.model.ts            # Interfaccia Comment
│   │   │   └── shared.module.ts
│   │   │
│   │   ├── app.routes.ts                   # Configurazione routing principale
│   │   ├── app.config.ts                   # Configurazione applicazione
│   │   ├── app.component.ts                # Componente root
│   │   └── app.component.html              # Template root
│   │
│   ├── main.ts                             # Entry point applicazione
│   ├── main.server.ts                      # Entry point SSR
│   ├── server.ts                           # Server Express per SSR
│   ├── styles.scss                         # Stili globali
│   └── index.html                          # HTML template principale
│
├── public/                                 # Asset statici (immagini, favicon, ecc.)
│
├── dist/                                   # Output build (generato automaticamente)
│   └── urban-ideas/
│       ├── browser/                        # Build client-side
│       └── server/                         # Build server-side (SSR)
│
├── .vscode/                                # Configurazione VS Code
│   ├── launch.json                         # Configurazioni debug
│   ├── tasks.json                          # Task automatizzati
│   └── extensions.json                     # Estensioni consigliate
│
├── angular.json                            # Configurazione Angular CLI
├── tsconfig.json                           # Configurazione TypeScript principale
├── tsconfig.app.json                       # Config TypeScript per l'app
├── tsconfig.spec.json                      # Config TypeScript per i test
├── karma.conf.js                           # Configurazione Karma test runner
├── package.json                            # Dipendenze e script npm
├── package-lock.json                       # Lock file dipendenze
└── README.md                               # Questa documentazione
```

### Convenzioni di Naming

- **Componenti**: kebab-case (es. `user-list.component.ts`)
- **Servizi**: kebab-case + `.service.ts` (es. `auth.service.ts`)
- **Modelli**: kebab-case + `.model.ts` (es. `post.model.ts`)
- **Guards**: kebab-case + `.guard.ts` (es. `auth.guard.ts`)
- **Interceptors**: kebab-case + `.interceptor.ts`

### Architettura

**Pattern Architetturale**: Feature-based organization con Standalone Components

- **Core Module**: Servizi singleton, guards, interceptors (usati in tutta l'app)
- **Feature Modules**: Auth, Users, Posts (con routing dedicato)
- **Shared Components**: Componenti riutilizzabili condivisi tra features
- **Pages**: Container components che orchestrano i componenti più piccoli
- **Services**: Logica di business e chiamate API

---

## 🔐 Autenticazione e API

### Sistema di Autenticazione

L'applicazione utilizza un sistema di autenticazione basato su **Bearer Token** fornito da GoRest.

#### Flusso di Autenticazione

1. **Ottenimento Token**:
   - L'utente ottiene un token da [https://gorest.co.in/consumer/login](https://gorest.co.in/consumer/login)
   - Il token ha una durata limitata (controllare su GoRest)

2. **Login nell'Applicazione**:
   - L'utente inserisce il token nella pagina di login (`/login`)
   - Il token viene validato con una chiamata a `/users` dell'API GoRest
   - Se valido, viene salvato in `localStorage` con chiave `auth_token`

3. **Protezione delle Route**:
   - Tutte le route principali (`/users`, `/posts`, `/users/:id`) sono protette da `AuthGuard`
   - Se l'utente non è autenticato, viene reindirizzato a `/login`

4. **Iniezione Automatica del Token**:
   - `AuthInterceptor` intercetta tutte le richieste HTTP
   - Aggiunge automaticamente l'header: `Authorization: Bearer <token>`
   - Non è necessario aggiungere manualmente il token alle chiamate API

5. **Logout**:
   - Il logout rimuove il token da `localStorage`
   - L'utente viene reindirizzato alla pagina di login

#### Implementazione Tecnica

**AuthService** (`src/app/core/services/auth.service.ts`):
```typescript
- login(token: string): Observable<boolean>
- logout(): void
- isAuthenticated(): boolean
- getToken(): string | null
```

**AuthGuard** (`src/app/core/guards/auth.guard.ts`):
- Implementa `CanActivate`
- Verifica se l'utente è autenticato prima di accedere alle route

**AuthInterceptor** (`src/app/core/interceptors/auth.interceptor.ts`):
- Implementa `HttpInterceptor`
- Inietta il token in tutte le richieste HTTP

### API GoRest

**Base URL**: `https://gorest.co.in/public/v2`

#### Endpoints Utilizzati

**Utenti**:
```
GET    /users                     - Lista utenti (con paginazione)
        Query params: page, per_page

POST   /users                     - Crea nuovo utente
        Body: { name, email, gender, status }

GET    /users/{id}                - Dettagli singolo utente

DELETE /users/{id}                - Elimina utente

GET    /users/{id}/posts          - Post di un utente specifico
```

**Post**:
```
GET    /posts                     - Lista tutti i post (con paginazione)
        Query params: page, per_page

POST   /users/{userId}/posts      - Crea post per un utente
        Body: { title, body }

GET    /posts/{id}                - Dettagli singolo post
```

**Commenti**:
```
GET    /posts/{postId}/comments   - Commenti di un post
        Query params: page, per_page

POST   /posts/{postId}/comments   - Aggiungi commento a un post
        Body: { name, email, body }
```

#### Modelli Dati

**User**:
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  gender: "male" | "female";
  status: "active" | "inactive";
}
```

**Post**:
```typescript
interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}
```

**Comment**:
```typescript
interface Comment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}
```

#### Paginazione

Le API di GoRest utilizzano paginazione tramite query params:
- `page`: numero della pagina (default: 1)
- `per_page`: elementi per pagina (default: 20, max: 100)

**Headers di Response**:
- `X-Pagination-Total`: totale elementi
- `X-Pagination-Pages`: totale pagine
- `X-Pagination-Page`: pagina corrente
- `X-Pagination-Limit`: elementi per pagina

#### Gestione Errori API

L'applicazione gestisce i seguenti errori:
- **401 Unauthorized**: Token non valido o scaduto → redirect a login
- **404 Not Found**: Risorsa non trovata → messaggio di errore
- **422 Unprocessable Entity**: Validazione fallita → mostra errori specifici
- **500 Internal Server Error**: Errore server → messaggio generico

**Service di API** (`src/app/services/users/api.service.ts`):
```typescript
- getUsers(page, perPage): Observable<User[]>
- createUser(user: User): Observable<User>
- deleteUser(id: number): Observable<void>
- getUserById(id: number): Observable<User>
- getUserPosts(userId: number, page, perPage): Observable<Post[]>
- getPosts(page, perPage): Observable<Post[]>
- createPost(userId: number, post: Post): Observable<Post>
- getPostComments(postId: number): Observable<Comment[]>
- createComment(postId: number, comment: Comment): Observable<Comment>
```

---

## 🌐 Build e Deployment

### Build di Sviluppo

```bash
npm run build
```

**Output**: `dist/urban-ideas/browser/`

**Caratteristiche**:
- Source maps completi per debug
- No minificazione
- No ottimizzazioni aggressive
- Build time: ~30-60 secondi

### Build di Produzione

```bash
npm run build:prod
```

**Output**: `dist/urban-ideas/browser/`

**Ottimizzazioni Applicate**:
- **Minificazione**: Codice compresso e ottimizzato
- **Tree-shaking**: Rimozione del codice non utilizzato
- **AOT Compilation**: Ahead-of-time compilation dei template
- **Bundling**: File JavaScript raggruppati e ottimizzati
- **CSS Inlining**: Stili critici inlined per performance
- **Image Optimization**: (se configurato)
- **Base Href**: Impostato a `/urban-ideas/` per GitHub Pages

**Budget Size** (configurato in `angular.json`):
- Initial bundle: 500 kB (warning), 1 MB (error)
- Lazy loaded chunks: nessun limite

**Build time**: ~60-120 secondi

### Deployment su GitHub Pages

#### Prerequisiti

1. Repository GitHub pubblico
2. GitHub Pages abilitato nelle impostazioni del repository
3. Branch `gh-pages` (verrà creato automaticamente)

#### Processo di Deploy

```bash
# Deploy completo (build + push su gh-pages)
npm run deploy
```

**Cosa succede**:
1. `predeploy`: Esegue build di produzione con base-href corretto
2. Copia `index.csr.html` → `index.html` (per client-side routing)
3. Crea `404.html` (copia di index.html per routing SPA)
4. `deploy`: Pusha il contenuto di `dist/urban-ideas/browser/` sul branch `gh-pages`

**URL Finale**: `https://<username>.github.io/urban-ideas/`

#### Configurazione Manuale GitHub Pages

Se il deploy automatico non funziona:

1. Vai su Settings → Pages nel tuo repository
2. Source: seleziona `gh-pages` branch
3. Folder: `/ (root)`
4. Salva

Dopo qualche minuto, l'app sarà disponibile all'URL GitHub Pages.

### Deploy su Altri Hosting

#### Netlify

```bash
# Build
npm run build:prod

# Crea file netlify.toml
```

**netlify.toml**:
```toml
[build]
  publish = "dist/urban-ideas/browser"
  command = "npm run build:prod"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Vercel

```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**vercel.json**:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

#### Server Node.js (SSR)

```bash
# Build completo con SSR
npm run build

# Avvia il server
npm run serve:ssr:urban-ideas
```

L'app sarà disponibile su `http://localhost:4000/`

### Variabili d'Ambiente

L'applicazione attualmente non usa variabili d'ambiente. Se vuoi aggiungerne:

1. Crea file `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://gorest.co.in/public/v2'
};
```

2. Crea `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://gorest.co.in/public/v2'
};
```

3. Usa in `api.service.ts`:
```typescript
import { environment } from '../environments/environment';

private apiUrl = environment.apiUrl;
```

---

## 🧪 Test

### Struttura dei Test

L'applicazione utilizza **Jasmine** per scrivere i test e **Karma** come test runner.

**File di test**: Ogni componente/servizio ha un file `.spec.ts` associato.

Esempio:
```
user-list.component.ts
user-list.component.spec.ts
```

### Eseguire i Test

#### Test in Watch Mode (Sviluppo)

```bash
npm test
```

- I test si riavviano automaticamente quando modifichi i file
- Utile durante lo sviluppo
- Apre una finestra Chrome con il Karma test runner

#### Test una Sola Volta (CI/CD)

```bash
npm run test:ci
```

- Esegue tutti i test una volta sola
- Usa ChromeHeadless (nessuna finestra browser)
- Genera report di code coverage
- Ideale per pipeline CI/CD

#### Test con Code Coverage

```bash
npm run test:coverage
```

**Report generato in**: `coverage/urban-ideas/index.html`

**Aprire il report**:
```bash
npm run coverage:open
```

**Metriche di Coverage**:
- **Statements**: Percentuale di statement eseguiti
- **Branches**: Percentuale di branch (if/else) testati
- **Functions**: Percentuale di funzioni chiamate
- **Lines**: Percentuale di linee di codice eseguite

**Soglie consigliate**:
- Statements: >80%
- Branches: >70%
- Functions: >80%
- Lines: >80%

#### Test in Modalità Debug

```bash
npm run test:debug
```

- Apre Chrome con DevTools
- Permette di usare breakpoint e debugger
- Utile per capire perché un test fallisce

### Scrivere Test

#### Test di un Componente

```typescript
describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display users list', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.user-list')).toBeTruthy();
  });
});
```

#### Test di un Servizio

```typescript
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login with valid token', () => {
    const token = 'valid-token';

    service.login(token).subscribe(result => {
      expect(result).toBe(true);
    });

    const req = httpMock.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush([{ id: 1, name: 'Test' }]);
  });
});
```

### Configurazione Karma

**File**: `karma.conf.js`

**Browser configurati**:
- `Chrome`: Per sviluppo con UI
- `ChromeHeadless`: Per CI/CD senza UI
- `ChromeHeadlessCI`: Configurazione ottimizzata per CI

**Reporter**:
- `progress`: Output testuale in console
- `kjhtml`: Report HTML nel browser
- `coverage`: Report di code coverage

### Best Practices per i Test

1. **Testa il comportamento, non l'implementazione**
2. **Usa nomi descrittivi** per i test: `it('should display error when login fails', ...)`
3. **Mock delle dipendenze** esterne (HttpClient, Router, ecc.)
4. **Test isolati**: Ogni test deve essere indipendente
5. **Setup e Teardown**: Usa `beforeEach` e `afterEach`
6. **Async Testing**: Usa `async/await` o `fakeAsync` per operazioni asincrone
7. **Code Coverage**: Punta ad almeno 80% di coverage

---

## 🐛 Risoluzione Problemi

### Problemi Comuni e Soluzioni

#### 1. Errore "npm install" fallisce

**Problema**: `npm ERR! code ERESOLVE` o errori di dipendenze

**Soluzioni**:
```bash
# Pulisci cache npm
npm cache clean --force

# Rimuovi node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstalla
npm install

# Se persiste, usa --legacy-peer-deps
npm install --legacy-peer-deps
```

#### 2. Porta 4200 già in uso

**Problema**: `Port 4200 is already in use`

**Soluzioni**:
```bash
# Usa una porta diversa
ng serve --port 4300

# Oppure termina il processo sulla porta 4200 (Linux/Mac)
lsof -ti:4200 | xargs kill -9

# Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

#### 3. Token non valido / 401 Unauthorized

**Problema**: Login fallisce o API restituisce 401

**Soluzioni**:
1. Verifica che il token sia copiato completamente (senza spazi)
2. Controlla che il token non sia scaduto su GoRest
3. Genera un nuovo token da [https://gorest.co.in/consumer/login](https://gorest.co.in/consumer/login)
4. Pulisci localStorage: `localStorage.clear()` nella console del browser
5. Riprova il login con il nuovo token

#### 4. Pagina bianca dopo il build di produzione

**Problema**: L'app funziona in dev ma non dopo il build

**Soluzioni**:
```bash
# Verifica la console del browser per errori
# Di solito è un problema di base-href

# Assicurati che il base-href sia corretto
ng build --base-href /urban-ideas/

# Se deploy su root domain
ng build --base-href /

# Controlla che i path siano relativi, non assoluti
```

#### 5. Errori TypeScript / Type checking

**Problema**: `error TS2304: Cannot find name...` o altri errori di tipo

**Soluzioni**:
```bash
# Riavvia il language server di TypeScript in VS Code
# CMD/CTRL + Shift + P → "TypeScript: Restart TS server"

# Pulisci e rebuilda
rm -rf dist node_modules
npm install
ng build
```

#### 6. Test falliscono

**Problema**: `Jasmine timed out` o test che non passano

**Soluzioni**:
```bash
# Esegui un singolo file di test
ng test --include='**/user-list.component.spec.ts'

# Debug in Chrome
npm run test:debug

# Pulisci cache Karma
rm -rf .angular/cache
```

#### 7. Problemi di CORS

**Problema**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Nota**: Le API di GoRest permettono CORS, ma se usi un proxy:

```bash
# Crea file proxy.conf.json
{
  "/api": {
    "target": "https://gorest.co.in/public/v2",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}

# Avvia con proxy
ng serve --proxy-config proxy.conf.json
```

#### 8. Stili Material non caricati

**Problema**: Componenti Material appaiono senza stile

**Soluzioni**:
Verifica che `styles.scss` importi il tema Material:
```scss
@import '@angular/material/prebuilt-themes/rose-red.css';
```

Oppure reinstalla Material:
```bash
ng add @angular/material
```

#### 9. Hot Reload non funziona

**Problema**: Le modifiche non si riflettono automaticamente

**Soluzioni**:
```bash
# Riavvia il server di sviluppo
# CTRL + C per fermare
npm start

# Verifica che non ci siano errori di compilazione nella console
```

#### 10. Errore durante il deploy su GitHub Pages

**Problema**: `npm run deploy` fallisce

**Soluzioni**:
```bash
# Verifica di avere i permessi sul repository
git remote -v

# Assicurati di essere autenticato
git config user.name
git config user.email

# Pusha manualmente il branch gh-pages
npm run predeploy
cd dist/urban-ideas/browser
git init
git add .
git commit -m "Deploy"
git branch -M gh-pages
git remote add origin <url-repository>
git push -f origin gh-pages
```

### Log e Debug

**Console del Browser**: Premi F12 o CMD+Option+I (Mac) per aprire DevTools

**Abilitare il source mapping** (per debug in produzione):
```typescript
// angular.json
"configurations": {
  "production": {
    "sourceMap": true
  }
}
```

**Logging in Angular**:
```typescript
console.log('Debug:', variabile);
console.error('Errore:', errore);
console.table(array); // Per array/oggetti
```

### Risorse Utili

- **Documentazione Angular**: [https://angular.dev](https://angular.dev)
- **Angular Material**: [https://material.angular.io](https://material.angular.io)
- **GoRest API Docs**: [https://gorest.co.in](https://gorest.co.in)
- **Stack Overflow**: [https://stackoverflow.com/questions/tagged/angular](https://stackoverflow.com/questions/tagged/angular)
- **Angular CLI Docs**: [https://angular.dev/tools/cli](https://angular.dev/tools/cli)

---

## 📞 Supporto

Per problemi, bug o domande:

1. **Issues GitHub**: Apri una issue nel repository
2. **Documentazione**: Consulta questa guida e la documentazione Angular
3. **Community**: Angular Discord, Stack Overflow

---

## 📄 Licenza

Questo progetto è stato generato con [Angular CLI](https://github.com/angular/angular-cli) versione 19.2.17.

---

## 🎓 Risorse per Imparare

### Tutorial Angular
- [Tour of Heroes (ufficiale)](https://angular.dev/tutorials/first-app)
- [Angular University](https://angular-university.io/)

### Material Design
- [Material Design Guidelines](https://m3.material.io/)
- [Angular Material Components](https://material.angular.io/components/categories)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### RxJS
- [Learn RxJS](https://www.learnrxjs.io/)
- [RxJS Marbles (visualizza operatori)](https://rxmarbles.com/)

---

**Buon sviluppo! 🚀**
