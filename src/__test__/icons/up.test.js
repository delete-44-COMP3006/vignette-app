import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Up from "../../components/icons/up.icon";

describe("Up icon", () => {
  let testVal = false;
  const onClickAction = () => {
    testVal = true;
  };

  beforeEach(() => {
    // Reset testVal
    testVal = false;
  });

  test("changing filled state", () => {
    const { rerender } = render(
      <Up onClick={onClickAction} filled={testVal} />
    );

    const icon = screen.getByRole("button");

    // Sanity check
    expect(testVal).toBe(false);
    expect(icon).toBeVisible();

    // Icon should not be filled by default
    expect(icon).toHaveClass("bi");
    expect(icon).toHaveClass("bi-caret-up");
    expect(icon).not.toHaveClass("bi-caret-up-fill");

    userEvent.click(icon);

    rerender(<Up onClick={onClickAction} filled={testVal} />);

    // Filled state changes with prop
    expect(testVal).toBe(true);
    expect(icon).toHaveClass("bi");
    expect(icon).not.toHaveClass("bi-caret-up");
    expect(icon).toHaveClass("bi-caret-up-fill");
  });

  describe("testing interactivity", () => {
    beforeEach(() => {
      render(<Up onClick={onClickAction} />);
    });

    test("running onClickAction when clicked", () => {
      const icon = screen.getByRole("button");

      // Sanity check
      expect(testVal).toBe(false);

      userEvent.click(icon);

      // Confirm action has run
      expect(testVal).toBe(true);
    });

    describe("responding to tab", () => {
      test("with space", () => {
        const icon = screen.getByRole("button");

        // Sanity check
        expect(testVal).toBe(false);

        // Press tab, confirm element is focussed
        userEvent.tab();
        expect(icon).toHaveFocus();

        // Press space, confirm onClickAction runs
        userEvent.type(icon, " ", { skipClick: true });
        expect(testVal).toBe(true);
      });

      test("with enter", () => {
        const icon = screen.getByRole("button");

        // Sanity check
        expect(testVal).toBe(false);

        // Press tab, confirm element is focussed
        userEvent.tab();
        expect(icon).toHaveFocus();

        // Press enter, confirm onClickAction runs
        userEvent.type(icon, "{enter}", { skipClick: true });
        expect(testVal).toBe(true);
      });
    });
  });
});
