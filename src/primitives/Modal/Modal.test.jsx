import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import Modal from "./Modal";

function Scenario({ onClose }) {
  return (
    <Modal defaultOpen onClose={onClose}>
      <Modal.Trigger name="open">Open Modal</Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay data-testid="mock-overlay" />
        <Modal.Content>
          <Modal.Title>Modal Title</Modal.Title>
          <Modal.Close name="close">Close Modal</Modal.Close>
          <div>Modal content</div>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
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
      render(<Scenario onClose={mockClose} />);

      const closeButton = screen.getByRole("button", { name: /close/i });

      await closeButton?.click();

      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test("calls onClose action when clicking outside of the modal", async () => {
      render(<Scenario onClose={mockClose} />);

      const modalOverlay = screen.getByTestId("mock-overlay");

      await modalOverlay?.click();

      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });
});
