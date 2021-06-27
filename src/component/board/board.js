
import React from "react";
import useLocalStorage from '../../hooks/useLocalStorage';
import './board.css';

const defaultGameSetup=[
    [1, 0, 0],
    [1, 1, 0],
    [1, 1, 0]
  ]
export default function App() {
  
  const [grid, setGrid] = React.useState([
    [1, 0, 0],
    [1, 1, 0],
    [1, 1, 0]
  ]);

  const [activeSquare, setActiveCell] = React.useState({
      rowIndex:0,
      colIndex:0
  })
  
//   const checkIfAllAreSame = (squareValue) => {
//     return squareValue === grid[0][0];
//   };

//   React.useEffect(() => {
//     const resultedArray = grid.flat(1);
//     console.log(resultedArray.every(checkIfAllAreSame));
//   }, [grid]);
 
  const updateGridValue = (rowIndex, colIndex) => {
      console.log("coming here to update")
    let sliceGridData = grid.slice();
    sliceGridData[rowIndex][colIndex] = ++sliceGridData[rowIndex][colIndex];
    setGrid(sliceGridData);
  };

  const updateTheGrid = (direction) => {
 setActiveCell({rowIndex:0,colIndex:0})
    if (direction === "right") {
      console.log(activeSquare, "check");
      if (activeSquare.colIndex < 2) {
        setActiveCell({
          ...activeSquare,
          colIndex: ++activeSquare.colIndex
        });

        updateGridValue(activeSquare.rowIndex, activeSquare.colIndex);
      }
    }
    if (direction === "down") {
      if (activeSquare.rowIndex < 2) {
        setActiveCell({
          ...activeSquare,
          rowIndex: ++activeSquare.rowIndex
        });
        updateGridValue(activeSquare.rowIndex, activeSquare.colIndex);
      }
    }
    if (direction === "left") {
      if (activeSquare.colIndex > 0) {
        
        setActiveCell({
          ...activeSquare,
          colIndex: --activeSquare.colIndex
        });
        updateGridValue(activeSquare.rowIndex, activeSquare.colIndex);
      }
    }
    if (direction === "up") {
      if (activeSquare.rowIndex >= 0 && activeSquare.colIndex >= 0) {
        setActiveCell({
          ...activeSquare,
          rowIndex: --activeSquare.rowIndex
        });
        updateGridValue(activeSquare.rowIndex, activeSquare.colIndex);
      }
    }
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    let currentDirection;
    switch (e.keyCode) {
      case 37:
        currentDirection = "left";
        break;
      case 38:
        currentDirection = "up";
        break;
      case 39:
        currentDirection = "right";
        break;
      case 40:
        currentDirection = "down";
        break;
      default:
        currentDirection = "none";
    }
    updateTheGrid(currentDirection);
  };

  React.useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);

     return ()=>{
        document.body.removeEventListener("keydown",handleKeyDown)
    }
  }, []);

 

const resetBoardHandler=()=>{

   setGrid([
    [1, 1, 1],
    [1, 1, 0],
    [1, 1, 0]
  ])
  console.log([...defaultGameSetup])
    setActiveCell({
        rowIndex:0,
        colIndex:0
    })

  
}
console.log(activeSquare,"natural")
  return (
    <div className="parentContainer">
      <div className="boardContainerWrapper">
        <div className="boardColumnWrapper" >
          {grid.map((row, rowIndex) => (
            <div className="boardRowWrapper" key={rowIndex}>
              {row.map((col, colIndex) => (
                <div
                key={colIndex+Math.random(0,10)}
                  className={
                    rowIndex === activeSquare.rowIndex &&
                    colIndex === activeSquare.colIndex
                      ? "boardActiveCell"
                      : "boardCell"
                  }
                >
                  {grid[rowIndex][colIndex]}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="boardButton">
          <button className="resetBoardButton" onClick={resetBoardHandler}>RESET</button>
        </div>
      </div>
    </div>
  );
}
