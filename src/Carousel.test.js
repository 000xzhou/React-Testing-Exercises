import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", () => {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});
it("matches snapshot", function () {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it(" goes back to 1st photo from 2nd photo", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // move forward in the carousel to 2nd
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // move back to 1st
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the 1st image to show
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("missing left arrow on 1st photo and right arrow on last photo", () => {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  let leftArrow = container.querySelector(".bi-arrow-left-circle");
  let rightArrow = container.querySelector(".bi-arrow-right-circle");
  expect(leftArrow).not.toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();

  // go to 2nd photo
  fireEvent.click(rightArrow);
  // go to 3rd photo (last for this)
  fireEvent.click(rightArrow);

  // Update arrow queries
  leftArrow = container.querySelector(".bi-arrow-left-circle");
  rightArrow = container.querySelector(".bi-arrow-right-circle");

  expect(rightArrow).not.toBeInTheDocument();
  expect(leftArrow).toBeInTheDocument();
});

// it("goes to last photo when clicking left arrow from 1st photo", function () {
//   const { container } = render(
//     <Carousel photos={TEST_IMAGES} title="images for testing" />
//   );

//   // move backward in the carousel
//   const leftArrow = container.querySelector(".bi-arrow-left-circle");
//   fireEvent.click(leftArrow);

//   // expect the last image to show
//   expect(
//     container.querySelector('img[alt="testing image 3"]')
//   ).toBeInTheDocument();
// });
