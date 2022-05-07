import { Article, Code } from "../components";
import { component } from "../lib";
import dd from "dedent";

const image = `
radial-gradient(at 0% 0%, #4158d0 0, transparent 50%),
radial-gradient(at 60% 20%, #c850c0 0, transparent),
radial-gradient(at 50% 90%, #ffcc70 0, #f7ce68 100%)`;

export default () => {
  /** @type {HTMLDivElement[]} */
  const places = [];

  const dom = Article({
    image: image,
    title: "Config",
    article: (
      <div>
        <h2>Config</h2>
        <p>
          Sometimes you may need to adjust something in a particular location.
          You can use comments for this in Grim. For example, this is how you
          can enable and disable string mode without using Babel's config
        </p>
        <div ref={places[0]} />
        <p>As you can see, it's simple enough</p>
      </div>
    ),
  });

  const { d: d1 } = component(places[0], Code, {
    code: dd`
    /** @disableStringMode */
    const element = <div>Hello! I am a node!</div>;
    
    /** @enableStringMode */
    const string = (
      <ul>
        {Array(26)
          .fill(null)
          .map((_, i) => {
            /** @enableStringMode */
            return <li>{String.fromCharCode(97 + i)}</li>;
          })
          .join("")}
      </ul>
    );
    `,
    readonly: true,
  });

  return { dom, d: [d1] };
};
