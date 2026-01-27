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
2. Install dependencies:
```
npm install
```
3. Install Playwright browsers:
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
