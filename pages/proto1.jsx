// user clicks and drags, text box appears on release. Capture click, hold follows with temporary element. Release creates new element.

import React, {
  useState,
  useEffect
} from 'react';

export default function main() {

  const [click, setClick] = useState({
    hasStarted: false,
    start: {x: 0, y:0},
    current: {x: 0, y:0},
    hasDrawn: false,
    rectangle: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    }
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    let mousedownListener = (e) => {
      // setStart - hasStarted true, position of start
      setClick((oldState) => {
        const newState =  {
          ...oldState,
          hasStarted: true,
          hasDrawn: false,
          start: {
            x: e.pageX,
            y: e.pageY
          },
        };
        console.log("Started", newState);
        return newState;
      })
    }

    let mousemoveListener = (e) => {
      //if not clicked return, if clicked and no end point update another state to keep track of current mouse position
      // setCurrent - position
      setClick((oldState) => {
        const newState = {
          ...oldState,
          current: {
            x: e.pageX,
            y: e.pageY
          }
        };
        console.log("....", newState);
        return newState;
      })
    }

    let mouseupListener = (e) => {
      //update end
      // setStart - start false, position, don't care (now)
      // setRectangle - start.x,y, current.x,y
      setClick((oldState) => {
        const newState = {
          ...oldState,
          hasStarted: false,
          hasDrawn: true,
          rectangle:
          {
            top: oldState.start.y,
            left: oldState.start.x,
            width: oldState.current.x-oldState.start.x,
            height: oldState.current.y-oldState.start.y
          }
        }

        if (newState.rectangle.width == 0 || newState.rectangle.height == 0)
        {
          newState.hasDrawn = false
        }

        //add minimum width and height here
        if (newState.rectangle.width < 100 || newState.rectangle.height < 100)
        {
          newState.rectangle.width = 300,
          newState.rectangle.height = 200
        }

        console.log("Ended", newState);
        return newState;
      })
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

  var tempStyle = {
    position: "fixed",
    border: "1px dashed #272727",
    backgroundColor: "#FDFCFA",

  }

  var permanentStyle =
  {
    border: "1px solid #8C8C8C",
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
  }
  // if there is a start and an end, create an element with css attributes of position and size.
  if (click.hasStarted == true) {
    return (
      <>
      <p> started </p>
      <div className = "tempItem" style = {{...tempStyle, cursor: "pointer", top: click.start.y, left: click.start.x, width: click.current.x-click.start.x, height: click.current.y-click.start.y}}>
      </div>
      </>
    );
  }

  else if (click.hasDrawn == true) {

    // if (click.rectangle.width == 0 && click.rectangle.height == 0)
    // {
    //   click.hasDrawn = false;
    // }

   return (
      <>
      <p> drawn </p>
      <div className = "permItem" style = {{...click.rectangle, ...permanentStyle, position: "fixed"}}>
      </div>
      </>

    );
  }

  if (click.rectangle.width == 0 && click.rectangle.height == 0)
  {
    click.hasDrawn = false;
    return (<> </>)
  }

  return <div> nothing </div>;
}
