const merge = require('lodash.merge');

const mergeconfig = (a, b) =>
    merge(a, b, (objValue, srcValue) => {
        if (Array.isArray(objValue)) {
            console.log(objValue.concat(srcValue));
            return objValue.concat(srcValue);
        }
    });

module.exports = ({ config }) => {
    const withCustom = mergeconfig(config, {
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            alias: {
                '@feuertiger/ocr': require.resolve('@feuertiger/ocr'),
                '@feuertiger/schema-graphql': require.resolve(
                    '@feuertiger/schema-graphql'
                )
            }
        },
        node: {
            fs: 'empty',
            child_process: 'empty',
            net: 'empty',
            tls: 'empty'
        }
    });
    withCustom.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
            presets: [require.resolve('babel-preset-react-app')]
        }
    });
    return withCustom;
};
