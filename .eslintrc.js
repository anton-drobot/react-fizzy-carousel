module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    settings: {
        react: {
            version: '16.8'
        }
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'no-async-promise-executor': ['error'],
        'no-await-in-loop': ['error'],
        'no-template-curly-in-string': ['error'],
        'array-callback-return': ['error'],
        'block-scoped-var': ['error'],
        curly: ['error', 'all'],
        'dot-location': ['error', 'property'],
        'dot-notation': ['error'],
        eqeqeq: ['error', 'always'],
        'guard-for-in': ['error'],
        'max-classes-per-file': ['error', 1],
        'no-alert': ['error'],
        'no-caller': ['error'],
        'no-console': ['error'],
        'no-div-regex': ['error'],
        'no-else-return': ['error', { allowElseIf: false }],
        'no-eval': ['error'],
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-extend-native': ['error'],
        'no-extra-bind': ['error'],
        'no-fallthrough': ['error'],
        'no-floating-decimal': ['error'],
        'no-implicit-coercion': ['error'],
        'no-implied-eval': ['error'],
        // 'no-invalid-this': ['error'], // an error occurs in the arrow functions in ts files
        'no-iterator': ['error'],
        'no-lone-blocks': ['error'],
        'no-loop-func': ['error'],
        'no-multi-spaces': ['error'],
        'no-multi-str': ['error'],
        'no-new-func': ['error'],
        'no-new-wrappers': ['error'],
        'no-octal-escape': ['error'],
        'no-proto': ['error'],
        'no-redeclare': ['error', { builtinGlobals: true }],
        'no-return-assign': ['error', 'always'],
        'no-return-await': ['error'],
        'no-script-url': ['error'],
        'no-self-assign': ['error'],
        'no-self-compare': ['error'],
        'no-sequences': ['error'],
        'no-throw-literal': ['error'],
        'no-unmodified-loop-condition': ['error'],
        'no-unused-expressions': 'off', // see @typescript-eslint/no-unused-expressions
        'no-unused-vars': 'off', // see @typescript-eslint/no-unused-vars
        'no-useless-call': ['error'],
        'no-useless-concat': ['error'],
        'no-useless-constructor': 'off', // see @typescript-eslint/no-useless-constructor
        'no-void': ['error'],
        'no-with': ['error'],
        radix: ['error', 'always'],
        'require-await': 'off', // see @typescript-eslint/require-await
        'wrap-iife': ['error', 'inside'],
        yoda: ['error'],
        'no-label-var': ['error'],
        'no-shadow': ['error', { hoist: 'all' }],
        'no-shadow-restricted-names': ['error'],
        'no-use-before-define': 'off',
        'no-path-concat': ['error'],

        /* Stylistic */
        'no-extra-parens': 'off', // see @typescript-eslint/no-extra-parens
        'no-extra-semi': 'off', // see @typescript-eslint/no-extra-semi

        /* ECMAScript 6 */
        'arrow-parens': ['error', 'always'],
        'arrow-spacing': ['error', { before: true, after: true }],
        //'generator-star-spacing': ['error', { before: true, after: false }],
        'no-duplicate-imports': ['error', { includeExports: true }],
        'no-useless-computed-key': ['error'],
        'no-useless-rename': ['error'],
        'no-var': ['error'],
        'object-shorthand': ['error', 'always'],
        'prefer-const': ['error'],
        'prefer-rest-params': ['error'],
        'prefer-spread': ['error'],
        'prefer-template': ['error'],
        'rest-spread-spacing': ['error', 'never'],
        'template-curly-spacing': ['error'],
        'yield-star-spacing': ['error', { before: true, after: false }],

        /* React */
        'react/boolean-prop-naming': ['error'],
        'react/button-has-type': ['error'],
        'react/default-props-match-prop-types': ['error'],
        'react/no-access-state-in-setstate': ['error'],
        'react/no-children-prop': ['error'],
        'react/no-danger-with-children': ['error'],
        'react/no-deprecated': ['error'],
        'react/no-direct-mutation-state': ['error'],
        'react/no-is-mounted': ['error'],
        'react/no-multi-comp': ['error', { ignoreStateless: false }],
        'react/no-find-dom-node': ['error'],
        'react/no-redundant-should-component-update': ['error'],
        'react/no-render-return-value': ['error'],
        'react/no-typos': ['error'],
        'react/no-string-refs': ['error'],
        'react/no-this-in-sfc': ['error'],
        'react/no-unknown-property': ['error'],
        'react/no-unsafe': ['error'],
        'react/no-unused-state': ['error'],
        'react/no-will-update-set-state': ['error', 'disallow-in-func'],
        'react/prefer-es6-class': ['error', 'always'],
        'react/prop-types': ['error'],
        'react/react-in-jsx-scope': ['error'],
        'react/require-render-return': ['error'],
        'react/self-closing-comp': ['error', { component: true, html: true }],
        'react/sort-comp': [
            'error',
            {
                order: [
                    'type-annotations',
                    'static-variables',
                    'static-methods',
                    'instance-variables',
                    'lifecycle',
                    '/^on.+$/',
                    '/^handle.+$/',
                    'everything-else',
                    '/^render.+$/',
                    'render'
                ]
            }
        ],
        'react/style-prop-object': ['error'],
        'react/void-dom-elements-no-children': ['error'],
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
        'react/jsx-closing-tag-location': ['error'],
        'react/jsx-curly-spacing': ['error', { when: 'never' }],
        'react/jsx-equals-spacing': ['error', 'never'],
        'react/jsx-first-prop-new-line': ['error', 'multiline'],
        'react/jsx-key': ['error'],
        'react/jsx-no-bind': ['error'],
        'react/jsx-no-duplicate-props': ['error'],
        'react/jsx-pascal-case': ['error'],
        'react/jsx-uses-react': ['error'],
        'react/jsx-uses-vars': ['error'],
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
        'react/jsx-tag-spacing': [
            'error',
            {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
                beforeClosing: 'never'
            }
        ],
        'react/jsx-wrap-multilines': [
            'error',
            {
                declaration: 'parens-new-line',
                assignment: 'parens-new-line',
                return: 'parens-new-line',
                arrow: 'parens-new-line',
                condition: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'parens-new-line'
            }
        ],

        /* Typescript */
        '@typescript-eslint/adjacent-overload-signatures': ['error'],
        '@typescript-eslint/array-type': ['error', { default: 'array-simple', readonly: 'array-simple' }],
        '@typescript-eslint/await-thenable': ['error'],
        '@typescript-eslint/camelcase': [
            'error',
            { properties: 'never', genericType: 'always', ignoreDestructuring: false }
        ],
        '@typescript-eslint/class-name-casing': ['error'],
        '@typescript-eslint/consistent-type-assertions': [
            'error',
            { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' }
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }
        ],
        '@typescript-eslint/interface-name-prefix': ['error', { prefixWithI: 'always' }],
        // '@typescript-eslint/no-extra-parens': ['error'],
        // "@typescript-eslint/no-extra-semi": ["error"],
        // '@typescript-eslint/no-floating-promises': ['error'],
        '@typescript-eslint/no-misused-new': ['error'],
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksVoidReturn: false
            }
        ],
        '@typescript-eslint/no-parameter-properties': ['error'],
        '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
        '@typescript-eslint/no-untyped-public-signature': ['error'],
        '@typescript-eslint/no-unused-expressions': ['error'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: false
            }
        ],
        // '@typescript-eslint/no-use-before-define': ['error', {"variables":true, "functions":false, "classes":true, "enums":true, "typedefs":true}],
        '@typescript-eslint/no-useless-constructor': ['error'],
        '@typescript-eslint/promise-function-async': [
            'error',
            {
                checkArrowFunctions: true,
                checkFunctionDeclarations: true,
                checkFunctionExpressions: true,
                checkMethodDeclarations: true
            }
        ],
        '@typescript-eslint/require-await': ['error'],
        '@typescript-eslint/restrict-plus-operands': ['error'],
        /*'@typescript-eslint/typedef': [
            'error',
            {
                arrayDestructuring: false,
                arrowParameter: true,
                parameter: true,
                propertyDeclaration: true
            }
        ],*/
        '@typescript-eslint/unified-signatures': ['error']
    }
};
