const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: path.resolve(__dirname, 'assets')
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
    }
}