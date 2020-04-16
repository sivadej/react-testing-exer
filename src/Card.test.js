import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

//smoke test
it('renders without breaking', ()=> {
  render(<Card />);
});

//snapshot tests
it('matches snapshot', ()=> {
  const {asFragment} = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});