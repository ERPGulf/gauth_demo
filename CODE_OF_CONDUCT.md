# Code of Conduct for React TypeScript Project

## 1. **Code Structure and Clean Code**

- **Component Organization**:

  - Separate components by their logical grouping (e.g., `components`, `hooks`, `pages`, `layouts`).
  - Large components should be broken down into smaller, reusable components.

- **File Naming Conventions**:

  - Use **PascalCase** for React components (`MyComponent.tsx`).
  - Use **camelCase** for functions, variables, and hooks (`myFunction.ts`).
  - Use **snake_case** for CSS or Tailwind files (`my_style.css`).

- **Keep Files Small**:
  - Keep components focused on a single responsibility.
  - Aim for under 200 lines per file when possible.

## 2. **TypeScript Best Practices**

- **Always Use Type Annotations**:
  - Use explicit types for props, state, and return values of functions.
  - Avoid using `any` unless absolutely necessary. Prefer `unknown` or proper types.
- **Use TypeScript Interfaces and Types**:

  - Prefer `interface` for object shapes, especially for component props.
  - Use `type` for complex type unions and for cases where `interface` is not suitable.

- **Avoid Magic Numbers and Strings**:
  - Define constants in a separate `constants.ts` file or within the component file.
  - Use enums for predefined sets of options.

## 3. **React Best Practices**

- **Functional Components**:

  - Always use functional components with React Hooks instead of class components.

- **Hooks**:

  - Use **custom hooks** to extract and share logic between components.
  - Ensure hook names start with "use" (e.g., `useFetchData`, `useAuth`).

- **Memoization**:

  - Use `useMemo` and `useCallback` to optimize performance when necessary, but avoid over-optimizing prematurely.

- **Error Boundaries**:
  - Wrap critical components with error boundaries to handle UI failures gracefully.

## 4. **State Management**

- **Avoid Prop Drilling**:

  - Use **React Context** or **Redux** when state needs to be shared across multiple components.
  - Use **useState** and **useReducer** for local state management.

- **Redux Toolkit** (if applicable):
  - Use slices and follow the `createSlice` pattern for organizing Redux logic.
  - Use `useSelector` and `useDispatch` hooks to interact with the store.

## 5. **Code Style and Formatting**

- **Consistent Code Formatting**:

  - Use Prettier for consistent code formatting.
  - Set up **ESLint** with rules for TypeScript, React, and accessibility standards.

- **Indentation and Spacing**:

  - Use 2 spaces for indentation (not tabs).
  - Ensure consistent spacing around braces, parentheses, and array brackets.

- **Avoid Inline Styles**:
  - Prefer using Tailwind CSS or CSS modules for styling instead of inline styles.

## 6. **Testing**

- **Unit Testing**:
  - Write unit tests for all core components and utility functions using **Jest** and **React Testing Library**.
- **End-to-End Testing**:

  - For critical user flows, use **Cypress** or another end-to-end testing tool.

- **Test Coverage**:
  - Ensure that each component is covered by tests to an acceptable percentage.

## 7. **Code Reviews and Pull Requests**

- **Pull Request Guidelines**:

  - Keep pull requests small and focused on one feature or bugfix.
  - Include a meaningful title and description.

- **Code Reviews**:
  - Review code for readability, performance, and adherence to the code of conduct.
  - Provide constructive feedback and be respectful in communication.

## 8. **Git and Branching**

- **Commit Messages**:

  - Use meaningful and concise commit messages (e.g., `feat: add user authentication flow`).
  - Follow the **Conventional Commits** standard (e.g., `fix`, `feat`, `chore`).

- **Branching Strategy**:

  - Use a branching strategy like **Git Flow** or **GitHub Flow**.
  - Always create feature branches for new features or bug fixes (`feature/feature-name`, `fix/bug-name`).

- **Pull Request Merging**:
  - Ensure code is reviewed and all checks pass before merging into `main` or `develop`.

## 9. **Collaboration and Communication**

- **Documentation**:

  - Ensure proper documentation for functions, components, hooks, and APIs.
  - Use **JSDoc** style comments if necessary for explaining complex logic.

- **Team Communication**:
  - Use **GitHub Issues** or a project management tool (like Trello or Jira) to track tasks and bugs.
  - Ensure everyone is on the same page about project goals and development status.

## 10. **Security**

- **Secure Code Practices**:

  - Never commit sensitive information (API keys, tokens) into the repository.
  - Use environment variables (`.env`) for sensitive configuration.

- **Data Validation**:
  - Validate data coming from external APIs or forms to avoid security risks.
