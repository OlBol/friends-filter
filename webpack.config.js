const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + 'dist',
        filename: 'index.js'
    },

    devServer: {
        overlay: true
    },

    devtool: 'source-map',

    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader',
                'postcss-loader'
            ]
        },
        {
            test: /\.hbs/,
            loader: 'handlebars-loader'
        }]
    },

    plugins: [
        new HTMLPlugin({
            title: 'Friends filter',
            template: './src/index.hbs'
        }),
        new MiniCssExtractPlugin('styles.css')
    ]
};
