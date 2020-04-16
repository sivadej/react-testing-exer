import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test
it('renders without breaking', ()=> {
  render(<Carousel />);
});

//snapshot tests
it('matches snapshot', ()=> {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

//specialized tests

it("works when you click on the right and left arrows", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move backwards in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it('hides arrows at beginning and end of carousel', ()=> {
  const { queryByTestId } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  // expect left arrow to be hidden on first image
  expect(leftArrow).not.toBeVisible();
  expect(rightArrow).toBeVisible();

  // move forward to middle image, expect both arrows visible
  fireEvent.click(rightArrow);
  expect(leftArrow).toBeVisible();
  expect(rightArrow).toBeVisible();

  // move foward to last image
  fireEvent.click(rightArrow);

  // expect right arrow to be hidden on last image
  expect(rightArrow).not.toBeVisible();
  expect(leftArrow).toBeVisible();
})