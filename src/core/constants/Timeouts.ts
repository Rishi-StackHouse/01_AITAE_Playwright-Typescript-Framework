// Centralized timeout fallbacks — used only when the matching process.env value is not set
export type AppName = 'orge' | 'facets';
// Scope keys of APP_TIMEOUTS: 'default' is the app-agnostic baseline, the rest are real apps
export type TimeoutScope = 'default' | AppName;

// Per-app timeouts — engine waits plus each app's own component waits
export const APP_TIMEOUTS = {
    default: {
    ELEMENT: Number(process.env.DEFAULT_ELEMENT_TIMEOUT ?? 15_000),
    NAVIGATION: Number(process.env.DEFAULT_NAVIGATION_TIMEOUT ?? 30_000),
  },
  orge: {
    ELEMENT: Number(process.env.ORGE_ELEMENT_TIMEOUT ?? 10_000),
    NAVIGATION: Number(process.env.ORGE_NAVIGATION_TIMEOUT ?? 20_000),
    LEFT_NAV: Number(process.env.ORGE_LEFT_NAV_TIMEOUT ?? 3_000),   // left nav is present post-login, fail fast if missing
    // TOASTER: Number(process.env.ORGE_TOASTER_TIMEOUT ?? 3_000),
  },
  facets: {
    ELEMENT: Number(process.env.FACETS_ELEMENT_TIMEOUT ?? 15_000),
    NAVIGATION: Number(process.env.FACETS_NAVIGATION_TIMEOUT ?? 20_000),
    // WARNING_DIALOG: Number(process.env.FACETS_WARNING_DIALOG_TIMEOUT ?? 2_000),
  },
};

