// import type { Config } from "prismic-ts-codegen";

const config = {
  output: "./types.generated.ts",
  models: ["./customtypes/**/index.json", "./slices/**/model.json"],
};

export default config;