import React from "react";

function useModalState() {
  const [openModal, setOpenModal] = React.useState(false);

  const closeOnEscapeKeyDown = (e) => {
    if (e.code === "Escape") {
      setOpenModal(false);
    }
  };

  React.useEffect(() => {
    const body = document.body;
    body.addEventListener("keydown", closeOnEscapeKeyDown);
    return () => {
      body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [openModal]);

  return {
    openModal,
    setOpenModal,
  };
}

export default useModalState;
