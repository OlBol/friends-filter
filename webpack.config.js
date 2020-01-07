const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const SpritePlugin = require(`svg-sprite-loader/plugin`);

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
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
                plugins: ["@babel/plugin-syntax-dynamic-import"]
            }
        }, {
            test: /\.scss$/,
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
        },
        {
            test: /\.(png|jpe?g|gif|woff2?)$/i,
            loader: "file-loader",
            options: {
                name: "[hash].[ext]"
            }
        }
    ]},

    plugins: [
        new HTMLPlugin({
            title: 'Friends filter',
            template: './src/index.hbs'
        }),
        new MiniCssExtractPlugin({
            filename: './css/style.bundle.css'
        }),
        new SpritePlugin()
    ]
};
