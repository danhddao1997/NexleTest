module.exports = {
  preset: 'react-native',
  setupFiles: ['./jestSetupFile.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|react-native-encrypted-storage|@react-native-community|@react-navigation)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
