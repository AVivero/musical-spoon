# Running Storybook and Tests

To run Storybook and tests, follow these steps:

1. **Install and run with applicable node version**:
   ```bash
   nvm use
   ```

2. **Install dependencies**:
   Make sure you have all the necessary dependencies installed. Run the following command in the root of your project:
   ```bash
   npm install
   ```

3. **Running Storybook**:
   Storybook is a great tool for developing and showcasing UI components in isolation. To start Storybook, use the following command:
   ```bash
   npm run storybook
   ```
   This will start the Storybook server and you can view the stories for the Modal component in your browser.

4. **Running Tests**:
   To run the tests for the Modal component, use the following command:
   ```bash
   npm test
   ```
   This will execute all the tests written for the Modal component using Vitest and React Testing Library.

Please refer to the [Docs.md](./Docs.md) file.

---


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
