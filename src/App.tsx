import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import SketchPad from "./SketchPad";
import AddImageHandler from "./AddImageHandler";
import { fabric } from "fabric";
import Images from "./Images";
import deleteIcon from "./deleteIcon.png";
import switchImageIcon from "./switchImage.png";
import rotateImageIcon from "./rotateIcon.png";
// var controlsUtils = fabric.controlHandlers;
import zoomImageIcon from "./zoomIcon.png";

let CIRCLE = {
  radius: 50,
  left: 100,
  top: 100,
  fill: "red",
  stroke: "black",
};

const generateIconImage = (image: string) => {
  return function(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    styleOverride: any,
    fabricObject: fabric.Object
  ) {
    // console.log(fabricObject);

    const size = fabricObject.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    if (fabricObject.angle)
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    if (size) {
      let img = document.createElement("img");
      img.src = image;
      ctx.drawImage(img, -size / 2, -size / 2, size * 1.8, size * 1.8);
    }
    ctx.restore();
    // },
    // cornerSize: 24,
  };
};

function deleteObject(eventData: MouseEvent, transform: fabric.Transform) {
  console.log("adadd");
  var target = transform.target;
  var canvas = target.canvas;
  console.log(canvas);
  if (canvas) {
    canvas.remove(target);
    canvas.requestRenderAll();
  }
  return true;
}

function switchImage(
  eventData: MouseEvent,
  transform: fabric.Transform & ICanvasImage
) {
  console.log(eventData);
  const element = (transform.target as any)._element;
  let canvasObj = transform.target.canvas;
  let activeObj = canvasObj?.getActiveObject() as any;
  const listImage = (transform.target as any).list;
  const currentImageUrl = element.currentSrc;
  const listImageSize = listImage.length;
  const currentImageIndex = listImage?.findIndex((image: ISingleImage) => {
    return image.url === currentImageUrl;
  });
  console.log(currentImageIndex);

  if (currentImageIndex !== -1) {
    let newIndex = 0;
    if (currentImageIndex < listImageSize - 1) newIndex = currentImageIndex + 1;
    activeObj.setSrc(listImage[newIndex].url, () => {
      canvasObj?.renderAll();
    });
  }

  // activeObj.setEle
  // console.log();
  // element.currentSrc =

  // transform.
  console.log(element);

  return true;
}
function zoomImage(eventData: MouseEvent, transform: fabric.Transform) {
  return true;
}

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: 0,
  offsetX: 0,
  cursorStyle: "pointer",
  withConnection: true,
  // mouseDownHandler:deleteObject,
  mouseUpHandler: deleteObject,
  render: generateIconImage(deleteIcon),
});

fabric.Object.prototype.controls.switchImage = new fabric.Control({
  x: -0.5,
  y: -0.5,
  offsetY: 0,
  offsetX: 0,
  cursorStyle: "pointer",
  withConnection: true,
  // mouseDownHandler:deleteObject,
  mouseUpHandler: switchImage,
  render: generateIconImage(switchImageIcon),
});

fabric.Object.prototype.controls.mtr.x = -0.5;
fabric.Object.prototype.controls.mtr.y = 0.5;
fabric.Object.prototype.controls.mtr.offsetY = 0;
fabric.Object.prototype.controls.mtr.offsetX = 0;
fabric.Object.prototype.controls.mtr.cursorStyle = "pointer";
fabric.Object.prototype.controls.mtr.render = generateIconImage(
  rotateImageIcon
);

fabric.Object.prototype.controls.zoomImage = new fabric.Control({
  x: 0.5,
  y: 0.5,
  offsetY: 0,
  offsetX: 0,
  cursorStyle: "pointer",
  // mouseDownHandler:deleteObject,
  mouseUpHandler: switchImage,
  render: generateIconImage(zoomImageIcon),
});

export interface ISingleImage {
  url: string;
  id: string;
}

export interface IGroupImage {
  id: string;
  listImages: ISingleImage[];
}

interface ICanvasImage {
  total: number;
  list: IGroupImage;
}

function App() {
  const [listImage, setListImage] = useState<IGroupImage[]>([]);
  const [canvasObject, setCanvasObject] = useState<fabric.Canvas>();
  const sketchRef = useRef();
  // console.log(canvasObject);

  useEffect(() => {
    canvasObject?.on("touch:drag", () => {
      console.log("'draggg");
    });
    // canvasObject.on
  }, [canvasObject]);

  return (
    <>
      <button
        onClick={(e) => {
          var object = new fabric.Circle(CIRCLE);
          canvasObject?.add(object);
        }}
      >
        nhaan
      </button>
      <SketchPad ref={sketchRef} setCanvasObject={setCanvasObject}>
        {listImage.map((imageGroup) => (
          <Images
            id={imageGroup.id}
            listImages={imageGroup.listImages}
            canvasObj={canvasObject}
          />
        ))}
      </SketchPad>
      <AddImageHandler setListImage={setListImage} />
    </>
  );
}

export default App;
