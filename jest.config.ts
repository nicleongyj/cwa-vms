import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest", // Use ts-jest to transpile TypeScript
    testEnvironment: "node", // Or 'jsdom' for browser tests
    transform: {
        "^.+\\.ts$": "ts-jest", // Tell Jest to use ts-jest for TypeScript files
    },
    moduleFileExtensions: ["ts", "js"], // Allow Jest to resolve .ts and .js files
    testMatch: ["**/*.test.ts"], // Tell Jest to find files that match the .test.ts pattern
};

export default config;
