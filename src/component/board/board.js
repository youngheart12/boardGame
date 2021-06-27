import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./board.css";

const defaultGameSetup = [
  [1, 0, 0],
  [1, 1, 0],
  [1, 1, 0],
];
export default function App() {
    
//   const [grid, setGrid] = React.useState([
//     [1, 0, 0],
//     [1, 1, 0],
//     [1, 1, 0],
//   ]);

  const [grid,setGrid]=useLocalStorage("grid",[
  [1, 0, 0],
  [1, 1, 0],
  [1, 1, 0],
])
  const [isUserWon,setIsUserWon]=React.useState(false);

 const [activeCell, setActiveCell] = useLocalStorage("active",{
        rowIndex:0,
        colIndex:0
    })

  const isGameCompleted = (squareValue) => {
    return squareValue === grid[0][0];
  };

  React.useEffect(() => {
    const resultedArray = grid.flat(1);
    if (resultedArray.every(isGameCompleted)) {
     setIsUserWon(true);
    }
  }, [grid]);

  const updateCellValue = (rowIndex, colIndex) => {
    console.log("coming here to update");
    let sliceGridData = grid.slice();
    sliceGridData[rowIndex][colIndex] = ++sliceGridData[rowIndex][colIndex];
    setGrid(sliceGridData);
  };

  const updateActiveCellPosition = (direction) => {
    if (direction === "right") {
      if (activeCell.colIndex !== 2) {
        setActiveCell({
          ...activeCell,
          colIndex: activeCell.colIndex + 1,
        });
        updateCellValue(activeCell.rowIndex, activeCell.colIndex + 1);
      }
    }
    if (direction === "down") {
      if (activeCell.rowIndex !== 2) {
        setActiveCell({
          ...activeCell,
          rowIndex: activeCell.rowIndex + 1,
        });
        updateCellValue(activeCell.rowIndex + 1, activeCell.colIndex);
      }
    }
    if (direction === "left") {
      if (activeCell.colIndex !== 0) {
        setActiveCell({
          ...activeCell,
          colIndex: activeCell.colIndex - 1,
        });
        updateCellValue(activeCell.rowIndex, activeCell.colIndex - 1);
      }
    }
    if (direction === "up") {
      if (activeCell.rowIndex !== 0) {
        setActiveCell({
          ...activeCell,
          rowIndex: activeCell.rowIndex - 1,
        });
        updateCellValue(activeCell.rowIndex - 1, activeCell.colIndex);
      }
    }
  };

  const handleKeyDown = React.useCallback(
    (e) => {
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
      updateActiveCellPosition(currentDirection);
    },
    [activeCell]
  );

  React.useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);


  const resetBoardHandler = () => {
    setGrid([[1, 0, 0],
        [1, 1, 0],
        [1, 1, 0]]);
    setActiveCell({
      ...activeCell,
      rowIndex: 0,
      colIndex: 0,
    });
  };

const restartGameHandler=()=>{
    resetBoardHandler();
    setIsUserWon(false)
}

  return (
    <div className="parentContainer">
      <div className="boardContainerWrapper">
      { !isUserWon && <div className="boardColumnWrapper">
          {grid.map((row, rowIndex) => (
            <div className="boardRowWrapper" key={rowIndex}>
              {row.map((col, colIndex) => (
                <div
                  key={colIndex + Math.random(0, 10)}
                  className={
                    rowIndex === activeCell.rowIndex &&
                    colIndex === activeCell.colIndex
                      ? "boardActiveCell"
                      : "boardCell"
                  }
                >
                  {grid[rowIndex][colIndex]}
                </div>
              ))}
            </div>
          ))}
        </div>}
        {isUserWon && <div className="gameCompleteWrapper">🎉 🎊

        You Won ! </div>}
        <div className="boardButton">
          <button className="resetBoardButton" onClick={isUserWon?restartGameHandler:resetBoardHandler}>
           {isUserWon?"RESTART":"RESET"} 
          </button>
        
        </div>
      </div>
    </div>
  );
}
