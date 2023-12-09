module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sss|styl)$': '<rootDir>/styleMock.js',
    },
  };