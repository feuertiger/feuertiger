const merge = require('lodash.merge');
const { getFirebaseAppSecrets } = require('@feuertiger/tools');
const withTM = require('next-transpile-modules');

module.exports = withTM({
    transpileModules: [
        '@feuertiger/schema-graphql',
        '@feuertiger/ocr',
        '@feuertiger/web-components'
    ],
    webpack: (config) => {
        config.module.rules.push({
            test: /\.test.tsx$/,
            loader: 'ignore-loader'
        });
        return merge(
            {
                node: {
                    fs: 'empty',
                    child_process: 'empty',
                    net: 'empty',
                    tls: 'empty'
                }
            },
            config
        );
    },
    publicRuntimeConfig: {
        tokens: getFirebaseAppSecrets()
    },
    distDir: './dist'
});
