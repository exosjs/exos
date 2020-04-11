module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    // Uses the recommended rules from @typescript-eslint
    "plugin:@typescript-eslint/recommended",
    // Disables ESLint rules that would conflict with prettier
    "prettier/@typescript-eslint",
    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
    // Make sure this is always the last configuration in the extends array.
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // e.g. "prettier/prettier": ["error", {"singleQuote": true, "parser": "flow"}]
  },
};
