# React Skeleton — Beam

A minimal, production-friendly React starter built with Vite. Beam extends the smaller Prism skeleton with routing, internationalization, and a light state/query setup so you can jump-start real apps.

## Quick start

Prereqs:
- Node.js 18+ (tested with Node 18/20)
- npm (or yarn / pnpm)

Get going:

```powershell
# from project root
npm install
npm run dev      # starts Vite on http://localhost:2801

# build for production
npm run build
npm run preview  # preview the production build on port 2801
```

Useful scripts (see `package.json`):
- `dev` — vite dev server (port 2801)
- `build` — production build
- `preview` — preview built app (port 2801)
- `lint` — run ESLint on `src`
- `format` — run Prettier

## Project layout (important files)

src/
- index.html / main.jsx — app entry
- App.jsx — thin wrapper (layout routed via router)
- app/
	- providers.jsx — app providers (React Query, i18n, RouterProvider)
	- routes.jsx — router definition (createBrowserRouter)
	- RouteError.jsx — route-level error element
- components/
	- Layout.jsx — base application layout (header, sidebar, main). This is registered as the root route element so child pages render into its `<Outlet />`.
	- main_layout/
		- Header.jsx — top header (language switcher, title)
		- LanguageCombo.jsx — language selector (react-select)
		- SideMenuButton.jsx — sidebar link component
	- CurrentPage.jsx — wrapper that renders `<Outlet />` in the main panel
	- Navigation.jsx — primary sidebar navigation
- pages/
	- Dashboard..jsx, Posts.jsx, Contact.jsx — example pages rendered into the Layout's outlet
- i18n/
	- i18n.js — i18next initialization (namespaces, interpolation)
	- locales/* — translation json files
- styles/ — CSS for layout and theme

Other notable deps:
- `react-router-dom` (v7) — routing via `createBrowserRouter` + `RouterProvider`
- `react-i18next` / `i18next` — internationalization
- `@tanstack/react-query` — data fetching/cache
- `react-select` — language combobox (optional)

## Routing & Layout behavior

This project uses `createBrowserRouter(...)` and registers `Layout` as the route element for `/`. Child routes (Dashboard, Posts, Contact) are rendered into `Layout`'s `<Outlet />`.

Implication: `Layout` remains mounted across navigation between its child routes. Only the outlet content changes (no remount) unless you intentionally change route keys or navigate to a completely different parent route.

If you see the runtime error "useLocation() may be used only in the context of a <Router> component.", it's usually because a component that uses router hooks was rendered outside the router context. In this project the router is provided inside `AppProviders` (via `RouterProvider`), so ensure you render `AppProviders` at the app root (see `src/main.jsx`).

## Internationalization (i18n)

- Translation JSONs live in `src/i18n/locales/*` and are wired in `src/i18n/i18n.js`.
- `i18n.init` uses `interpolation: { escapeValue: false }` so translations are not HTML-escaped.
- Use `t('namespace.key.path')` for nested keys. For strings that include inline markup (like `<strong>`/`<em>`), use the `Trans` component and provide a `components` mapping so those tags render as React elements safely.

Example in a page:
```jsx
import { useTranslation, Trans } from 'react-i18next'
const { t } = useTranslation()
// simple key
<h2>{t('pages.dashboard.title')}</h2>
// rich text with tags
<Trans i18nKey="pages.dashboard.content" components={{ strong: <strong/>, em: <em/> }} />
```

## State & Data Fetching

- React Query is configured in `app/providers.jsx` (QueryClient). Use `@tanstack/react-query` hooks for server state and caching.

## Styling

- Simple CSS lives in `src/styles` and is imported from `main.jsx`/`App`.

## Replacing the language buttons with a combobox

The header previously showed three `GeneralButton` components for language switching. There is an implemented `LanguageCombo.jsx` which uses `react-select`. It reads `i18n.language` and calls `i18n.changeLanguage(lang)` on selection. If you prefer to avoid the `react-select` dependency, replacing it with a native `<select>` is trivial.

## Troubleshooting

- Dev server not starting: ensure Node version is compatible and run `npm install` first.
- Router hook errors: check `src/main.jsx` and `src/app/providers.jsx` to ensure `RouterProvider` is mounted and your route tree renders the components that use hooks inside it.
- Translated HTML-like tags showing literally: use `Trans` with a `components` prop; also ensure `interpolation.escapeValue` is `false` in `i18n` config.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.