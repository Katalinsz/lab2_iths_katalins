import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import MotifQuery from "../App";

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

it("renders motif data", async () => {
  const fakeMotif = {
    width: "48", 
    height: "48", 
    colors: [ '#ffffff', '#000000', '#9d9d9d', '#f7b3c7', '#606060' ], 
    rows: [
      {pixels: []}
    ]
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeMotif)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<MotifQuery selectedMotifId={1104} />, container);
  });

  expect(container.querySelector("ul").textContent).toBe(fakeMotif.width);

  //test if all of the motifs color all listed
  fakeMotif.colors.forEach(color => {
    expect(container.querySelector("[color='" + color +"']")).toBeDefined();
  });  
  //test if there is a current row
  expect(container.textContent).toContain("Current row");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});