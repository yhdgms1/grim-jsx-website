import { Article, Code, Highlight } from "../components";
import { component } from "../lib";

const image = `\
radial-gradient(at 50% 0, #ffcb6b 10%, transparent 100%),
radial-gradient(at 50% 100%, #000 50%, transparent 100%)`;

export default () => {
  /** @type {HTMLDivElement[]} */
  const places = [];

  const dom = Article({
    image: image,
    title: "Special Attributes",
    color: "#eee",
    article: (
      <div>
        <h2>Special Attributes</h2>
        <p>
          Sound very special, but it is as special as 'ref' attribute. One of
          these attributes is 'textContent'. In Grim you can insert text using
          common method:
        </p>
        <div ref={places[0]} />
        <p>
          However, this method inserts values directly to the template, as it
          would be using innerHTML. This is not what we want, because text can
          include some unsafe content.
        </p>
        <div ref={places[1]} />
        <p>But sometimes it is easier just to use attribute. Just like that:</p>
        <div ref={places[2]} />
        <p>That's all there.</p>
      </div>
    ),
  });

  const { d: d1 } = component(places[0], Highlight, {
    code: `\
function WithXSS(text) {
  return (
    <span>{text}</span>
  );
}`,
    lang: "js",
  });

  const { d: d2 } = component(places[1], Code, {
    code: `\
function WithoutXSS(text) {
  const el = (
    <span></span>
  );

  el.textContent = text;

  return el;
}`,
    readonly: true,
  });

  const { d: d3 } = component(places[2], Code, {
    code: `\
function WithoutXSS(text) {
  return (
    <span textContent={text}></span>
  )
}`,
    readonly: true,
  });

  return { dom, d: [d1, d2, d3] };
};
