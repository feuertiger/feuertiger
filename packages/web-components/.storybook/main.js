module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    babel: async options => {
        options.presets.push('next/babel');
        options.plugins.push([
            'styled-components',
            {
                ssr: true,
                displayName: true,
                preprocess: false
            }
        ]);
        return options;
    },
    webpackFinal: async config => {
        config.resolve.extensions.push('.js', '.ts', '.tsx');
        config.resolve.alias = {
            '@feuertiger/ocr': require.resolve('@feuertiger/ocr'),
            '@feuertiger/schema-graphql': require.resolve(
                '@feuertiger/schema-graphql'
            )
        };
        config.node = {
            fs: 'empty',
            child_process: 'empty',
            net: 'empty',
            tls: 'empty'
        };
        return config;
    }
};
