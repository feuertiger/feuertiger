module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react', 'next/babel'],
    plugins: [
        [
            'styled-components',
            {
                ssr: true,
                displayName: true,
                preprocess: false
            }
        ],
        ['@babel/plugin-proposal-class-properties']
    ]
};
