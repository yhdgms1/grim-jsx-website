import clsx from "clsx";
import styles from "./highlight.module.css";

const { highlight, languages } = Prism;

/**
 * @param {{ code: string; lang: string }} param0
 */
export const Highlight = ({ code, lang }) => {
  const parent = (
    <pre translate="no" class={clsx("language-" + lang, styles.container)} />
  );

  const highlighted = highlight(code, languages[lang], lang);

  parent.innerHTML = highlighted;

  return parent;
};
