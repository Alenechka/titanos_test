
# TITANOS_TEST

This project is used for test automation of the TitanOS application for Smart TV.

## Technologies Used

- **TypeScript**: For writing type-safe test scripts.
- **WebDriverIO**: For browser automation.
- **Allure Reporter**: For generating test reports.
- **ESLint**: For code linting.
- **Husky**: For Git hooks.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or above)
- npm (v6 or above)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/TITANOS_TEST.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running Tests

To run the tests, use the following command:

```bash
npx wdio run wdio.conf.ts --baseUrl URL
```

Replace `URL` with the base URL of the TitanOS application.

### Generating Reports

To generate and view the test reports, use the following command:

```bash
npx allure serve allure-results
```

This will start a local server and open the Allure report in your default web browser.

### Linting and Pre-commit Hooks

This project uses ESLint for code linting and Husky for Git hooks. ESLint ensures that your code adheres to a consistent style, and Husky runs linting checks before each commit to prevent committing code with linting errors.

### Project Structure

- `test/pageobject`: Contains the source code for the test scripts.
- `test/specs`: Contains the test specifications and setup files.
- `wdio.conf.ts`: The WebDriverIO configuration file.
- `.eslintrc.json`: The ESLint configuration file.
- `allure-results/`: Directory where Allure stores the test results.
