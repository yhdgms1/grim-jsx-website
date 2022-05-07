/**
 * When fonts are loaded, use them.
 * Though `font-display: swap;` can do this
 */
const processFonts = () => {
  const mark = () => document.documentElement.classList.add("inter");

  if ("fonts" in document) {
    Promise.all([
      document.fonts.load("500 1em Inter"),
      document.fonts.load("400 1em Inter"),
    ]).then(mark);
  } else {
    mark();
  }
};

export { processFonts as fonts };
