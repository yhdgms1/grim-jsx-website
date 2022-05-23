import { Article, Highlight } from "../components";
import { component } from "../lib";

const image = `\
radial-gradient(at 0 100%, #fa8bff 40%, transparent 75%),
radial-gradient(at 40% 70%, #2bd2ff 40%, transparent 100%),
radial-gradient(at 100% 100%, #2bff88 10%, transparent 100%)`;

export default () => {
  /** @type {HTMLDivElement[]} */
  const places = [];

  const dom = Article({
    image: image,
    title: "Installation",
    article: (
      <div>
        <h2>Installation</h2>
        <p>Installation is simple.</p>
        <ul>
          <li>
            Install{" "}
            <a href="https://www.npmjs.com/package/grim-jsx" target="_blank">
              grim-jsx
            </a>{" "}
            package
          </li>
          <li>import `compileJSXPlugin` from 'grim-jsx'</li>
          <li>Pass it to your Babel Plugins</li>
        </ul>
        <div ref={places[0]} />
        <p>That's it.</p>
      </div>
    ),
  });

  const { d: d } = component(places[0], Highlight, {
    code: `\
import { compileJSXPlugin, defineConfig } from "grim-jsx";
import { transformSync } from "@babel/core";

const config = defineConfig({
  // You will see suggestions here
  enableCommentOptions: true,
});

const result = transformSync("code", {
  plugins: [[compileJSXPlugin, config]],
});`,
    lang: "js",
  });

  return { dom, d };
};
