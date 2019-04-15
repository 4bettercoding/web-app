const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
    target: "node",
    mode: "development",
    externals: [webpackNodeExternals()],
    entry: "./src/server/server.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/build"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules"
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "css-loader/locals"
                    }
                ]
            },
            {
                test: /\.scss$/,
                loader: "null-loader"
            },
            {
                test: /\.(ttf|eot|otf|svg|png)$/,
                loader: "file-loader?emitFile=false"
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url-loader?emitFile=false"
            }
        ]
    }
};
