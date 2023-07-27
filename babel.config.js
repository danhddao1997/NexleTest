module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@rtk': './src/rtk',
          '@screens': './src/screens',
          '@ts': './src/ts',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
