import styles from "./sections.module.css";
import clsx from "clsx";

const pages = [
  [
    "Attributes",
    "Read what an attribute compiles into to understand how it works",
    "/attributes",
    "bg-gta",
  ],
  [
    "Spread",
    "Read how does spread syntax works with Grim",
    "/spread",
    "bg-sunny",
  ],
  [
    "References",
    "Read about references and figure out how to use refs to nodes",
    "/refs",
    "bg-refs",
  ],
  ["Configuration", "Configure it to your liking", "/config", "bg-funny"],
  [
    "REPL",
    "Check how the compilation works online - by yourself",
    "/repl",
    "bg-repl",
  ],
];

export const section = (
  <div class={styles.section}>
    <div class={styles["section-header"]}>
      <h2>Features</h2>
      <p>Supports String mode, transforms JSX into static templates.</p>
    </div>
    <ul class={styles["tile-set"]}>
      {pages
        .map((page) => {
          /** @enableStringMode */
          return (
            <li>
              <a class={styles.tile} href={page[2]}>
                <div class={clsx(styles.image, styles[page[3]])} />
                <div class={styles.copy}>
                  <h3>{page[0]}</h3>
                  <p>{page[1]}</p>
                </div>
              </a>
            </li>
          );
        })
        .join("")}
    </ul>
  </div>
);
