const commonConfig = {
  preset: 'ts-jest',
  verbose: false,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "@/(.*)": "<rootDir>/$1",
  },
  transform: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/file-transformer.js"
  }
}

module.exports = {
  projects: [
    {
      ...commonConfig,
      displayName: "react",
      testEnvironment: 'jsdom',
      testMatch: [
        "<rootDir>/**/front/**/*.+(test|spec).{ts,tsx}",
        "<rootDir>/**/shared/**/*.+(test|spec).{ts,tsx}"
      ],
      setupFilesAfterEnv: [
        "<rootDir>/test/setup-test-env.ts"
      ]
    },
    {
      ...commonConfig,
      displayName: "node",
      testEnvironment: 'node',
      testMatch: ["<rootDir>/**/server/**/*.+(test|spec).{ts,tsx}"]
    }
  ]
}