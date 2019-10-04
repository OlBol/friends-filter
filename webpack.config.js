const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: "./js/bundle.js"
    },

    devServer: {
        overlay: true
    },

    devtool: 'source-map',

    mode: "production",

    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
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
        new MiniCssExtractPlugin({
            filename: "./css/style.bundle.css"
        })
    ]
};
