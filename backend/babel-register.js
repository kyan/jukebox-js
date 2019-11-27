/** @see https://babeljs.io/docs/en/next/babel-register.html#specifying-options */
require('@babel/register')({
  extensions: [
    '.ts', // TypeScript
    '.es6', '.es', '.jsx', '.js', '.mjs' // Default extensions
  ]
})
