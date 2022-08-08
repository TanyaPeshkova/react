const path = require('path');

module.exports = {
    mode: 'development', //development|production
    entry: {
        // administration: './app/src/administration/app.js',
        student: './app/src/student/app.js'
    },
    output: {
        path: path.join(__dirname, './app/public'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ["@babel/preset-react", { "runtime": "automatic" }]
                        ]
                    }
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.png|svg|jpg|gif$/,
                use: ["file-loader"],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.d.ts', '.tsx']
    }
}