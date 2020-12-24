import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import http from "../http-common";
import { MemoryRouter, Route } from "react-router-dom";
import Show from "../components/show.component";

describe("Show component", () => {
  const content = "1".repeat(500);
  const id = 1;

  const submission = {
    title: "Submission 1",
    summary: "Summary 1",
    content: content,
    _id: id,
  };

  beforeEach(() => {
    // In each test, stub any GET requests made through the http module with fake submission
    jest.spyOn(http, "get").mockImplementation(() =>
      Promise.resolve({
        data: submission,
      })
    );
  });

  afterEach(() => {
    // To ensure atomic testing, remove mock functionality after each test
    http.get.mockRestore();
  });

  test("rendering full submission", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/read/${id}`]}>
          <Route path="/read/:id">
            <Show />
          </Route>
        </MemoryRouter>
      );
    });

    // Confirm full, untrimmed text is rendered
    expect(screen.getByText("Submission 1")).toBeInTheDocument();
    expect(screen.queryByText("Summary 1")).toBeNull();
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText("Return")).toBeInTheDocument();
  });
});
