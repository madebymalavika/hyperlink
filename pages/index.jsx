// user clicks and drags, text box appears on release. Capture click, hold follows with temporary element. Release creates new element.

import React, {
  useState,
  useEffect
} from 'react';

export default function main() {

  const [start, setStart] = useState({
    hasStarted: false,
    position: {x: 0, y:0},
  });

  const [current, setCurrent] = useState({
    position: {x: 0, y: 0},
  });

  // const [end, setEnd] = useState({
  //   end: {x: 0, y:0},
  //   hasEnded: false,
  // });

  const [rectangle, setRectangle] = useState({
    hasDrawn: false,
    style: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    }
  });

  useEffect(() => {
    let mousedownListener = (e) => {
      // setStart - hasStarted true, position of start
      // update rectangle here and reset to zero?
      setStart(() => {
        const updateStart =  {
          hasStarted: true,
          position: {
            x: e.pageX,
            y: e.pageY
          },
        };
        console.log("Started", updateStart);
        return updateStart;
      })

      setRectangle (() => {
        return {
          hasDrawn: false
        }
      })

    }

    let mousemoveListener = (e) => {
      //if not clicked return, if clicked and no end point update another state to keep track of current mouse position
      // setCurrent - position
      setCurrent(() => {
        const updateCurrent = {
          position: {
            x: e.pageX,
            y: e.pageY
          }
        };
        //console.log("....", updateCurrent);
        return updateCurrent;
      })
    }

    let mouseupListener = (e) => {
      //update end
      // setStart - start false, position, don't care (now)
      // setRectangle - start.x,y, current.x,y
      setRectangle (() => {
        const updateRectangle = {
          hasDrawn: true,
          style: {
            top: start.position.y,
            left: start.position.x,
            width: current.position.x-start.position.x,
            height: current.position.y-start.position.y,
          }
        }
        console.log("Rectangle", updateRectangle, "start", start, "current", current)
        return updateRectangle
      })

      // setStart(() => {
      //   const updateStart = {
      //     hasStarted: false,
      //   }
      //   return updateStart;
      // })
    }

    window.addEventListener("mousedown", mousedownListener);
    window.addEventListener("mousemove", mousemoveListener);
    window.addEventListener("mouseup", mouseupListener);

    return () => {
      window.removeEventListener("mousedown", mousedownListener);
      window.removeEventListener("mousemove", mousemoveListener);
      window.removeEventListener("mouseup", mouseupListener);
    }

  }, []);

  var style = {
    position: "fixed",
    border: "1.5px dashed silver"
  }
  // if there is a start and an end, create an element with css attributes of position and size.
  if (start.hasStarted == true) {
    return (
      <>
      <h1> started </h1>
      <div className = "tempItem" style = {{...style, top: start.position.y, left: start.position.x, width: current.position.x-start.position.x, height: current.position.y-start.position.y}}>
      </div>
      </>
    );
  }

  if (rectangle.hasDrawn == true) {
    return <div className = "input" style = {rectangle.style}> rect </div>;
  }

  return <div className = "input" style = {rectangle.style}> 0 </div>;
}
