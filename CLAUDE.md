# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

FER202 university lab project ("OrchidLab"): a Create React App (react-scripts 5) app using React 19, react-router-dom v7, Formik + Yup, and axios. Labs 1–5 all live in this one app; the README tracks per-lab status and a changelog.

## Commands

```bash
npm start                                   # dev server on http://localhost:3000
npm run build                               # production build to /build
npm test                                    # Jest + React Testing Library, watch mode
npm test -- --watchAll=false                # run once (CI style)
npm test -- src/App.test.js                 # single test file
npm test -- -t "test name"                  # single test by name
```

There is no separate lint script. ESLint (`react-app` config) runs through react-scripts during `start`/`build`.

`src/App.test.js` is the unmodified CRA boilerplate. It fails: it looks for "learn react" text and renders `<App />` without the `BrowserRouter`/`ThemeProvider` wrappers that `index.js` provides.

## Architecture

**Provider nesting.** `index.js` wraps `BrowserRouter > ThemeProvider > App`. Inside `App.js`, `AuthProvider` wraps only `Navigation` and `Routes`. `Banner` and `Footer` sit outside it, so they cannot read `AuthContext`.

**Two feature areas under `src/`.** Each uses the same folder layout: `components_main/` (pages), `components_data/` (static data), `components_utils/` (contexts, nav, CSS), `components_img/`.
- `src/Orchid/`: the main orchid catalog app (Labs 1–3, 5).
- `src/Checkout/`: Lab 4, a `useReducer` shopping cart with a Formik checkout form, served at `/lab4`. It is reached from a link in `Footer`, and `Navigation`/`Footer` change their rendering when the path starts with `/lab4`.

**Auth (`components_utils/AuthProvider.js`).** Login is fake: any username typed in the `Navigation` form is saved to `localStorage['user']`. The context exposes `username`, `user`, `isAdmin`, and `userToggle(name)`; calling `userToggle("")` logs out. Admin rights come from a hardcoded `adminList` (`['Admin', 'Typhoeus']`) in `AuthProvider`. There is no route guard. Each page checks `user` itself and renders the same copy-pasted "Please Login To View The Content" block.

**Theme (`components_utils/ThemeContext.js`).** `theme` is an object `{ backgroundColor, color, borderColor }`, and components apply it through inline `style` props rather than CSS classes. The dark/light choice is saved in `localStorage['dark']`. Bootstrap 5 CSS/JS comes from a CDN in `public/index.html`; the `bootstrap` npm package is installed but never imported.

**Orchid data.** Pages fetch orchids with axios from a MockAPI endpoint (`https://6adff4d28e42963c8d5e864b.mockapi.io/orchids`). By design, each component declares its own `const orchidAPI` and calls axios inline (`.then(e => ...)`, `.catch(e => setError(e.message))`). The owner prefers this over a shared API module, so don't extract one. The admin pages read the URL from `process.env.REACT_APP_API_URL`, which is set in `.env`. That file is git-ignored, and CRA only reads `.env` at startup, so restart `npm start` after editing it. The main pages hardcode the URL. `components_data/ListOfOrchids.js` is the older local dataset: its imports are commented out, and it uses an `Id` key where the API uses `id`. Its image paths point to `public/assets/images/`. The `image` field of each MockAPI record is a GitHub raw URL (`https://raw.githubusercontent.com/NekomataRin/FA26_FER202/NekoRin's/public/assets/images/orXX.png`), so those files must stay pushed on the `NekoRin's` branch. The admin form only accepts `http(s)://` URLs for images. `OrchidDetail` fetches `GET /orchids/:id` and shows a "not found" message on a 404. It also reads `location.state.from` so the close button returns to `/` or `/naturals`.

**Forms.** All forms use the `useFormik` hook with a Yup `validationSchema`. `CheckoutForm` and `OrchidContact` share the same pattern: a `textFields` array mapped to inputs via `formik.getFieldProps`, plus a `hasError(name)` helper that combines `touched` and `errors`.

**Admin CRUD (Lab 6).** The pages live in `src/Orchid/components_main/admin/`:

| Route | Page | Request |
|---|---|---|
| `/manage` | `OrchidManage` (table) | GET list |
| `/manage/create` | `OrchidAdd` | POST |
| `/manage/update/:id` | `OrchidUpdate` | GET one, then PUT |
| `/manage/delete/:id` | `OrchidDelete` (confirmation page) | GET one, then DELETE |

- `OrchidAdd` and `OrchidUpdate` share `OrchidForm` (Formik + Yup). Their submit handlers must return the axios promise so the form can catch errors and reset `isSubmitting`.
- After each change, the page navigates to `/manage` with `state.message`. `OrchidManage` shows that message and refetches the list.
- `components_utils/AdminRoute.js` checks `isAdmin` and is meant to wrap the four `/manage` routes.
- Styles are in `components_utils/orchidAdmin.css`.
- `OrchidPresentation` shows the "Manage Orchids" link to admins only.

## Conventions

- Some code comments are in Vietnamese.
- Commit messages follow the format `YYYYMMDD-HHMM <description>`, e.g. `20261019-1717 Progress on Lab 5: 100%`. Each commit also gets an entry in the README's Changelog section and, where relevant, a Lab Status update.
- The working branch is `NekoRin's`. The remote is `FA26_FER202` (`github.com/NekomataRin/FA26_FER202`).
