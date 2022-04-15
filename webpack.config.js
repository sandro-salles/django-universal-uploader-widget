const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => ({
    entry: {
        widget: [
            './src/UniversalUploaderWidget.ts',
            './src/UniversalUploaderWidget.scss',
        ],
        inline: [
            './src/UniversalUploaderInline.ts',
            './src/UniversalUploaderInline.scss',
        ],
    },
    mode: env.production ? "production" : "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
    },
    output: {
        filename: env.production ? 'universal-uploader-[name].min.js' : 'universal-uploader-[name].js',
        path: path.resolve(__dirname, 'universal_uploader_widget', 'static', 'admin', 'js'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `../css/universal-uploader-[name]${env.production ? '.min' : ''}.css`,
        }),
    ],    
});
