export default [
  {
    files: ["**/*.js", "**/*.ts"],
    ignores: ["node_modules/**"],
    languageOptions: {
      ecmaVersion: 'latest'
    },
      rules: {
          semi: "error",
          "prefer-const": "error",
          "max-len": ["error", { code: 180 }],
          "require-jsdoc": "off",
          "new-cap": "off",
      }
  }
];