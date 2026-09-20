/*
--------------------------------------------------------------------------------
PROBLEM STATEMENTS
--------------------------------------------------------------------------------
1. If there is no centralized configuration management,
Maintainability will be hard (Need to hunt down for any small changes to be done in the env variable)  
No Visibility of all the app creds.

2. If we directly use the env-variables inside the page methods, then we cant robustly run the tests in one specific environment.
  We need to change the respective environment's variables in the page methods each and every time.  

3. Need to ensure type safety for the configuration layer, so that any property mismatch is caught at compile time (By automation engineers).

--------------------------------------------------------------------------------
SOLUTION / APPROACH
--------------------------------------------------------------------------------
1. Creating a centralized configuration object (one single big nested object) containing all the app credentials env variables
  for each environment (DEV, QA, PROD).
  - Direct visibility of all the app credentials.
  - Easy Maintainability - If any change is needed, we can change it in one place and it will be reflected in all the test/page methods.

2. I’m going to use a TypeScript function that:
    * Determines the active environment (DEV/QA/PROD) from the environment variable.
    * Accepts the app name as a parameter and resolves the corresponding app credentials from the configuration object for the active environment.
    * Captures the returned object as a variable, exports it, and uses it within the page methods.  

3. This file leverages TypeScript constructs such as interfaces, types, and Records to ensure type safety across the configuration layer.
    Interfaces
     * Separate interfaces are defined for each credential type:(Web, * API, * DB, * SMTP)
     * This ensures the property mismatch is caught at compile time. (By automation engineers)
    Types
     * Type to restrict the environment: Restricts the supported environments to only DEV, QA, and PROD, preventing accidental configuration of unsupported environments.
     * Type to restrict the app names: Restricts app names to the supported applications and used as a data type annotation for the function's parameter.
    Record
     * Used to map each environment to its corresponding application configuration while maintaining type safety.
     * To maintain a clean pattern - since many details comes into the picture
*/

import 'dotenv/config';

//web creds
export interface WebConfig {
    url: string;
    browser?: "chromium" | "firefox" | "webkit";
    headless: boolean;
    loginRequired: boolean;      // set false for apps that have no login, #url authentication
    username?: string;            // optional - only needed when loginRequired is true
    password?: string;
}
//db creds
export interface DbConfig {
    server: string;
    username: string;
    password: string;
}
//api creds
export interface ApiConfig {
    baseUrl: string;
    timeout?: number;
    authType?: "bearer" | "basic" | "none";
}
//smtp creds
export interface SmtpConfig {
    server: string;
}
/*************************************************************************************************************************/
// App config - interface for an app, To create a enforcement that an app should have all 4 creds configured
export interface AppConfig {
    web: WebConfig;
    db?: DbConfig;
    api?: ApiConfig;
    smtp?: SmtpConfig;
}

export interface AppProvision {
    apps: Record<string, AppConfig>;
}

export type EnvName = "dev" | "qa" | "prod";
//Assigning the active env from .env file to a variable - defaults to qa (if not found)
const ACTIVE_ENV: EnvName = (process.env.ACTIVE_ENV as EnvName) || 'qa';


const envCredConfig: Record<EnvName, AppProvision> = {
    dev: {
        apps: {
            orge: {
                web: {
                    url: process.env.DEV_ORGE_WEB_URL!, // Compile time error since its not a string as promised so non null
                    browser: "chromium",
                    headless: false,
                    loginRequired: true,
                    username: process.env.DEV_ORGE_WEB_USERNAME!,
                    password: process.env.DEV_ORGE_WEB_PASSWORD!
                },
                db: {
                    server: process.env.DEV_ORGE_DB_SERVER!, // as - keyword creates a compile time promise
                    username: process.env.DEV_ORGE_DB_USER!,
                    password: process.env.DEV_ORGE_DB_PASSWORD!
                },
                api: {
                    baseUrl: process.env.DEV_ORGE_API_BASEURL!,
                },
                smtp: {
                    server: process.env.DEV_ORGE_SMTP_SERVER!,
                }
            },
            facets: {
                web: {
                    url: process.env.DEV_FACETS_WEB_URL!,
                    browser: "chromium",
                    headless: false,
                    loginRequired: true,
                    username: process.env.DEV_FACETS_WEB_USERNAME!,
                    password: process.env.DEV_FACETS_WEB_PASSWORD!
                },
                db: {
                    server: process.env.DEV_FACETS_DB_SERVER!,
                    username: process.env.DEV_FACETS_DB_USER!,
                    password: process.env.DEV_FACETS_DB_PASSWORD!
                },
                api: {
                    baseUrl: process.env.DEV_FACETS_API_BASEURL!,
                },
                smtp: {
                    server: process.env.DEV_FACETS_SMTP_SERVER!,
                }
            }
        }
    },
    qa: {
        apps: {
            orge: {
                web: {
                    url: process.env.QA_ORGE_WEB_URL!,
                    browser: "chromium",
                    headless: false,
                    loginRequired: true,
                    username: process.env.QA_ORGE_WEB_USERNAME!,
                    password: process.env.QA_ORGE_WEB_PASSWORD!
                },
                db: {
                    server: process.env.QA_ORGE_DB_SERVER!,
                    username: process.env.QA_ORGE_DB_USER!,
                    password: process.env.QA_ORGE_DB_PASSWORD!
                },
                api: {
                    baseUrl: process.env.QA_ORGE_API_BASEURL!,
                },
                smtp: {
                    server: process.env.QA_ORGE_SMTP_SERVER!,
                }
            },
            facets: {
                web: {
                    url: process.env.QA_FACETS_WEB_URL!,
                    browser: "chromium",
                    headless: false,
                    loginRequired: true,
                    username: process.env.QA_FACETS_WEB_USERNAME!,
                    password: process.env.QA_FACETS_WEB_PASSWORD!
                },
                db: {
                    server: process.env.QA_FACETS_DB_SERVER!,
                    username: process.env.QA_FACETS_DB_USER!,
                    password: process.env.QA_FACETS_DB_PASSWORD!
                },
                api: {
                    baseUrl: process.env.QA_FACETS_API_BASEURL!,
                },
                smtp: {
                    server: process.env.QA_FACETS_SMTP_SERVER!,
                }
            }
        }
    },
    prod: {
        apps: {
            orge: {
                web: {
                    url: process.env.PROD_ORGE_WEB_URL!,
                    browser: "chromium",
                    headless: false,
                    loginRequired: true,
                    username: process.env.PROD_ORGE_WEB_USERNAME!,
                    password: process.env.PROD_ORGE_WEB_PASSWORD!
                },
                db: {
                    server: process.env.PROD_ORGE_DB_SERVER!,
                    username: process.env.PROD_ORGE_DB_USER!,
                    password: process.env.PROD_ORGE_DB_PASSWORD!
                },
                api: {
                    baseUrl: process.env.PROD_ORGE_API_BASEURL!,
                },
                smtp: {
                    server: process.env.PROD_ORGE_SMTP_SERVER!,
                }
            },
            facets: {
                web: {
                    url: process.env.PROD_FACETS_WEB_URL!,
                    browser: "chromium",
                    headless: false,
                    loginRequired: true,
                    username: process.env.PROD_FACETS_WEB_USERNAME!,
                    password: process.env.PROD_FACETS_WEB_PASSWORD!
                },
                db: {
                    server: process.env.PROD_FACETS_DB_SERVER!,
                    username: process.env.PROD_FACETS_DB_USER!,
                    password: process.env.PROD_FACETS_DB_PASSWORD!
                },
                api: {
                    baseUrl: process.env.PROD_FACETS_API_BASEURL!,
                },
                smtp: {
                    server: process.env.PROD_FACETS_SMTP_SERVER!,
                }
            }
        }
    }
};

// Type for valid app names - update this when adding/removing apps
type AppName = "orge" | "facets";

// Retrieve credentials for a given app - validates it exists in active environment
function accessCreds(appName: AppName): AppConfig {
    const apps = envCredConfig[ACTIVE_ENV].apps;
    if (appName in apps) {                            // for verifying whether the app is avail for the acive environemnt or not, in this condition the appName will be checked against only the keys of the apps object, since keys are containing the actual data (in operator javascript)
        return apps[appName];
    }
    const availableApps = Object.keys(apps).map(k => `"${k}"`).join(", ");
    throw new Error(`App '${appName}' is not found in '${ACTIVE_ENV}' environment\nAvailable apps in '${ACTIVE_ENV}' environment - ${availableApps}`);
}

/* Apps access final values of creds */
export const orgeCreds = accessCreds('orge');
export const facetsCreds = accessCreds('facets');



/*

Interface

Type

Record

*/