import React from "react";

import "../../index.css";

import Modal from "./Modal";

export default {
  title: "Modal",
  component: Modal,
};

export const Default = () => (
  <Modal>
    <Modal.Trigger className="rounded-md bg-blue-500 text-white p-2 cursor-pointer hover:bg-blue-600">
      Open Modal
    </Modal.Trigger>
    <Modal.Portal>
      <Modal.Overlay className="fixed inset-0 bg-black/50 z-10" />
      <Modal.Content className="fixed inset-0 bg-white rounded-lg p-4 z-20 border border-gray-300 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Modal.Title className="text-2xl font-bold">Modal Title</Modal.Title>
        <Modal.Close className="absolute top-2 right-2 cursor-pointer">
          Close
        </Modal.Close>
        <div className="pt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </div>
      </Modal.Content>
    </Modal.Portal>
  </Modal>
);
