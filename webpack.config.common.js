const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    target: 'web',

    entry: {
        polyfill: '@babel/polyfill',
        coreStyle: './src/styles/core.less',
        main: './src/index.jsx'
    },

    output: {
        path: path.resolve('./build'),
        filename: 'js/[name]-[hash].js',
        crossOriginLoading: 'anonymous'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/env', '@babel/react'],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-export-default-from',
                                '@babel/plugin-proposal-export-namespace-from'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,    // TODO add css after porting all the __old codes
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                paths: [
                                    path.resolve('./src'),
                                    path.resolve('./node_modules')
                                ]
                            },
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(csv|jpg|jpeg|png|eot|ttf|woff|woff2|pbf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[name]-[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        modules: ['node_modules', './src'],
        extensions: ['.js', '.jsx']
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html')
        }),
        new MiniCssExtractPlugin({ filename: 'css/[name]-[hash].css' }),
        new CleanWebpackPlugin()
    ]
};
