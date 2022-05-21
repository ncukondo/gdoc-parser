module.exports = {
    "env": {
        "browser": true,
        "es2022": true
    },
    "extends": [
        "prettier", // prettierとeslintとの衝突回避
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:import/warnings"
        ],
    "globals": {
        "Utilities":false,
        "DocumentApp":false,
        "GoogleAppsScript":false
    },
    "plugins": [
        "unused-imports",
        "@typescript-eslint",
        'import'
    ],
    "settings": {
        "import/resolver": {
            "typescript": {
                "project": "./tsconfig.json"
            }
        }
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module",
        "project": "./tsconfig.json" 
    },
    "rules": {
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "warn",
        "import/extensions": "off",
        "import/prefer-default-export":"off"
    }
}
