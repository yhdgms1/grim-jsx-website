import { Code } from "../components";
import dd from "dedent";

export default () => {
  return Code({
    fullscreen: true,
    code: dd`
    // Try to edit this file!
    const el = (
      <ul>
        <li>Joe Mama</li>
      </ul>
    )`,
  });
};
