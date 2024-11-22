import { defineConfig } from 'eslint-config';

export default defineConfig({
  parser: '@babel/eslint-parser', // Sử dụng Babel parser để xử lý JSX
  extends: [
    'eslint:recommended', // Các quy tắc lint cơ bản
    'plugin:react/recommended', // Quy tắc lint cho React
  ],
  parserOptions: {
    ecmaVersion: 2020, // Phiên bản ECMAScript
    sourceType: 'module', // Cho phép sử dụng module
    ecmaFeatures: {
      jsx: true, // Cho phép JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tự động phát hiện phiên bản React
    },
  },
});
