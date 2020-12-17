import { render, screen } from "@testing-library/react";
import Index from "../components/index.component";
import { act } from "react-dom/test-utils";
import http from "../http-common";
import { BrowserRouter } from "react-router-dom";

describe("Index component", () => {
  const content1 = "1".repeat(200);
  const content2 = "2".repeat(301);

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
  ];

  beforeEach(() => {
    // In each test, stub any GET requests made through the http module with fake submissions
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: submissions,
      })
    );
  });

  afterEach(() => {
    // To ensure atomic testing, remove mock functionality after each test
    http.get.mockRestore();
  });

  test("rendering a card for each submission", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );
    });

    // Confirm all cards are rendered
    expect(screen.getByText("Submission 1")).toBeInTheDocument();
    expect(screen.getByText("Submission 2")).toBeInTheDocument();
    expect(screen.getAllByText("Read").length).toBe(2);

    // Confirm long contents are trimmed down to 300 characters
    expect(screen.getByText(content1)).toBeInTheDocument();
    expect(screen.queryByText(content2)).not.toBeInTheDocument();
    expect(screen.getByText(`${"2".repeat(300)}...`)).toBeInTheDocument();
  });
});
