import React, { useEffect } from "react";
import { fabric } from "fabric";
import { Transform } from "fabric/fabric-impl";
import { IGroupImage } from "./App";

  const Images = ({
  id,
  listImages,
  canvasObj,
}: IGroupImage & { canvasObj: fabric.Canvas | undefined }) => {
  const deleteObject = (eventData: MouseEvent, transform: Transform) => {
    console.log(id);
    return true;
  };

  useEffect(() => {
    if (listImages[0]) {
      const img = fabric.Image.fromURL(
        // "https://www.w3schools.com/w3css/img_lights.jpg",
        listImages[0].url,
        (image) => {
          console.log("vvvv", canvasObj);
          if (canvasObj) {
            image.setControlsVisibility({
              bl: false,
              br: true,
              mb: false,
              ml: false,
              mr: false,
              mt: false,
              tl: false,
              tr: false,
              mtr: true,
            });
            image.borderColor='#1D474F';
            image.setOptions({
              total: listImages.length,
              list: listImages,
            });
            canvasObj.add(image);
          }
        },
        {
          // stroke: 'red',
          // top: 100,
          // left: 200,
          // hasRotatingPoint: false,
        }
      );
      // img.setElement()
    }
  }, [listImages]);

  useEffect(() => {
    // fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    //   x: 0.5,
    //   y: -0.5,
    //   offsetY: 16,
    //   cursorStyle: "pointer",
    //   mouseUpHandler: deleteObject,
    //   render: function(
    //     ctx: CanvasRenderingContext2D,
    //     left: number,
    //     top: number,
    //     styleOverride: any,
    //     fabricObject: fabric.Object
    //   ) {
    //     console.log('this',fabricObject);
    //     var img = document.createElement("img");
    //     img.src = deleteIcon;
    //     var size = (this as any).cornerSize;
    //     // this.mouseUpHandler()
    //     console.log(size);
    //     ctx.save();
    //     ctx.translate(left, top);
    //     if (fabricObject.angle) {
    //       ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    //       ctx.drawImage(img, 10, 10, 5, 5);
    //       ctx.restore();
    //     }
    //   },
    //   // cornerSize: 24,
    // });
  }, []);

  return <></>;
};

export default Images;
