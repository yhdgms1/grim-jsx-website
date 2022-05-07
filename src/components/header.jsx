import styles from "./header.module.css";

const arrow = (
  <svg
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M13.75 6.75L19.25 12L13.75 17.25"
    />
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M19 12H4.75"
    />
  </svg>
);

export const header = (
  <header class={styles.header}>
    <a
      class={styles.button}
      href="https://github.com/Artemis69/grim-jsx"
      aria-label="Go to the GitHub repository with this project"
    >
      <span translate="no">GitHub</span>
    </a>
  </header>
);

header.firstElementChild.appendChild(arrow);

const onScroll = () => {
  if (window.scrollY >= header.clientHeight) {
    header.classList.add(styles["header--scrolled"]);
  } else {
    header.classList.remove(styles["header--scrolled"]);
  }
};

window.addEventListener("scroll", onScroll, true);
