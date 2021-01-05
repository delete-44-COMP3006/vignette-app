import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import New from "../components/new.component";
import http from "../http-common";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

describe("New component", () => {
  const modalTitleText = "Submit story?"
  const modalBodyText = "This will publish your story and it will be live to the general public for the next 30 days. Are you sure you want to continue?"

  const clear = (field) => {
    userEvent.type(field, "{selectall}{backspace}");
    expect(field.value).toEqual("");
  };

  beforeEach(() => {
    render(
      <BrowserRouter>
        <New />
      </BrowserRouter>
    );
  });

  test("rendering correct fields", () => {
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

    test("modal rendering", async () => {
      const submitButton = screen.getByText("Submit!");

      // Confirm modal is not visible by default
      expect(screen.queryByText(modalTitleText)).toBeNull();
      expect(screen.queryByText(modalBodyText)).toBeNull();
      expect(screen.queryByText("Test error message")).toBeNull();

      // Click submit button
      await act(async () => {
        userEvent.click(submitButton);
      });

      // Confirm modal is shown
      expect(screen.getByText(modalTitleText)).toBeVisible();
      expect(screen.getByText(modalBodyText)).toBeVisible();
      expect(screen.queryByText("Test error message")).toBeNull();

      // Cancel submission
      await act(async () => {
        userEvent.click(screen.getByText('Back'));
      });

      // Confirm submission was cancelled - no errors are present, modal is hidden
      expect(screen.queryByText(modalTitleText)).toBeNull();
      expect(screen.queryByText(modalBodyText)).toBeNull();
      expect(screen.queryByText("Test error message")).toBeNull();

      // Click submit button
      await act(async () => {
        userEvent.click(submitButton);
      });

      // Confirm modal is shown
      expect(screen.getByText(modalTitleText)).toBeVisible();
      expect(screen.getByText(modalBodyText)).toBeVisible();
      expect(screen.queryByText("Test error message")).toBeNull();

      // Confirm submission
      await act(async () => {
        userEvent.click(screen.getByText('OK'));
      });

      // Confirm submission was submitted, rendering errors
      expect(screen.getByText("Test error message")).toBeVisible();
      expect(screen.queryByText(modalTitleText)).toBeNull();
      expect(screen.queryByText(modalBodyText)).toBeNull();
    })

    test("rendering error messages", async () => {
      const submitButton = screen.getByText("Submit!");

      await act(async () => {
        userEvent.click(submitButton);
      });

      const modalTitle = screen.getByText(modalTitleText);
      const modalBody = screen.getByText(modalBodyText);
      const modalOk = screen.getByText('OK');

      expect(modalTitle).toBeVisible();
      expect(modalBody).toBeVisible();

      await act(async () => {
        userEvent.click(modalOk);
      });

      expect(screen.getByText("Test error message")).toBeInTheDocument();
    });
  });
});
