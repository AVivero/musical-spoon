import React, {
  useState,
  useEffect,
  createContext,
  useId,
  useContext,
} from "react";
import { createPortal } from "react-dom";

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

  const id = useId();

  function lockBodyScroll() {
    document.body.style.overflow = "hidden";
  }

  function unlockBodyScroll() {
    document.body.style.overflow = "auto";
  }

  function handleKeyDownWhenOpen(event) {
    if (event.key === "Escape") {
      setOpen(false);
      typeof onClose === "function" && onClose();
    }
  }

  useEffect(() => {
    if (open) {
      lockBodyScroll();
      document.addEventListener("keydown", handleKeyDownWhenOpen);
    } else {
      unlockBodyScroll();
      document.removeEventListener("keydown", handleKeyDownWhenOpen);
    }
  }, [open]);

  /**
   * Handle setOpen
   * @description handle state changes from children components.
   * Handled like this so we don't need to add onClose definition to same effect handling rest of state change logic.
   * @param {boolean} value
   * @returns {boolean}
   */
  function handleSetOpen(value) {
    setOpen((prev) => {
      if (value !== prev && !value) {
        console.log("closing modal");
        typeof onClose === "function" && onClose();
      }
      return value;
    });
  }

  return (
    <ModalContext.Provider
      value={{ idPrefix: id, open, setOpen: handleSetOpen }}
    >
      <div role="dialog" aria-modal="true" aria-labelledby={`${id}-title`}>
        {children}
      </div>
    </ModalContext.Provider>
  );
};

/**
 * ModalPortal component
 * @description Portal the modal content to a desired container (defaults to document.body).
 * Modals should sit in the root of the document body. This component can help achieve easily.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {HTMLElement} props.container
 * @returns {React.ReactNode}
 */
const ModalPortal = ({ children, container = document.body }) => {
  const { open } = useContext(ModalContext);

  if (!open) return null;

  return createPortal(children, container);
};

/**
 * ModalTrigger component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.className
 * @param {string} props.name
 * @returns {React.ReactNode}
 */
const ModalTrigger = ({ children, className, name = "trigger" }) => {
  const { idPrefix, open, setOpen } = useContext(ModalContext);

  return (
    <button
      id={`${idPrefix}-trigger`}
      role="button"
      name={name}
      aria-expanded={open}
      aria-controls={`${idPrefix}-content`}
      className={className}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  );
};

/**
 * ModalOverlay component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.className
 * @returns {React.ReactNode}
 */
const ModalOverlay = ({ children, className, ...props }) => {
  const { idPrefix, open, setOpen } = useContext(ModalContext);

  if (!open) return null;

  return (
    <div
      id={`${idPrefix}-overlay`}
      className={className}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * ModalTitle component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.className
 * @returns {React.ReactNode}
 */
const ModalTitle = ({ children, className }) => {
  const { idPrefix, open } = useContext(ModalContext);

  if (!open) return null;

  return (
    <h2 id={`${idPrefix}-title`} role="heading" className={className}>
      {children}
    </h2>
  );
};

/**
 * ModalContent component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.className
 * @returns {React.ReactNode}
 */
const ModalContent = ({ children, className }) => {
  const { idPrefix, open } = useContext(ModalContext);

  if (!open) return null;

  return (
    <div id={`${idPrefix}-content`} role="region" className={className}>
      {children}
    </div>
  );
};

/**
 * ModalClose component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.className
 * @param {string} props.name
 * @returns {React.ReactNode}
 */
const ModalClose = ({ children, className, name = "close" }) => {
  const { idPrefix, open, setOpen } = useContext(ModalContext);

  if (!open) return null;

  return (
    <button
      id={`${idPrefix}-close`}
      role="button"
      name={name}
      className={className}
      onClick={() => setOpen(false)}
    >
      {children}
    </button>
  );
};

export default Object.assign(Modal, {
  Portal: ModalPortal,
  Trigger: ModalTrigger,
  Overlay: ModalOverlay,
  Title: ModalTitle,
  Content: ModalContent,
  Close: ModalClose,
});
