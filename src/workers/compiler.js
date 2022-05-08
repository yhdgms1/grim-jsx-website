import { compileJSXPlugin } from "grim-jsx";
import { transformAsync } from "@artemis69/pony-babel-standalone";

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
          const { code: transformed } = await transformAsync(data.code, {
            plugins: [[compileJSXPlugin, { enableCommentOptions: true }]],
            comments: false,
            babelrc: false,
            browserslistConfigFile: false,
            ast: false,
            filename: "App.js",
            highlightCode: false,
          });

          self.postMessage({
            event: "RESULT",
            data: transformed,
          });
        } catch (error) {
          if (error instanceof Error) {
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
