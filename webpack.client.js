const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    optimization: {
        usedExports: true
    },
    entry: "./src/client/client.js",
    output: {
        filename: "client_bundle.js",
        path: path.resolve(__dirname, "build/public/"),
        publicPath: "/build/public/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules"
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader", "sass-loader"]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "app.css"
        })
    ]
};
