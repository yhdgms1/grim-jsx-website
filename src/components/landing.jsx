import styles from "./landing.module.css";
import logo from "../assets/logo.svg?raw";

import { section } from "./sections.jsx";

export const landing = (
  <div class={styles.landing}>
    <div class={styles.module}>
      <div>
        <h1 class={styles.title}>
          Introducing <span translate="no">Grim</span>
        </h1>
        <div class={styles.content}>
          <span>
            A JSX Compiler that aimed at an imperative style of programming.
          </span>
        </div>
      </div>
      <div>
        <img
          alt="Grave With Grim title"
          src={`data:image/svg+xml;utf8,` + encodeURIComponent(logo)}
          class={styles.logo}
        />
      </div>
    </div>
  </div>
);

landing.appendChild(section);
