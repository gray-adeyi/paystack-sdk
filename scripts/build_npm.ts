// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt";

const NPM_ROOT_DIR = "./npm";
const NPMRC_PATH = NPM_ROOT_DIR + "/.npmrc";
const NPMRC_FILE_CONTENT = "@jsr:registry=https://npm.jsr.io";

await emptyDir(NPM_ROOT_DIR);

await Deno.writeTextFile(NPMRC_PATH, NPMRC_FILE_CONTENT);

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  test: false,
  package: {
    // package.json properties
    name: "@gray-adeyi/paystack-sdk",
    version: Deno.args[0],
    description: "A paystack client SDK for the javascript runtime.",
    author: "Gbenga Adeyi <adeyigbenga005@gmail.com>",
    license: "MIT",
    keywords: [
      "paystack",
      "node",
      "bun",
      "deno",
      "typescript",
    ],
    scripts: {
      postinstall: "echo '@jsr:registry=https://npm.jsr.io' >> ~/.npmrc"
    },
    dependencies: {
      "@std/fmt": "npm:@jsr/std__fmt@^1.0.3",
      axios: "^1.7.9",
      "lodash-es": "^4.17.21",
    },
    devDependencies: {
      "@std/assert": "npm:@jsr/std__assert@^1.0.9",
      "@std/dotenv": "npm:@jsr/std__dotenv@^0.225.3",
      "@std/testing": "npm:@jsr/std__testing@^1.0.6",
      "@types/lodash-es": "^4.17.12",
    },
    repository: {
      type: "git",
      url: "git+https://github.com/gray-adeyi/paystack-sdk.git",
    },
    bugs: {
      url: "https://github.com/gray-adeyi/paystack-sdk/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
