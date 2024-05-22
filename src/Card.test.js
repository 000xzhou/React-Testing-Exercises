import { render } from "@testing-library/react";
import Card from "./Card";
// import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", () => {
  render(<Card />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
