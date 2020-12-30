import { render, screen } from "@testing-library/react";
import SubmissionCard from "../components/submission-card.component";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Submission card component", () => {
  const id = 1;
  const title = "Title";
  const body = "Body";

  afterEach(() => {
    // Clear local storage for this card after each test
    localStorage.removeItem("1VotedUp");
  });

  test("correctly saving votes in localStorage", () => {
    const { rerender } = render(
      <BrowserRouter>
        <SubmissionCard id={id} title={title} body={body} />
      </BrowserRouter>
    );

    const upIcon = screen.getAllByRole("button")[0];
    const downIcon = screen.getAllByRole("button")[1];

    // Confirm neither icon selected at rest
    expect(upIcon).toHaveClass("bi-caret-up");
    expect(upIcon).not.toHaveClass("bi-caret-up-fill");
    expect(downIcon).toHaveClass("bi-caret-down");
    expect(downIcon).not.toHaveClass("bi-caret-down-fill");

    // Click up icon
    userEvent.click(upIcon);

    // Confirm up icon is selected
    expect(upIcon).not.toHaveClass("bi-caret-up");
    expect(upIcon).toHaveClass("bi-caret-up-fill");
    expect(downIcon).toHaveClass("bi-caret-down");
    expect(downIcon).not.toHaveClass("bi-caret-down-fill");

    // Refresh page
    rerender(
      <BrowserRouter>
        <SubmissionCard id={id} title={title} body={body} />
      </BrowserRouter>
    );

    // Confirm up icon is still selected
    expect(upIcon).not.toHaveClass("bi-caret-up");
    expect(upIcon).toHaveClass("bi-caret-up-fill");
    expect(downIcon).toHaveClass("bi-caret-down");
    expect(downIcon).not.toHaveClass("bi-caret-down-fill");

    // Click up icon again
    userEvent.click(upIcon);

    // Confirm neither icon selected
    expect(upIcon).toHaveClass("bi-caret-up");
    expect(upIcon).not.toHaveClass("bi-caret-up-fill");
    expect(downIcon).toHaveClass("bi-caret-down");
    expect(downIcon).not.toHaveClass("bi-caret-down-fill");

    // Refresh page
    rerender(
      <BrowserRouter>
        <SubmissionCard id={id} title={title} body={body} />
      </BrowserRouter>
    );

    // Confirm neither icon selected still
    expect(upIcon).toHaveClass("bi-caret-up");
    expect(upIcon).not.toHaveClass("bi-caret-up-fill");
    expect(downIcon).toHaveClass("bi-caret-down");
    expect(downIcon).not.toHaveClass("bi-caret-down-fill");

    // Click down icon
    userEvent.click(downIcon);

    // Confirm only down icon is selected
    expect(upIcon).toHaveClass("bi-caret-up");
    expect(upIcon).not.toHaveClass("bi-caret-up-fill");
    expect(downIcon).not.toHaveClass("bi-caret-down");
    expect(downIcon).toHaveClass("bi-caret-down-fill");

    // Refresh page
    rerender(
      <BrowserRouter>
        <SubmissionCard id={id} title={title} body={body} />
      </BrowserRouter>
    );

    // Confirm only down icon is selected still
    expect(upIcon).toHaveClass("bi-caret-up");
    expect(upIcon).not.toHaveClass("bi-caret-up-fill");
    expect(downIcon).not.toHaveClass("bi-caret-down");
    expect(downIcon).toHaveClass("bi-caret-down-fill");
  });

  describe("functionality", () => {
    beforeEach(() => {
      render(
        <BrowserRouter>
          <SubmissionCard id={id} title={title} body={body} />
        </BrowserRouter>
      );
    });

    test("rendering correctly", () => {
      // Confirm all elements are rendered
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(body)).toBeInTheDocument();
      expect(screen.getByText("Read")).toBeInTheDocument();
      expect(screen.getAllByRole("button").length).toBe(2);
    });

    test("only allowing one vote option to be selected", async () => {
      const upIcon = screen.getAllByRole("button")[0];
      const downIcon = screen.getAllByRole("button")[1];

      // Confirm neither icon selected at rest
      expect(upIcon).toHaveClass("bi-caret-up");
      expect(upIcon).not.toHaveClass("bi-caret-up-fill");
      expect(downIcon).toHaveClass("bi-caret-down");
      expect(downIcon).not.toHaveClass("bi-caret-down-fill");

      // Click up icon
      userEvent.click(upIcon);

      // Confirm only up icon is selected
      expect(upIcon).not.toHaveClass("bi-caret-up");
      expect(upIcon).toHaveClass("bi-caret-up-fill");
      expect(downIcon).toHaveClass("bi-caret-down");
      expect(downIcon).not.toHaveClass("bi-caret-down-fill");

      // Click down icon
      userEvent.click(downIcon);

      // Confirm only down icon is selected
      expect(upIcon).toHaveClass("bi-caret-up");
      expect(upIcon).not.toHaveClass("bi-caret-up-fill");
      expect(downIcon).not.toHaveClass("bi-caret-down");
      expect(downIcon).toHaveClass("bi-caret-down-fill");

      // Click up icon again
      userEvent.click(upIcon);

      // Confirm only up icon is selected
      expect(upIcon).not.toHaveClass("bi-caret-up");
      expect(upIcon).toHaveClass("bi-caret-up-fill");
      expect(downIcon).toHaveClass("bi-caret-down");
      expect(downIcon).not.toHaveClass("bi-caret-down-fill");
    });

    test("allowing options to be deselected", async () => {
      const upIcon = screen.getAllByRole("button")[0];
      const downIcon = screen.getAllByRole("button")[1];

      // Confirm neither icon is selected at rest
      expect(upIcon).toHaveClass("bi-caret-up");
      expect(upIcon).not.toHaveClass("bi-caret-up-fill");
      expect(downIcon).toHaveClass("bi-caret-down");
      expect(downIcon).not.toHaveClass("bi-caret-down-fill");

      // Click up icon
      userEvent.click(upIcon);

      // Confirm only up icon is selected
      expect(upIcon).not.toHaveClass("bi-caret-up");
      expect(upIcon).toHaveClass("bi-caret-up-fill");
      expect(downIcon).toHaveClass("bi-caret-down");
      expect(downIcon).not.toHaveClass("bi-caret-down-fill");

      // Click up icon again
      userEvent.click(upIcon);

      // Confirm we have returned to rest state
      expect(upIcon).toHaveClass("bi-caret-up");
      expect(upIcon).not.toHaveClass("bi-caret-up-fill");
      expect(downIcon).toHaveClass("bi-caret-down");
      expect(downIcon).not.toHaveClass("bi-caret-down-fill");

      // Click down icon
      userEvent.click(downIcon);

      // Confirm only down icon is selected
      expect(upIcon).toHaveClass("bi-caret-up");
      expect(upIcon).not.toHaveClass("bi-caret-up-fill");
      expect(downIcon).not.toHaveClass("bi-caret-down");
      expect(downIcon).toHaveClass("bi-caret-down-fill");

      // Click down icon again
      userEvent.click(downIcon);

      // Confirm we have returned to rest state
      expect(upIcon).toHaveClass("bi-caret-up");
      expect(upIcon).not.toHaveClass("bi-caret-up-fill");
      expect(downIcon).toHaveClass("bi-caret-down");
      expect(downIcon).not.toHaveClass("bi-caret-down-fill");
    });
  });
});
