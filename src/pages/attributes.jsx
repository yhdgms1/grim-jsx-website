import { Article, Code } from "../components";
import { component } from "../lib";
import dd from "dedent";

const image = `\
radial-gradient(at 65% 75%, hsla(0, 0%, 10%, 1) 0, transparent 100%),
radial-gradient(at 65% 42%, hsla(47, 100%, 50%, 1) 0, transparent 50%),
radial-gradient(at 30% 35%, hsla(355, 90%, 60%, 1) 0, transparent 35%),
radial-gradient(at 34% 57%, hsla(295, 100%, 50%, 1) 0, transparent 50%),
radial-gradient(at 76% 53%, hsla(261, 100%, 50%, 1) 0, transparent 64%)`;

export default () => {
  /** @type {HTMLDivElement[]} */
  const places = [];

  const dom = Article({
    image: image,
    backgroundColor: "#171717",
    color: "#fff",
    title: "Attributes",
    article: (
      <div>
        <h2>Attributes</h2>
        <p>
          If a node has a static text attribute, Grim will not make any changes
          to the markup. But if you put your value into JSX Expression
          Container, better known as {" {}"}, it will use String Literal to
          insert the attribute:
        </p>
        <div ref={places[0]} />
        <p>
          And that's not all Grim can do. It also can transform Object
          Expressions! Simple cases is inlined, compex is transformed by a
          runtime function.
        </p>
        <div ref={places[1]} />
        <p>Thats all. The algorithm of transformation is pretty simple.</p>
      </div>
    ),
  });

  const { d: d1 } = component(places[0], Code, {
    code: dd`
    import { css } from 'goober';
    
    <div id="lemon" class="slogan">
      You are as yellow as a lemon.
    </div>;


    <div
      id="apple"
      class={css\`
        color: "red";
        border-radius: 14px;
        padding: 16px 28px;
      \`}
    >
      Joe is an apple.
    </div>;

    `,
    readonly: true,
  });

  const { d: d2 } = component(places[1], Code, {
    code: dd`
    <div style={{ display: 'flex', 'flex-direction': 'column', 'gap': '1em' }}></div>;

    const data = () => {
      return {
        url: Math.random() > 0.5 ? 'https://imgur.com/a/kWiPgLn' : 'https://i.imgur.com/enAzyml.jpg',
      }
    }
    <div data-image={{ ...data(), mode: 'fit' }}></div>
    `,
    readonly: true,
  });

  return { dom, d: [d1, d2] };
};
