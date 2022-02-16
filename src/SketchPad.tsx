import React, { useEffect, useState, useMemo } from "react";
import { useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import Images from "./Images";

interface ISketchPad {
  setCanvasObject: (canvasObj: fabric.Canvas) => void;
  children: any;
}

const SketchPad = React.forwardRef((props: ISketchPad, ref: any) => {
  const { setCanvasObject } = props;
  useEffect(() => {
    if (ref.current) {
      const canvas = new fabric.Canvas(ref.current);
      canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      //   console.log("c",canvas.add);
      setCanvasObject(canvas);
    }
  }, [ref]);
  const children = useMemo(
    () =>
      ref.current
        ? React.Children.map(props.children, (child) => {
            console.log(child);
            return React.cloneElement(child);
          })
        : null,
    [props.children]
  );

  return (
    <>
      <canvas ref={ref}></canvas>
      {children}
    </>
  );
});

export default SketchPad;
