import { Code } from "../components";

import { header } from "../components/header";

export default () => {
  const { dom, d: playground_destroy } = Code({
    fullscreen: true,
    code: `\
// Try to edit this file!
const el = (
  <ul>
    <li>Joe Mama</li>
  </ul>
)`,
  });

  const onMount = () => {
    header.style.display = "none";
  };

  onMount();

  const onDestroy = () => {
    header.style.display = null;
  };

  return { dom, d: [playground_destroy, onDestroy] };
};
