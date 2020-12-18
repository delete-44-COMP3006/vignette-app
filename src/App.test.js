import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);

  // Confirm navigation bar is always present
  expect(screen.getByText("Vignette")).toBeInTheDocument();
  expect(screen.getByText("Get Writing!")).toBeInTheDocument();
});
