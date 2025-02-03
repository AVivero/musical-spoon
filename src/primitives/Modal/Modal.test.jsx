import { render, screen, fireEvent } from "@testing-library/react";

import Modal from "./Modal";

function Scenario({ onClose }) {
  return <Modal onClose={onClose}></Modal>;
}

describe("Modal", () => {
  const mockClose = vi.fn();

  beforeAll(() => {
    mockClose.mockReset();
  });

  test("renders modal with expected controls", () => {
    render(<Scenario />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    expect(screen.getByRole("heading")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  describe("when passed onClose handler", () => {
    test("calls onClose action when pressing the ESC key", () => {
      render(<Scenario onClose={mockClose} />);

      fireEvent.keyDown(screen.getByRole("dialog"), {
        key: "Escape",
        code: "Escape",
      });

      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test("renders dismissible button that calls onClose action when clicked", async () => {
      const { user } = renderWithUser(<Scenario onClose={mockClose} />);

      const closeButton = screen.getByRole("button", { name: /close/i });

      await user.click(closeButton);

      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test("calls onClose action when clicking outside of the modal", async () => {
      const { user } = renderWithUser(
        <Scenario data-testid="mockId" onClose={mockClose} />
      );

      const scrimElement = screen.getByTestId("mockId");

      await user.click(scrimElement);

      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });
});
