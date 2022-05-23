import { Article, Code } from "../components";
import { component } from "../lib";

const image = `
radial-gradient(at 94% 89%, hsla(198, 100%, 55%, 1) 0, transparent 45%),
radial-gradient(at 14% 12%, hsla(45, 94%, 50%, 1) 0, transparent 64%),
radial-gradient(at 38% 36%, hsla(45, 94%, 50%, 1) 0, transparent 55%),
radial-gradient(at 38% 80%, hsla(14, 90%, 54%, 1) 0, transparent 59%),
radial-gradient(at 73% 37%, hsla(198, 100%, 55%, 1) 0, transparent 70%),
radial-gradient(at 5% 87%, hsla(340, 100%, 64%, 1) 0, transparent 75%)`;

export default () => {
  /** @type {HTMLDivElement[]} */
  const places = [];

  const dom = Article({
    image: image,
    title: "Spread",
    article: (
      <div>
        <h2>Spread</h2>
        <p>
          It is not possible to use compilation for spread attributes, so Grim
          uses the runtime function here.
        </p>
        <div ref={places[0]} />
        <p>
          By the way, spread does not work with setting children - only
          attributes.
        </p>
      </div>
    ),
  });

  const { d: d1 } = component(places[0], Code, {
    code: `\
const Component = (props) => {
  const { children, ...attrs } = props;

  return (
    <div class="holder" {...attrs}>
      {children}
    </div>
  )
}`,
    readonly: true,
  });

  return { dom, d: [d1] };
};
