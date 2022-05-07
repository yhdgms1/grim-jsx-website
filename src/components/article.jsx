import styles from "./article.module.css";

/**
 * @param {{ article: string; title: string; image: string; backgroundColor?: string; color?: string; }} props
 */
const Article = (props) => {
  const { article, title, image, color, backgroundColor } = props;

  /** @type {HTMLDivElement} */
  let el;

  const container = (
    <div class={styles.container}>
      <header
        style={{
          "--image": image,
          "--bg-color": backgroundColor ?? "transparent",
          "--color": color ?? "rgb(31, 31, 31)",
        }}
        class={styles.header}
      >
        <div class={styles.wrapper}>
          <h1 translate="no" class={styles.title}>
            {title}
          </h1>
        </div>
      </header>
      <div class={styles.article} ref={el} />
    </div>
  );

  el.appendChild(article);

  return container;
};

export { Article };
