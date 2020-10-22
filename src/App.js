import React, { useState, useEffect, useCallback } from "react";

import "./App.css";

import styles from "./components/Grid/Grid.module.css";

import Grid from "./components/Grid/Grid";
import Navbar from "./components/Navbar/Navbar";
import Spinner from "./components/Spinner/Spinner";
import Legend from "./components/Legend/Legend";

import { dijkstra, getShortestPath } from "./algorithms/pathfinding/dijkstra";
import { astar } from "./algorithms/pathfinding/astar";
import { bestFirst } from './algorithms/pathfinding/bestFirst'

import { recursiveDivision } from './algorithms/maze/recursiveDivision'
import { recursiveBacktracking } from './algorithms/maze/recursiveBacktrackng'
import { randomMaze } from './algorithms/maze/randomMaze'

const App = () => {
  const [grid, setGrid] = useState([]);

  const [algorithm, setAlgorithm] = useState("Dijkstra's");
  const [erase, setErase] = useState(false);
  const [clear, setClear] = useState(false);
  const [visualizing, setVisualizing] = useState(false)

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mouseDown, setMouseDown] = useState(false);
  const [keyPressed, setKeyPressed] = useState(null);

  const [speed, setSpeed] = useState("8");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  useEffect(() => {
    const resizeHandler = () => {
      setWindowWidth(window.innerWidth);
    };

    const mouseDownHandler = () => {
      setMouseDown(true);
    };

    const mouseUpHandler = () => {
      setMouseDown(false);
    };

    const keyDownHandler = (event) => {
      setKeyPressed(event.key);
    };

    const keyUpHandler = () => {
      setKeyPressed(null);
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);
  }, []);

  const generateGrid = useCallback(() => {
    const arr = [];
    const recSize = 30;

    // Make 30 rows of nodes
    for (let i = 0; i < 27; i++) {
      let row = [];

      // Make columns of nodes based on viewport width
      for (let j = 0; j < Math.floor(windowWidth / recSize); j++) {
        // Push each column into row array
        row.push({
          x: j,
          y: i,
          g: Infinity,
          h: Infinity,
          f: Infinity,
          wall: false,
          start: false,
          end: false,
          distance: Infinity,
          visited: false,
          parent: null,
        });
      }

      // Push each row into grid array
      arr.push(row);
    }

    console.log(arr);
    return arr;
  }, [windowWidth]);

  const onClearWallsHandler = () => {
    const updatedGrid = [...grid]

    for (let row of updatedGrid) {
      for (let node of row) {
        if (node.wall) {
          node.wall = false
          node.start = false
          node.end = false
          node.distance = Infinity
          node.g = Infinity
          node.h = Infinity
          node.f = Infinity
          node.visited = false
          node.parent = null
          drawEmpty(node)
        }
      }
    }

    setGrid(updatedGrid)
  }

  const onClearPathHandler = () => {
    const updatedGrid = [...grid]

    for (let row of updatedGrid) {
      for (let node of row) {
        if (node.visited) {
          node.wall = false
          node.start = false
          node.end = false
          node.distance = Infinity
          node.g = Infinity
          node.h = Infinity
          node.f = Infinity
          node.visited = false
          node.parent = null
          drawEmpty(node)
        }
      }
    }

    setStart(null)
    setEnd(null)

    console.log(updatedGrid)

    setGrid(updatedGrid)
  }

  const onDrawHandler = useCallback(() => {
    setErase(false);
  }, []);

  const onEraseHandler = useCallback(() => {
    setErase(true);
  }, []);

  const onSlideHandler = useCallback((event) => {
    setSpeed(event.target.value);
  }, []);

  const setWallNode = useCallback((grid, node) => {
    grid[node.y][node.x].wall = true;
    grid[node.y][node.x].start = false;
    grid[node.y][node.x].end = false;
  }, []);
  const setStartNode = useCallback((grid, node) => {
    grid[node.y][node.x].wall = false;
    grid[node.y][node.x].start = true;
    grid[node.y][node.x].end = false;
  }, []);

  const setEndNode = useCallback((grid, node) => {
    grid[node.y][node.x].wall = false;
    grid[node.y][node.x].start = false;
    grid[node.y][node.x].end = true;
  }, []);

  const setEmptyNode = useCallback((grid, node) => {
    grid[node.y][node.x].wall = false;
    grid[node.y][node.x].start = false;
    grid[node.y][node.x].end = false;
  }, []);

  const onMouseDownHandler = useCallback(
    (node) => {
      const updatedGrid = [...grid];

      if (keyPressed && keyPressed === "s" && !start) {
        setStartNode(updatedGrid, node);
        setStart({ x: node.x, y: node.y });
      } else if (keyPressed && keyPressed === "e" && !end) {
        setEndNode(updatedGrid, node);
        setEnd({ x: node.x, y: node.y });
      } else if (!erase) {
        if (start) {
          if (node.x === start.x && node.y === start.y) setStart(null);
        }
        if (end) {
          if (node.x === end.x && node.y === end.y) setEnd(null);
        }
        setWallNode(updatedGrid, node);
      } else {
        if (start) {
          if (node.x === start.x && node.y === start.y) setStart(null);
        }
        if (end) {
          if (node.x === end.x && node.y === end.y) setEnd(null);
        }
        setEmptyNode(updatedGrid, node);
      }

      setGrid(updatedGrid);
    },
    [erase, grid, keyPressed]
  );

  const onMouseOverHandler = useCallback(
    (node) => {
      if (mouseDown) onMouseDownHandler(node);
    },
    [mouseDown]
  );

  const onClearGridHandler = useCallback(() => {
    const grid = generateGrid();

    setGrid([]);
    setStart(null);
    setEnd(null);
    setClear(true);

    setTimeout(() => {
      setGrid(grid);
      setClear(false);
    }, 300);
  }, []);

  const drawVisited = (node) => {
    const id = `${node.x} ${node.y}`;
    const currentNode = document.getElementById(id);
    currentNode.setAttribute("class", styles.visited);
  };

  const drawWall = (node) => {
    const id = `${node.x} ${node.y}`;
    const currentNode = document.getElementById(id);
    currentNode.setAttribute("class", styles.wall);
  };

  const drawPath = (node) => {
    const id = `${node.x} ${node.y}`;
    const currentNode = document.getElementById(id);
    currentNode.setAttribute("class", styles.path);
  };

  const drawEmpty = (node) => {
    const id = `${node.x} ${node.y}`;
    const currentNode = document.getElementById(id);
    currentNode.setAttribute("class", styles.node);
  }

  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const onVisualizeHandler = async () => {
    if (!start || !end) return

    setVisualizing(true)

    const startNode = grid[start.y][start.x];
    const endNode = grid[end.y][end.x];
    let animations;

    switch (algorithm) {
      case "Dijkstra's":
        animations = dijkstra(grid, startNode, endNode);
        break;
      case "A*":
        animations = astar(grid, startNode, endNode);
        break;
      case "Best-First Search":
        animations = bestFirst(grid, startNode, endNode);
        break;
    }

    console.log(animations)

    for (let node of animations) {
      if (node.start || node.end) continue;
      drawVisited(node);
      await timeout(speed * 20);
    }

    const shortestPath = getShortestPath(startNode, endNode);

    for (let node of shortestPath) {
      if (node.end) continue;
      drawPath(node);
      await timeout(speed * 20);
    }

    setVisualizing(false)
  };

  const onGenerateMazeHandler = useCallback(async (algorithm) => {
    let animations;

    switch (algorithm) {
      case "Recursive Division":
        animations = recursiveDivision(grid, 1, grid[0].length - 2, 1, grid.length - 2, 'HORIZONTAL')

        for (let node of animations) {
          drawWall(node)
          await timeout(speed * 5)
        }
        break
      case "Recursive Backtracking":
        animations = recursiveBacktracking(grid, 0, grid[0].length - 2, 0, grid.length - 2)
        for (let row of grid) {
          for (let node of row) {
            drawWall(node)
          }
        }

        for (let node of animations) {
          drawEmpty(node)
          await timeout(speed * 5)
        }
        break
      case "Random Maze":
        animations = randomMaze(grid)
        for (let node of animations) {
          drawWall(node)
          await timeout(speed * 5)
        }
        break
    }
  }, [grid, speed])

  return (
    <div className="App">
      <Navbar
        algorithm={algorithm}
        erase={erase}
        visualizing={visualizing}
        speed={speed}
        setAlgorithm={setAlgorithm}
        onDrawHandler={onDrawHandler}
        onEraseHandler={onEraseHandler}
        onSlideHandler={onSlideHandler}
        onClearPathHandler={onClearPathHandler}
        onClearWallsHandler={onClearWallsHandler}
        onClearGridHandler={onClearGridHandler}
        onVisualizeHandler={onVisualizeHandler}
        onGenerateMazeHandler={onGenerateMazeHandler}
      />
      <Legend />
      {clear ? (
        <Spinner />
      ) : (
        <Grid
          grid={grid}
          setGrid={setGrid}
          generateGrid={generateGrid}
          onMouseDownHandler={onMouseDownHandler}
          onMouseOverHandler={onMouseOverHandler}
        />
      )}
    </div>
  );
};

export default App;
