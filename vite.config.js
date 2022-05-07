import { defineConfig } from "vite";
import { im } from "@artemis69/im";
import { compileJSXPlugin } from "grim-jsx";
import babel from "vite-plugin-babel";

let babelPlugin = im(babel);

export default defineConfig({
  plugins: [
    babelPlugin({
      babelConfig: {
        plugins: [[compileJSXPlugin, { enableCommentOptions: true }]],
      },
    }),
  ],
  esbuild: {
    jsx: "preserve",
    legalComments: "none",
  },
  build: {
    polyfillModulePreload: false,
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
    target: ["es2016"],
  },
  define: {
    "process.env.BABEL_TYPES_8_BREAKING": "true",
    "process.env.NODE_DEBUG": "false",
  },
});
