import { Article, Code } from "../components";
import { component } from "../lib";

const image = `\
radial-gradient(at 0% 0%, #4a313e 0, transparent 50%),
radial-gradient(at 50% 90%, #220b34 0, #c11e38 100%)`;

export default () => {
  /** @type {HTMLDivElement[]} */
  const places = [];

  const dom = Article({
    image: image,
    title: "References",
    color: "#fff",
    article: (
      <div>
        <h2>References</h2>
        <p>
          When you use JSX, it compiles into a string literal, that string is
          passed to the `template` function. Which return value is the DOM node.
          So how can you access some child node? You can use references.
        </p>
        <div ref={places[0]} />
        <p>
          It will use `firstElementChild` and `nextElementSibling` to reach this
          node.
        </p>
        <p>
          Because the DOM API is used there, you cannot use it in the string
          mode.
        </p>
        <div ref={places[1]} />
      </div>
    ),
  });

  const { d: d1 } = component(places[0], Code, {
    code: `\
/** @type {HTMLButtonElement} */
let button;

const widget = (
  <div>
    <p>Would you like click the button below?</p>
    <button ref={button}>Click me!</button>
  </div>
);

button.addEventListener('click', () => widget.classList.toggle('active'));`,
    readonly: true,
  });

  const { d: d2 } = component(places[1], Code, {
    code: `\
/** @type {HTMLButtonElement} */
let button;

/** @enableStringMode */
const widget = (
  <div>
    <p>Would you like click the button below?</p>
    <button ref={button}>Click me!</button>
  </div>
);`,
    readonly: true,
  });

  return { dom, d: [d1, d2] };
};
