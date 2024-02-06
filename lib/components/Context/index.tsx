import React, { useState, useEffect, ReactNode } from "react";
import "./ModalContext.css";

type ContextType = {
  modals: ModalType[];
  openModal: (_options: ModalType) => void;
  closeModal: (_options: ModalType) => void;
  isActive: () => void;
  getCurrentModal: () => void;
};
const ModalContext = React.createContext<ContextType | undefined>(undefined);
const ESCAPE_KEY = 27;

interface closeProps {
  ShowClose: boolean;
  id: string;
}
// type of Modal
type ModalType = {
  id: string;
  title: string;
  desc: string;
  clickClose: boolean;
  closeClass: string;
  showClose: boolean;
  modalClass: string;
  closeExisting: boolean;
  blockerClass: string;
};
// export type of Modal
export type { ModalType };
// Provider of modals for create and display modals
export const ModalProvider = (props: {
  escapeClose: boolean;
  children: ReactNode;
}) => {
  //state of  modals
  const [modals, setModals] = useState<ModalType[]>([]);
  //state of  modals status
  const [status, setStatus] = useState<boolean>(false);
  //state for the current modal
  const [currentModal, setCurrentModal] = useState<ModalType>();

  useEffect(() => {
    console.log(props);

    if (props.escapeClose) {
      document.addEventListener("keydown", handleEscape, false);
    }

    setStatus(true);

    setCurrentModal(modals[modals.length - 1]);

    return () => {
      console.log(currentModal);
      if (props.escapeClose) {
        document.removeEventListener("keydown", handleEscape, false);
      }
      setStatus(false);
    };
  }, [modals]);

  const handleEscape = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case ESCAPE_KEY:
        console.log("triggered escape");

        closeModal(null);
        break;
      default:
        break;
    }
  };
  // function for add and open a new modal
  const openModal = (options: ModalType) => {
    if (options.closeExisting === true) {
      setModals([
        {
          id: options.id,
          title: options.title,
          desc: options.desc,
          clickClose: options.clickClose,
          closeClass: options.closeClass,
          showClose: options.showClose,
          modalClass: options.modalClass,
          closeExisting: options.closeExisting,
          blockerClass: options.blockerClass,
        },
      ]);
    } else
      setModals([
        ...modals,
        {
          id: options.id,
          title: options.title,
          desc: options.desc,
          clickClose: options.clickClose,
          closeClass: options.closeClass,
          showClose: options.showClose,
          modalClass: options.modalClass,
          closeExisting: options.closeExisting,
          blockerClass: options.blockerClass,
        },
      ]);
  };

  // function for close specific modal or all

  const closeModal = (options: { id: string } | null) => {
    if (options === null) {
      setModals([]);
    } else {
      setModals([
        ...modals.filter((modal: ModalType) => modal.id !== options.id),
      ]);
    }
  };
  // function for know if a modal is active

  const isActive = () => {
    return status;
  };
  // function for getting the current modal
  const getCurrentModal = () => {
    return currentModal;
  };

  // function return React Element "icon" for the top-right corner of modal

  const ShowCloseElement = ({ ShowClose, id }: closeProps) => {
    console.log(ShowClose);
    console.log(id);

    if (ShowClose === true)
      return (
        <div
          className="closeIconContainer"
          onClick={() => {
            closeModal({ id: id });
          }}
        >
          <div className="closeIcon">X</div>
        </div>
      );
  };

  // object with all elements needed for the modal provider

  const value = {
    modals: modals,
    openModal: openModal,
    closeModal: closeModal,
    isActive: isActive,
    getCurrentModal: getCurrentModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {props.children}
      {value.modals.map((modal: ModalType, index: number) => (
        <div
          className="modal-overlay"
          key={index}
          style={{ zIndex: index + 10 }}
          onClick={() => {
            if (modal.clickClose) {
              closeModal({ id: modal.id });
            }
          }}
        >
          <div className="modal">
            <ShowCloseElement ShowClose={modal.showClose} id={modal.id} />
            <h2 className="modal-header">{modal.title}</h2>
            <p className="modal-paragraph">{modal.desc}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                closeModal({ id: modal.id });
              }}
              className={"modal-close " + modal.closeClass}
            >
              Close
            </button>
          </div>
        </div>
      ))}
    </ModalContext.Provider>
  );
};
// function for use the modal context
export function useModal() {
  return React.useContext(ModalContext);
}
