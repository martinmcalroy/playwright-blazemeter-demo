Readme:

# Playwright Test Suite - Technical Task

A small suite of frontend functional tests built with Playwright to validate core user behaviour for the Blazemeter demo site: https://www.demoblaze.com/index.html

## Tech stack:
- Playwright
- Node
- Npm
- Typescript
	
## Setup:
1. Clone the repository
2. Add a `.env` file to the repo root. Add the below vairables with whatever values you like: 
```
SIGN_UP_USERNAME=,
SIGN_UP_PASSWORD=,
LOG_IN_USERNAME=,
LOG_IN_PASSWORD=,
```
NOTE: you may need to manually create an account with the log in credentials. <br/>

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
