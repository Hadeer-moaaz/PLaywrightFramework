# Playwright + Cucumber BDD

## Add a feature

1. Add a `.feature` file under `features/`, grouped by application module. Write each case as a Gherkin `Scenario` or use `Scenario Outline` with `Examples` for data-driven cases. Apply `@smoke` and/or `@regression` tags.
2. Reuse an existing step when it describes the same action or assertion. Otherwise, add a step definition under `step-definitions/`; keep it free of selectors and delegate browser actions to a Page Object.
3. Put selectors and UI actions in the related class under `pages/`. Keep assertions in `Then` steps using Playwright's `expect`.
4. Put shared scenario state and lifecycle hooks in `support/`. The custom World creates an isolated browser context and page per scenario; failed scenarios attach a screenshot to the HTML report.
5. Keep test credentials and other fixture values in `test-data/` or environment variables. Do not commit private credentials.

## Run and view reports

- `npm run test:bdd` runs all Gherkin scenarios.
- `npm run test:smoke` runs scenarios tagged `@smoke`.
- `npm run test:playwright` runs the existing Playwright Test suite.

Cucumber writes the HTML report to `reports/cucumber-report.html`. The `reports/` directory is ignored by Git except for its placeholder file.

## Project layout

```text
features/                 Gherkin scenarios grouped by module
step-definitions/         Cucumber steps that delegate to Page Objects
pages/                    Page Object classes: locators and actions
support/                  Custom World and Cucumber hooks
test-data/                JSON fixtures and non-secret test data
reports/                  Generated Cucumber HTML reports
```