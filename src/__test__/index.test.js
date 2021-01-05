import { render, screen } from "@testing-library/react";
import Index from "../components/index.component";
import { act } from "react-dom/test-utils";
import http from "../http-common";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Index component", () => {
  const content1 = "1".repeat(200);
  const content2 = "2".repeat(301);
  const content3 = "Content";
  const summary = "Summary";

  const submissions = [
    {
      title: "Submission 1",
      content: content1,
      _id: 1,
    },
    {
      title: "Submission 2",
      content: content2,
      _id: 2,
    },
    {
      title: "Submission 3",
      content: content3,
      summary: summary,
      _id: 3,
    },
  ];

  beforeEach(async () => {
    // In each test, stub any GET requests made through the http module with fake submissions
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: submissions,
      })
    );

    await act(async () => {
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );
    });
  });

  afterEach(() => {
    // To ensure atomic testing, remove mock functionality after each test
    http.get.mockRestore();
  });

  test("rendering a card for each submission", async () => {
    // Confirm all cards are rendered
    expect(screen.getByText("Submission 1")).toBeInTheDocument();
    expect(screen.getByText("Submission 2")).toBeInTheDocument();
    expect(screen.getByText("Submission 3")).toBeInTheDocument();

    expect(screen.getAllByText("Read").length).toBe(3);

    // Confirm long contents are trimmed down to 300 characters
    expect(screen.getByText(content1)).toBeInTheDocument();
    expect(screen.queryByText(content2)).not.toBeInTheDocument();
    expect(screen.getByText(`${"2".repeat(300)}...`)).toBeInTheDocument();
    expect(screen.queryByText(content3)).not.toBeInTheDocument();
    expect(screen.queryByText(summary)).toBeInTheDocument();
  });

  test("changing sort order", () => {
    const sortButton = screen.getByText("Sort Submissions");

    // Onload, make request with default -score value
    expect(http.get).toBeCalledTimes(1);
    expect(http.get).toBeCalledWith("/submissions", {
      params: { sort: "-score" },
    });

    // Change sort order
    userEvent.click(sortButton);
    userEvent.click(screen.getByText("Score (lowest to highest)"));

    // Confirm index request is made again with new sort direction
    expect(http.get).toBeCalledTimes(2);
    expect(http.get).toBeCalledWith("/submissions", {
      params: { sort: "score" },
    });

    // Change sort order
    userEvent.click(sortButton);
    userEvent.click(screen.getByText("Score (highest to lowest)"));

    expect(http.get).toBeCalledTimes(3);
    expect(http.get).toBeCalledWith("/submissions", {
      params: { sort: "-score" },
    });

    // Change sort order
    userEvent.click(sortButton);
    userEvent.click(screen.getByText("Date (oldest to newest)"));

    // Confirm index request is made again with new sort direction
    expect(http.get).toBeCalledTimes(4);
    expect(http.get).toBeCalledWith("/submissions", {
      params: { sort: "createdAt" },
    });

    // Change sort order
    userEvent.click(sortButton);
    userEvent.click(screen.getByText("Date (newest to oldest)"));

    // Confirm index request is made again with new sort direction
    expect(http.get).toBeCalledTimes(5);
    expect(http.get).toBeCalledWith("/submissions", {
      params: { sort: "-createdAt" },
    });
  });

  test("changing sort order with tab", async () => {
    const sortButton = screen.getByText("Sort Submissions");

    // Onload, make request with default -score value
    expect(http.get).toBeCalledTimes(1);
    expect(http.get).toBeCalledWith("/submissions", {
      params: { sort: "-score" },
    });

    // Confirm dropdown elements are not present
    expect(screen.queryByText("Score (lowest to highest)")).toBeNull();
    expect(screen.queryByText("Score (highest to lowest)")).toBeNull();

    // Tab to sortButton
    userEvent.tab();
    expect(sortButton).toHaveFocus();

    await act(async () => {
      // Press space
      userEvent.type(sortButton, " ", { skipClick: true });
    });

    // Confirm dropdown elements are shown
    const ascSort = screen.getByText("Score (lowest to highest)");
    const descSort = screen.getByText("Score (highest to lowest)");

    expect(ascSort).toBeInTheDocument();
    expect(descSort).toBeInTheDocument();

    // TODO: Testing dropdown elements response to tab and space
  });
});
