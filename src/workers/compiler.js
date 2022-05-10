import { compileJSXPlugin } from "grim-jsx";
import { transformSync } from "babel-standalone";

self.addEventListener("message", ({ data }) => {
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
          let marker = false;
          let timeout = setTimeout(() => {
            /**
             * Maybe I just removed throw somewhere in babel or something...
             *
             * But I'm not sure
             *
             * What I know is changing terser to esbuild helps to fix it
             * Sadly, with esbuild it weights 100kb more
             */
            if (marker === false) {
              throw new Error("Compilation is taking too long");
            }
            marker = true;
          }, 400);

          const { code: transformed } = transformSync(data.code, {
            plugins: [[compileJSXPlugin, { enableCommentOptions: true }]],
            comments: false,
            babelrc: false,
            browserslistConfigFile: false,
            ast: false,
            filename: "app.js",
            highlightCode: false,
          });

          if (!marker) {
            clearTimeout(timeout);
          } else {
            return;
          }

          marker = true;

          self.postMessage({
            event: "RESULT",
            data: transformed,
          });
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);

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
