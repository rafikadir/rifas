// jest.config.js
module.exports = {
	testEnvironment: 'node',
  };
  
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

const config: Config = {
	// The test environment that will be used for testing
	testEnvironment: "jsdom",
	// A list of paths to modules that run some code to configure or set up the testing framework before each test
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	preset: "ts-jest",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1",
	},
};

export default createJestConfig(config);
