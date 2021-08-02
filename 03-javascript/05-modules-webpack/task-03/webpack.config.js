const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
module.exports = {
    entry: './src/index.js',
    optimization: {
        minimize: isProd //Update this to true or false
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};