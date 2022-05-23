import { destroy, component } from "./component";

/**
 * Manages the destruction of a component on route change
 */
const createRouting = () => {
  /** @type {Parameters<typeof destroy>[0]} */
  let d = null;

  /**
   *
   * @param {Parameters<typeof component>[1]} cmp
   * @returns
   */
  let run = (cmp) => {
    return () => {
      destroy(d);

      ({ d } = component(document.body, cmp));

      scrollTo({ top: 0, behavior: "auto" });
    };
  };

  return run;
};

export { createRouting };
