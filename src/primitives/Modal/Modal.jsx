import React, { useState, useEffect, createContext, Portal } from "react";

const ModalContext = createContext();

/**
 * Modal component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Function} props.onClose
 * @param {boolean} props.defaultOpen
 * @returns {React.ReactNode}
 */
const Modal = ({ children, onClose, defaultOpen = false }) => {
  const [open, setOpen] = useState(
    typeof defaultOpen === "boolean" ? defaultOpen : false
  );

  useEffect(() => {
    if (open) {
      /**
       * TODO:
       * - lock body scroll
       * - isolate modal for accessibility
       * - add event listeners for escape key
       */
    } else {
      /**
       * TODO:
       * - unlock body scroll
       * - remove modal isolation for accessibility
       * - remove event listeners for escape key
       */
      typeof onClose === "function" && onClose();
    }
  }, [open]);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      <div role="dialog">{children}</div>
    </ModalContext.Provider>
  );
};

const ModalTrigger = ({ children, className }) => {
  const { setOpen } = useContext(ModalContext);

  return (
    <button className={className} onClick={() => setOpen(true)}>
      {children}
    </button>
  );
};

const ModalOverlay = ({ children, className }) => {
  const { setOpen } = useContext(ModalContext);

  return (
    <div className={className} onClick={() => setOpen(false)}>
      {children}
    </div>
  );
};

const ModalContent = ({ children }) => {
  return <div>{children}</div>;
};

const ModalClose = ({ children, className }) => {
  const { setOpen } = useContext(ModalContext);

  return (
    <button className={className} onClick={() => setOpen(false)}>
      {children}
    </button>
  );
};

export default Object.assign(Modal, {
  Trigger: ModalTrigger,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Close: ModalClose,
});
