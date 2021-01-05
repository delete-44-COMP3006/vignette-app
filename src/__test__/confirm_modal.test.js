import { render, screen } from "@testing-library/react";
import ConfirmModal from "../components/confirm_modal.component";
import userEvent from "@testing-library/user-event";

describe("Modal component", () => {
  test("changing visibility status", () => {
    const { rerender } = render(<ConfirmModal visible={false}></ConfirmModal>);

    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();

    rerender(<ConfirmModal visible={true}></ConfirmModal>);

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  test("renders custom modal text", () => {
    render(
      <ConfirmModal
        visible={true}
        title="Test Modal Title"
        text="Test Modal Text"
      ></ConfirmModal>
    );

    expect(screen.getByText("Test Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Test Modal Text")).toBeInTheDocument();
  });

  test("running prop on close", () => {
    let testVal = false;

    render(
      <ConfirmModal
        visible={true}
        closeAction={() => (testVal = true)}
      ></ConfirmModal>
    );

    // Sanity check
    expect(testVal).toBeFalsy();

    userEvent.click(screen.getByText("Back"));

    expect(testVal).toBeTruthy();
  });

  test("running prop on confirm", () => {
    let testVal = false;

    render(
      <ConfirmModal
        visible={true}
        confirmAction={() => (testVal = true)}
      ></ConfirmModal>
    );

    // Sanity check
    expect(testVal).toBeFalsy();

    userEvent.click(screen.getByText("OK"));

    expect(testVal).toBeTruthy();
  });
});
