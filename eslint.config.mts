// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

export default [
  // 🔹 Archivos a ignorar (reemplaza lo que tenías en .eslintignore)
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
    ],
  },

  // 🔹 Config base JS + TS para todo el repo
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 🔹 Reglas para la API Nest (apps/api)
  {
    files: ['apps/api/**/*.{ts,js}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // Por si acaso se cuela algo de React, lo apagamos aquí
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },

  // 🔹 Reglas para la app React (apps/web)
  {
    files: ['apps/web/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      // Si usas el JSX nuevo, esto puede ir en 'off'
      'react/react-in-jsx-scope': 'off',
    },
  },
];
