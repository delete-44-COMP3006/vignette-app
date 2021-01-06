import { render, screen } from "@testing-library/react";
import Award from "../../components/icons/Award.icon";

describe("Award icon", () => {
  test("changing filled state", () => {
    const { rerender } = render(
      <Award type="bronze" />
    );

    let icon = screen.getByRole("complementary");
    let text = screen.getByText("bronze award");

    // Sanity check
    expect(icon).toBeVisible();
    expect(text).toBeVisible();

    // Icon should not be filled
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-star");
    expect(icon).not.toHaveClass("bi-star-half");
    expect(icon).not.toHaveClass("bi-star-fill");

    rerender(<Award type="silver" />);

    // Confirm additional text changes
    icon = screen.getByRole("complementary");
    text = screen.getByText("silver award");

    // Sanity check
    expect(icon).toBeVisible();
    expect(text).toBeVisible();

    // Confirm icon is half-filled
    expect(icon).toHaveClass("bi");
    expect(icon).not.toHaveClass("bi-star");
    expect(icon).toHaveClass("bi-star-half");
    expect(icon).not.toHaveClass("bi-star-fill");

    rerender(<Award type="gold" />);

    // Confirm additional text changes
    icon = screen.getByRole("complementary");
    text = screen.getByText("gold award");

    // Sanity check
    expect(icon).toBeVisible();
    expect(text).toBeVisible();

    // Confirm icon is filled
    expect(icon).toHaveClass("bi");
    expect(icon).not.toHaveClass("bi-star");
    expect(icon).not.toHaveClass("bi-star-half");
    expect(icon).toHaveClass("bi-star-fill");
  });
});
