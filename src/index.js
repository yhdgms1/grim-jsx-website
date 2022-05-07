import "./assets/main.css";

/**
 * This is the only way to import prism.js in Vite. 07.05.2022
 */
import * as _ from "prismjs";

import { header, landing } from "./components";
import { component, fonts, createRouting } from "./lib";

import {
  AttributesPage,
  SpreadPage,
  RefsPage,
  ConfigPage,
  ReplPage,
} from "./pages";

fonts();

/**
 * Append Header
 */
component(document.body, header);

const run = createRouting();

import navaid from "navaid";

navaid()
  .on("/", run(landing))
  .on("/attributes", run(AttributesPage))
  .on("/spread", run(SpreadPage))
  .on("/refs", run(RefsPage))
  .on("/repl", run(ReplPage))
  .on("/config", run(ConfigPage))
  .listen();
