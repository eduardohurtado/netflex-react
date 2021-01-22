module.exports = {
  "coveragePathIgnorePatterns": ["<rootDir>/node_modules/", "<rootDir>/build/"],
  "roots": ["<rootDir>/src"],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/test/__mocks__/fileMock.ts",
    "\\.(css|sass|scss)$": "<rootDir>/src/test/__mocks__/styleMock.ts",
  },
};
