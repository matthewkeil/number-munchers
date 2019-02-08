const path = require('path');

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
    mode: 'production',
    entry: './src/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: path.resolve(__dirname, '/')
    },
    resolve: {
        extensions: ['.js', '.css'],
        modules: [
            'node_modules', 
            path.resolve(__dirname, "src")
        ],
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    devtool: ENV === 'production' ? 'none' : 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'assets'),
        port: 3000
    }
}