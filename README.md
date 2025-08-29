# React UI Components Library

This repository contains two reusable, production-ready React UI components built with TypeScript and styled using TailwindCSS:

- **InputField**: A versatile input component with multiple variants, sizes, states, and accessibility support.
- **DataTable**: A flexible data table component with sorting, row selection, loading and empty states.

## Features

- React functional components with hooks
- Strict TypeScript typing
- TailwindCSS for styling with light & dark theme support
- Storybook documentation with interactive stories showcasing all states and variants
- Basic accessibility with ARIA attributes
- Unit tests using Jest and React Testing Library
- Scalable folder structure and clean code patterns

## Folder Structure

```
src/
  components/
    InputField/
      InputField.tsx
      InputField.stories.tsx
      InputField.test.tsx
      index.ts
    DataTable/
      DataTable.tsx
      DataTable.stories.tsx
      DataTable.test.tsx
      types.ts
      index.ts
  index.css
  test/
    setup.ts
.storybook/
  main.ts
  preview.ts
vite.config.ts
tailwind.config.js
postcss.config.js
jest.config.js
tsconfig.json
package.json
README.md
```

## Getting Started

### Prerequisites

- Node.js (>=16.x)
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Running Storybook

```bash
npm run storybook
# or
yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the Storybook UI.

### Building Storybook for Deployment

```bash
npm run build-storybook
# or
yarn build-storybook
```

### Running Tests

```bash
npm test
# or
yarn test
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## Approach

- Components are built as fully typed, functional React components with hooks.
- TailwindCSS utility classes are used for styling with variants and sizes.
- Accessibility is considered with proper ARIA attributes and keyboard support.
- Storybook stories cover all variants, states, and edge cases.
- Unit tests cover critical logic such as validation, sorting, and selection.
- Folder structure is modular and scalable for easy maintenance and extension.

## Deployment

- Storybook can be deployed to Chromatic, Vercel, or any static hosting provider.
- Components can be published as an npm package or integrated into other projects.

## License

MIT License

---

Created by Your Name
