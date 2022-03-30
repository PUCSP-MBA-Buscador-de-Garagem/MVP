module.exports = {
	clearMocks: true,
	preset: 'ts-jest',
	projects: ['<rootDir>/packages/**/jest.config.js'],
	testEnviroment: 'node',
	testMatch: ['*.spec.ts', '*.spec.tsx']
}
