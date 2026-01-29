Readme:

# Playwright Test Suite - Technical Task

A small suite of frontend functional tests built with Playwright to validate core user behaviour for the Blazemeter demo site: https://www.demoblaze.com/index.html

## Tech stack:
- Playwright
- Node 24.13.0
- npm
- Typescript
	
## Setup:
1. Clone the repository
2. Add a `.env` file to the repo root. Add the below variables with whatever values you like: 
```
SIGN_UP_USERNAME=,
SIGN_UP_PASSWORD=,
LOG_IN_USERNAME=,
LOG_IN_PASSWORD=,
CHECKOUT_USERNAME=,
CHECKOUT_PASSWORD=,
```
NOTE: you may need to manually create an account with the log in credentials. <br/>
There are three sets of user credentials here to prevent shared test data or application state between tests.

3. Install dependencies:
```
npm install
```
4. Install Playwright browsers:
```
npx playwright install
```
## Running tests:
Run all tests:
```
npx playwright test
```
Running the tests (headed):
```
npx playwright test --headed
```
View the HTML report:
```
npx playwright show-report
```

## Project structure:
- `tests/` - Each integration test separated into individual `.spec` files
- playwright.config.ts - Playwright configuration
- tsconfig.json - Typescript configuration
- package.json - Project scripts and dependencies
	
## Scope:
- Focus on aspects of core user journey
- Prioritise tests on smaller integrations rather than full end-to-end flow to balance coverage with reliability
  
## Assumptions & limitations:
- The demoblaze site is a shared public demo and may behave inconsistently
- Tests are not designed to be run in parallel against the same account
- No API-level setup or teardown is used due to lack of backend access
