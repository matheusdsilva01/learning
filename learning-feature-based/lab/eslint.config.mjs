import tsParser from '@typescript-eslint/parser'
import boundaries from 'eslint-plugin-boundaries'
import { strict } from 'eslint-plugin-boundaries/config'

export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      sourceType: 'module',
    },
    plugins: { boundaries },
    settings: {
      ...strict.settings,
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app', partialMatch: false },
        { type: 'feature', pattern: 'src/features/*', capture: ['slice'], partialMatch: false },
        { type: 'entity', pattern: 'src/entities/*', capture: ['slice'], partialMatch: false },
        { type: 'shared', pattern: 'src/shared', partialMatch: false },
      ],
      'boundaries/flag-as-external': {
        unresolvableAlias: false,
        inNodeModules: true,
        outsideRootPath: false,
        customSourcePatterns: [],
      },
      'import/resolver': {
        typescript: { project: './tsconfig.json', alwaysTryTypes: true },
      },
    },
    rules: {
      ...strict.rules,
      'boundaries/dependencies': ['error', {
        default: 'disallow',
        checkUnknownLocals: true,
        checkInternals: false,
        policies: [
          {
            from: { element: { type: 'app' } },
            allow: { to: [
              { element: { type: 'feature', fileInternalPath: 'index.{ts,tsx}' } },
              { element: { type: 'feature', fileInternalPath: 'index.server.ts' } },
              { element: { type: 'entity', fileInternalPath: 'index.{ts,tsx}' } },
              { element: { type: 'shared' } },
            ] },
          },
          {
            from: { element: { type: 'feature' } },
            allow: { to: [
              { element: { type: 'entity', fileInternalPath: 'index.{ts,tsx}' } },
              { element: { type: 'shared' } },
            ] },
          },
          {
            from: { element: { type: 'entity' } },
            allow: { to: [{ element: { type: 'shared' } }] },
          },
        ],
      }],
    },
  },
]
