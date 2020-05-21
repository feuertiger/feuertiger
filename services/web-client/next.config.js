const merge = require('lodash.merge');
const { getFirebaseAppSecrets } = require('@feuertiger/tools');
const withTM = require('next-transpile-modules');

module.exports = withTM({
    transpileModules: ['@feuertiger/ocr', '@feuertiger/web-components'],
    webpack: (config) =>
        merge(
            {
                node: {
                    fs: 'empty',
                    child_process: 'empty',
                    net: 'empty',
                    tls: 'empty'
                }
            },
            config
        ),
    publicRuntimeConfig: {
        tokens: getFirebaseAppSecrets()
    },
    distDir: './dist'
});
