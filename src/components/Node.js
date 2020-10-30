import React, { useState, useEffect } from "react";
import { FaBullseye } from "react-icons/fa";

import "./node.css";

export default function Node({
  row,
  column,
  selection, // 'START' or 'FINISH' or 'WALL'
  startRow,
  startCol,
  setStartRow,
  setStartCol,
  finishRow,
  finishCol,
  setFinishRow,
  setFinishCol,
  reset,
  setReset,

  updateGraph,
  resultPath,
  visitedNodes,
  showSeek,
}) {
  const [isStartNode, setIsStartNode] = useState(false);
  const [isFinishNode, setIsFinishNode] = useState(false);
  const [isWall, setIsWall] = useState(false);
  const [isPath, setIsPath] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const [finishMoved, setFinishMoved] = useState(false);
  const [startMoved, setStartMoved] = useState(false);

  useEffect(() => {
    if (row === startRow && column === startCol) {
      setIsStartNode(true);
    } else {
      setIsStartNode(false);
    }
  }, [startRow, startCol, column, row]);

  useEffect(() => {
    if (row === finishRow && column === finishCol) {
      setIsFinishNode(true);
    } else {
      setIsFinishNode(false);
    }
  }, [finishRow, finishCol, column, row]);

  useEffect(() => {
    if (reset) {
      setIsWall(false);
      setIsStartNode(false);
      setIsFinishNode(false);
      setIsPath(false);
      setIsVisited(false);
      setReset(false);
    }
  }, [reset, setReset]);

  useEffect(() => {
    if (resultPath) {
      setIsPath(false);
      setFinishMoved(false);
      setStartMoved(false);
      setIsVisited(false);
      let coords = `${row},${column}`;
      for (let i = 0; i < resultPath.length; i++) {
        if (resultPath[i] === coords) {
          setIsPath(true);
        }
      }
    }
  }, [resultPath, row, column]);

  useEffect(() => {
    if (visitedNodes) {
      for (let i = 0; i < visitedNodes.length; i++) {
        if (`${row},${column}` === visitedNodes[i]) {
          setIsVisited(true);
        }
      }
      //console.log(`${row},${column}`);
    }
  }, [row, column, visitedNodes]);

  const handleNodeClickDrag = (e, row, col) => {
    if (e.buttons === 1 || e.buttons === 3) {
      if (selection === "WALL" && !isWall) {
        updateGraph(row, column, "WALL");
        setIsWall(true);
        setIsPath(false);
      }
    }
  };
  const handleNodeClicked = (row, col) => {
    if (selection === "WALL" && !isWall && !isStartNode && !isFinishNode) {
      updateGraph(row, column, "WALL");
      setIsPath(false);
      setIsWall(true);
    }
    if (selection === "WALL" && isWall) {
      updateGraph(row, column, "");
      setIsWall(false);
    }
    if (selection === "START" && !isStartNode && !isFinishNode && !isWall) {
      updateGraph(row, column, "START");
      setStartRow(row);
      setStartCol(column);
      setStartMoved(true);
    }
    if (selection === "START" && isStartNode) {
      updateGraph(row, column, "");
      setIsStartNode(false);
    }
    if (selection === "FINISH" && !isFinishNode && !isStartNode && !isWall) {
      updateGraph(row, column, "FINISH");
      setFinishRow(row);
      setFinishCol(column);
      setFinishMoved(true);
    }
    if (selection === "FINISH" && isFinishNode) {
      updateGraph(row, column, "");
      setIsFinishNode(false);
    }
  };

  return (
    <div
      className="node"
      onMouseEnter={(e) => handleNodeClickDrag(e, row, column)}
      onMouseDown={() => handleNodeClicked(row, column)}
    >
      {isStartNode && (
        <span className={resultPath && !startMoved ? "path" : ""}>
          <FaBullseye
            style={{ fontSize: "20px", paddingTop: "0px", color: "green" }}
          />
        </span>
      )}
      {isFinishNode && (
        <span className={resultPath && !finishMoved ? "path" : ""}>
          <FaBullseye
            style={{ fontSize: "20px", paddingTop: "0px", color: "red" }}
          />
        </span>
      )}
      {isWall && <span className="wall"></span>}

      {isPath && <span className="path"></span>}

      {isVisited &&
        !isStartNode &&
        !isFinishNode &&
        !isWall &&
        !isPath &&
        showSeek && <span className="visited"></span>}

      {!isStartNode && !isWall && !isFinishNode && !isPath && <span></span>}
    </div>
  );
}
