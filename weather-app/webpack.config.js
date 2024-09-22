const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Подключаем плагин для копирования файлов
require('dotenv').config(); // Загружаем переменные окружения из .env файла

module.exports = {
  entry: './src/index.js', // Точка входа
  output: {
    path: path.resolve(__dirname, 'dist'), // Папка для вывода файлов сборки
    filename: 'bundle.js', // Имя собранного JS файла
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Обрабатываем все JS файлы
        exclude: /node_modules/, // Исключаем node_modules
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Правила для обработки изображений
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/, // Правила для обработки CSS файлов
        use: ['style-loader', 'css-loader'], // Загружаем и применяем стили
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Подключаем HTML шаблон
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/styles/styles.css', to: './' }, // Копируем styles.css в папку dist
        { from: './node_modules/leaflet/dist/leaflet.css', to: './' }, // Копируем leaflet.css в папку dist
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_WEATHER_API_KEY': JSON.stringify(process.env.REACT_APP_WEATHER_API_KEY), // Определяем API ключ для окружения
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Указываем папку для статики в Dev Server
    port: 3000, // Порт для разработки
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Какие расширения файлов можно не указывать при импортахю
  },
};