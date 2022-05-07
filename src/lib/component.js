/**
 * A function to destroy a component
 * @param {(() => void) | (() => void)[]} [d]
 */
const destroy = (d) => {
  if (d) {
    Array.isArray(d) ? d.forEach((f) => f?.()) : d?.();
  }

  d = null;
};

/**
 * A Simple Component Factory to make life easier
 * @param {HTMLElement} parent
 * @param {HTMLElement | () => HTMLElement | { dom: HTMLElement, d?: (() => void) | (() => void)[] }} cmp
 * @param {object} [props]
 */
const component = (parent, cmp, props = {}) => {
  let inst = typeof cmp === "function" ? cmp(props) : cmp;

  if (inst instanceof HTMLElement) {
    /**
     * This is a logicless component, which just returns a DOM node
     */

    parent.appendChild(inst);

    return {
      dom: inst,
      d: () => {
        parent.removeChild(inst);
      },
    };
  } else {
    /**
     * This is a component with destroy method
     */

    const { dom, d } = inst;

    parent.appendChild(dom);

    return {
      dom,
      d: () => {
        destroy(d);
        parent.removeChild(dom);
      },
    };
  }
};

export { component, destroy };
