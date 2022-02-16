import React from "react";
import Modal from "react-modal";
import { IGroupImage } from "./App";
import { makeid } from "./utils";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "60vw",
    // marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "50vh",
  },
};

Modal.setAppElement("#root");

interface IModal {
  isOpen: boolean;
  addNewListImage: (newList: IGroupImage) => void;
  onClose: () => void;
}

const ModalImage = ({ isOpen, addNewListImage, onClose }: IModal) => {
  // makeid

  const onAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newListImages: IGroupImage = {
        id: makeid(20),
        listImages: [],
      };
      for (let i = 0; i < files?.length; i++) {
        // addNewListImage()
        newListImages.listImages.push({
          url: URL.createObjectURL(files[i]),
          id: makeid(20),
        });
      }
      addNewListImage(newListImages);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} style={customStyles}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
          }}
        >
          <button
            onClick={(e) => {
              onClose();
            }}
          >
            Close
          </button>
        </div>
        <input type="file" multiple onChange={onAddImage} accept="image/*" />
      </Modal>
    </>
  );
};

export default ModalImage;
