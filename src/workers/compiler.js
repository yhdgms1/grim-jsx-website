import { compileJSXPlugin, defineConfig } from "grim-jsx";
import { transformAsync } from "babel-standalone";

self.addEventListener("message", async ({ data }) => {
  const { event } = data;

  switch (event) {
    case "COMPILE": {
      if (data.code === "") {
        self.postMessage({
          event: "EMPTY",
          data: "",
        });
      } else {
        try {
          const options = defineConfig({ enableCommentOptions: true });

          const firstLine = data.code.split("\n")[0];

          if (firstLine.includes("#inlineRuntime")) {
            options.inlineRuntime = true;
          }

          if (firstLine.includes("#enableStringMode")) {
            options.enableStringMode = true;
          }

          const { code: transformed } = await transformAsync(data.code, {
            plugins: [[compileJSXPlugin, options]],
            comments: false,
            babelrc: false,
            browserslistConfigFile: false,
            ast: false,
            filename: "app.js",
            highlightCode: false,
          });

          self.postMessage({
            event: "RESULT",
            data: transformed,
          });
        } catch (error) {
          if (error instanceof Error) {
            console.warn(error.message);

            self.postMessage({
              event: "ERROR",
              data: error.message,
            });
          } else {
            self.postMessage({
              event: "ERROR",
              data: String(error),
            });
          }
        }
      }

      break;
    }
  }
});

export {};
