import clsx from "clsx";
import { CodeJar } from "codejar";

import "prism-theme-one-light-dark/prism-onelight.css";

import styles from "./code.module.css";

import worker from "../workers/compiler.js?worker";

const { highlight, languages } = Prism;

/**
 * @param {{ code: string; readonly: boolean; fullscreen?: boolean }} props
 */
export const Code = (props = {}) => {
  /** @type {HTMLPreElement} */
  let node;

  /** @type {HTMLPreElement} */
  let output;

  const dom = (
    <div class={clsx(styles.container, props.fullscreen && styles.fullscreen)}>
      <div class={clsx(styles.title, styles.input)}>Input</div>
      <div class={clsx(styles.title, styles.output)}>Output</div>
      <pre
        translate="no"
        ref={node}
        class={clsx("language-js", styles.pre, styles.input)}
      />
      <pre
        translate="no"
        ref={output}
        class={clsx("language-js", styles.pre, styles.output)}
      >
        Loading...
      </pre>
    </div>
  );

  let destroy = undefined;

  const compiler = new worker();

  compiler.addEventListener("message", ({ data }) => {
    switch (data.event) {
      case "RESULT": {
        const highlighted = highlight(data.data, languages.js, "js");

        output.innerHTML = highlighted;
        break;
      }
      case "ERROR": {
        output.textContent = data.data;
        break;
      }
      case "EMPTY": {
        output.textContent = "";
        break;
      }
    }
  });

  if (!props.readonly) {
    const jar = CodeJar(node, (el) => {
      const highlighted = highlight(el.textContent, languages.js, "js");

      el.innerHTML = highlighted;
    });

    destroy = jar.destroy;

    jar.onUpdate((code) => {
      compiler.postMessage({
        event: "COMPILE",
        code: code,
      });
    });

    jar.updateCode(props.code);

    const initial = () => {
      compiler.postMessage({
        event: "COMPILE",
        code: jar.toString(),
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      requestIdleCallback(initial);
    } else {
      setTimeout(initial, 350);
    }
  } else {
    node.innerHTML = highlight(props.code, languages.js, "js");

    /**
     * It is a read-only mode, but compiler should work anyways
     */
    compiler.postMessage({
      event: "COMPILE",
      code: props.code,
    });
  }

  return { dom, d: destroy };
};
