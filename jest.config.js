/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
	projects: ['<rootDir>/packages/**/jest.config.js'],
	testMatch: ['*.spec.ts', '*.spec.tsx']
};
