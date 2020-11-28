import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import App from "./App";
import Header from "./components/Header";
import MotifList from './components/MotifList';

const motifs = [
  {"name":"Snoflake", "url": "https://motif.knittedforyou.com/img/Motif/1123", "json": "https://motif.knittedforyou.com/download/download_json.php?f=1123", "tags":["animal", "bird", "child"]},
  {"name":"Snoman",  "url": "https://motif.knittedforyou.com/img/Motif/1124", "json": "https://motif.knittedforyou.com/download/download_json.php?f=1124", "tags":["animal", "bird", "child"]},
  {"name":"Bird", "url": "https://motif.knittedforyou.com/img/Motif/1125", "json": "https://motif.knittedforyou.com/download/download_json.php?f=1125", "tags":["animal", "bird", "child"]},
  {"name":"Cat", "url": "https://motif.knittedforyou.com/img/Motif/1104", "json": "https://motif.knittedforyou.com/download/download_json.php?f=1104", "tags":["animal", "bird", "child"]},
]

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders Header", () => {
  act(() => {
    render(<Header />, container);
  });
  expect(container.textContent).toContain("Let's knit these motifs together");
});

it("renders MotifList", () => {
  act(() => {
    render(<MotifList motifs={[]} />, container);
  });
  expect(container.textContent).toBe("");

  act(() => {
    render(<MotifList motifs={motifs} />, container);
  });
  expect(container.innerHTML).toContain("Knit with Line by line");
});