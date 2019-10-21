const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: './bundle.js'
    },

    devServer: {
        overlay: true
    },

    devtool: 'source-map',

    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader', 'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({
                                overrideBrowserslist:['last 4 version']
                            })
                        ],
                        sourceMap: true
                    }
                },
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
            filename: './css/style.bundle.css'
        })
    ]
};
