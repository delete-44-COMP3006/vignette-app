import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import New from "../components/new.component";
import http from "../http-common";
import userEvent from "@testing-library/user-event";

describe("New component", () => {
  const clear = (field) => {
    userEvent.type(field, "{selectall}{backspace}");
    expect(field.value).toEqual("");
  };

  test("rendering correct fields", () => {
    render(<New />);

    expect(
      screen.getByPlaceholderText("Name your submission")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        "Please enter a short summary of your story. If left blank, an excerpt will be taken from your submission..."
      )
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write!")).toBeInTheDocument();
    expect(screen.getByText("Submit!")).toBeInTheDocument();

    expect(screen.getByText("0/500")).toBeInTheDocument();
  });

  test("word counter", () => {
    render(<New />);

    const contentsField = screen.getByPlaceholderText("Write!");

    // Confirm starting state
    expect(contentsField).toBeInTheDocument();
    expect(screen.getByText("0/500")).toBeInTheDocument();

    // Confirm repeated whitespace doesn't increase the word count
    userEvent.type(contentsField, "             ");
    expect(screen.getByText("1/500")).toBeInTheDocument();

    clear(contentsField);

    // Confirm repeated new lines don't increase the word count
    userEvent.type(contentsField, "{enter}{enter}{enter}");
    expect(screen.getByText("1/500")).toBeInTheDocument();

    clear(contentsField);

    // Confirm regular words increase the word count
    userEvent.type(contentsField, "Three more words");
    expect(screen.getByText("3/500")).toBeInTheDocument();

    clear(contentsField);

    // Confirm words broken by new lines increase the word count
    userEvent.type(contentsField, "Three{enter}more{enter}words");
    expect(screen.getByText("3/500")).toBeInTheDocument();
  });

  describe("Unsuccessful submissions", () => {
    const unsuccessfulResponse = {
      response: {
        data: ["Test error message"],
      },
    };

    beforeEach(() => {
      jest
        .spyOn(http, "post")
        .mockImplementation(() => Promise.reject(unsuccessfulResponse));
    });

    afterEach(() => {
      http.post.mockRestore();
    });

    test("rendering error messages", async () => {
      render(<New />);

      const submitButton = screen.getByText("Submit!");

      await act(async () => {
        userEvent.click(submitButton);
      });

      expect(screen.getByText("Test error message")).toBeInTheDocument();
    });
  });
});
