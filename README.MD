# Project Description

This is a testing automation project for the technical interview at BEON.tech.

## Prerequisites

The user requires to have node.js installed, you can download from the [official website.](https://nodejs.org/en/download/current)

## Installation instructions

1. Clone this repository.
2. Open a command line terminal on the directory where you cloned this project and run `npm install` to install all the project dependencies.

## Execution commands

To execuce the playwright tests we need to run the following on the command line:

```bash
npx playwright test --project=e2e
```

The command above will run all the test cases, and we can change the project name based on the tests that we want to execute. This framework includes three different projects that can be selected by changing the value of the `--project` flag:

- **e2e** - This project will run all test cases.
- **ui** - This project will run only UI test cases.
- **api** - This project will run only API cases.

### API

The full command for executing API tests is

```bash
npx playwright test --project=api
```

### UI

The full command for executing API tests is

```bash
npx playwright test --project=ui
```

#### Headless vs UI

By deafult, playwright runs all the UI test cases in headless mode. If you wish to see the browser window during execution, you can add the `--headed` flag to the command:

```bash
npx playwright test --project=ui --headed
```

There is also the playwright UI mode that can be very usefull for debugging purposes. To open the UI mode we use the `--ui` flag to the command:

```bash
npx playwright test --project=ui --ui
```

## Framework architecture

### Design Pattern

This framework was designed by following a Page Object Model, this means that every Page has a Page class that contains the locators and common methods, found in `/pages/`. The same applies to the API endpoints whose classses are located in `/api/`.

This approach allows for a cleaner writing of test cases (found in `/tests` ) and making the project escalable, reusable and easier to mantain.

### Custom Fixtures

All the page and api clases are being used in a custom playwright fixture (found in `/fixtures/base.ts`), this allows every test case to use all these clases without having to create an instance of each class everytime.

For more information on this approach please visit the [official playwright documentation](https://playwright.dev/docs/test-fixtures).

### Environment variables

All the sensitive information is located in the `.env` file (found in `/config/.env`). These includes things like user credentials and base URL's that could change between different environments.

## Reporting

This Project automatically generates an html report after each run. To open the report of the latest execution run the command:

```bash
npx playwright show-report
```

# Simulated Jira Ticket

## [UI] - Inventory - Wrong product images

### Description

The inventory page is showing the wrong product images

### Steps to Reproduce

1. Go to https://www.saucedemo.com/
2. Login with the use name: problem_user
3. Navigate to the inventory page.

### Expected Results

- Each product should load its respective image.

### Actual Results

- All Products are showing the same image.
- The image seems to be a stock photo of a dog.

Severity = High,
Priority=1
