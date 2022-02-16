import React, { useState } from "react";
import { ReactComponent as AddSvg } from "./add.svg";
import "./AddImageHandler.css";
import { IGroupImage } from "./App";
import ModalImage from "./ModalImage";
interface IAddImageHandler {
  setListImage: any;
}

const AddImageHandler = ({ setListImage }: IAddImageHandler) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNewListImage = (newList: IGroupImage) => {
    setListImage((prev: Array<IGroupImage>) => [...prev, newList]);
  };

  return (
    <>
      <div
        className="container"
        onClick={(e) => {
          setIsModalOpen((prev) => !prev);
        }}
      >
        <AddSvg />
      </div>
      <ModalImage
        isOpen={isModalOpen}
        addNewListImage={handleAddNewListImage}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default AddImageHandler;
