const path = require('path');

module.exports = {
    mode: 'development',  // 'development', 'production', 'none' を選ぶ
    entry: './src/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {modules: false}]]
                    }
                }
            }
        ]
    }
};