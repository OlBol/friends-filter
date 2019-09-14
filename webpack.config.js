const HTMLPlugin = require('html-webpack-plugin');

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
    plugins: [
        new HTMLPlugin({
            template: './src/index.hbs'
        })
    ]
};
