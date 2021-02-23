module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb',
    'prettier',
    'prettier/react',
    'eslint-config-prettier',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'babel-eslint',
  plugins: ['import', 'prettier', 'react-hooks'],
  rules: {
    'import/no-cycle': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off',
    'linebreak-style': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
      },
    ],
  },
  globals: {
    fetch: false,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      webpack: {
        config: './webpack.junk.js',
      },
    },
  },
};
