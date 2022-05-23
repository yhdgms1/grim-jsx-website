import styles from "./sections.module.css";
import clsx from "clsx";

const features = [
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
  [
    "Special Attributes",
    "What are special attributes",
    "/special-attributes",
    "bg-sa",
  ],
  ["Configuration", "Configure it to your liking", "/config", "bg-funny"],
];

const ready = [
  [
    "REPL",
    "Check how the compilation works online - by yourself",
    "/repl",
    "bg-repl",
  ],
  [
    "Installation",
    "Look how simple installation is",
    "/installation",
    "bg-installation",
  ],
];

const Card = ([title, description, link, background]) => {
  /** @enableStringMode */
  return (
    <li>
      <a class={styles.tile} href={link}>
        <div class={clsx(styles.image, styles[background])} />
        <div class={styles.copy}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </a>
    </li>
  );
};

export const section = (
  <div class={styles.section}>
    <div class={styles["section-header"]}>
      <h2>Features</h2>
      <p>Supports String mode, transforms JSX into static templates.</p>
    </div>
    <ul class={styles["tile-set"]}>
      {features.map((page) => Card(page)).join("")}
    </ul>
    <div class={styles["section-header"]}>
      <h2>Ready to go</h2>
      <p>Install it or try in online REPL</p>
    </div>
    <ul class={styles["tile-set"]}>
      {ready.map((page) => Card(page)).join("")}
    </ul>
  </div>
);
